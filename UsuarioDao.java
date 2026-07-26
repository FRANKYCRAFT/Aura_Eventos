package mx.aura.eventos.json;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class Json {

    private Json() { }

    public static String write(Object value) {
        StringBuilder sb = new StringBuilder();
        writeValue(value, sb);
        return sb.toString();
    }

    @SuppressWarnings("unchecked")
    private static void writeValue(Object value, StringBuilder sb) {
        if (value == null) {
            sb.append("null");
        } else if (value instanceof String s) {
            writeString(s, sb);
        } else if (value instanceof Boolean || value instanceof Integer
                || value instanceof Long || value instanceof Double
                || value instanceof BigDecimal) {
            sb.append(value.toString());
        } else if (value instanceof Enum<?> e) {
            writeString(e.name(), sb);
        } else if (value instanceof Map<?, ?> map) {
            writeObject((Map<String, Object>) map, sb);
        } else if (value instanceof List<?> list) {
            writeArray(list, sb);
        } else {

            writeString(value.toString(), sb);
        }
    }

    private static void writeObject(Map<String, Object> map, StringBuilder sb) {
        sb.append('{');
        boolean first = true;
        for (Map.Entry<String, Object> e : map.entrySet()) {
            if (!first) sb.append(',');
            first = false;
            writeString(e.getKey(), sb);
            sb.append(':');
            writeValue(e.getValue(), sb);
        }
        sb.append('}');
    }

    private static void writeArray(List<?> list, StringBuilder sb) {
        sb.append('[');
        boolean first = true;
        for (Object item : list) {
            if (!first) sb.append(',');
            first = false;
            writeValue(item, sb);
        }
        sb.append(']');
    }

    private static void writeString(String s, StringBuilder sb) {
        sb.append('"');
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '"'  -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < 0x20) sb.append(String.format("\\u%04x", (int) c));
                    else sb.append(c);
                }
            }
        }
        sb.append('"');
    }

    public static Object parse(String text) {
        if (text == null || text.isBlank()) return null;
        Parser p = new Parser(text);
        Object result = p.parseValue();
        p.skipWhitespace();
        return result;
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Object> parseObject(String text) {
        Object v = parse(text);
        if (v instanceof Map) return (Map<String, Object>) v;
        throw new IllegalArgumentException("El cuerpo de la petición no es un objeto JSON válido.");
    }

    private static class Parser {
        private final String s;
        private int i = 0;

        Parser(String s) { this.s = s; }

        void skipWhitespace() {
            while (i < s.length() && Character.isWhitespace(s.charAt(i))) i++;
        }

        Object parseValue() {
            skipWhitespace();
            if (i >= s.length()) throw err("valor esperado");
            char c = s.charAt(i);
            return switch (c) {
                case '{' -> parseObj();
                case '[' -> parseArr();
                case '"' -> parseStr();
                case 't', 'f' -> parseBool();
                case 'n' -> parseNull();
                default -> parseNum();
            };
        }

        Map<String, Object> parseObj() {
            Map<String, Object> map = new LinkedHashMap<>();
            i++;
            skipWhitespace();
            if (peek() == '}') { i++; return map; }
            while (true) {
                skipWhitespace();
                String key = parseStr();
                skipWhitespace();
                expect(':');
                Object value = parseValue();
                map.put(key, value);
                skipWhitespace();
                char c = next();
                if (c == '}') break;
                if (c != ',') throw err("se esperaba ',' o '}'");
            }
            return map;
        }

        List<Object> parseArr() {
            List<Object> list = new java.util.ArrayList<>();
            i++;
            skipWhitespace();
            if (peek() == ']') { i++; return list; }
            while (true) {
                list.add(parseValue());
                skipWhitespace();
                char c = next();
                if (c == ']') break;
                if (c != ',') throw err("se esperaba ',' o ']'");
            }
            return list;
        }

        String parseStr() {
            skipWhitespace();
            expect('"');
            StringBuilder sb = new StringBuilder();
            while (true) {
                char c = rawNext();
                if (c == '"') break;
                if (c == '\\') {
                    char esc = rawNext();
                    switch (esc) {
                        case '"'  -> sb.append('"');
                        case '\\' -> sb.append('\\');
                        case '/'  -> sb.append('/');
                        case 'n'  -> sb.append('\n');
                        case 'r'  -> sb.append('\r');
                        case 't'  -> sb.append('\t');
                        case 'b'  -> sb.append('\b');
                        case 'f'  -> sb.append('\f');
                        case 'u'  -> {
                            String hex = s.substring(i, i + 4);
                            i += 4;
                            sb.append((char) Integer.parseInt(hex, 16));
                        }
                        default -> throw err("escape inválido");
                    }
                } else {
                    sb.append(c);
                }
            }
            return sb.toString();
        }

        char rawNext() {
            if (i >= s.length()) throw err("fin de texto inesperado dentro de un string");
            return s.charAt(i++);
        }

        Boolean parseBool() {
            if (s.startsWith("true", i))  { i += 4; return Boolean.TRUE; }
            if (s.startsWith("false", i)) { i += 5; return Boolean.FALSE; }
            throw err("literal booleano inválido");
        }

        Object parseNull() {
            if (s.startsWith("null", i)) { i += 4; return null; }
            throw err("literal nulo inválido");
        }

        Double parseNum() {
            int start = i;
            if (peek() == '-') i++;
            while (i < s.length() && (Character.isDigit(s.charAt(i)) || s.charAt(i) == '.'
                    || s.charAt(i) == 'e' || s.charAt(i) == 'E' || s.charAt(i) == '+' || s.charAt(i) == '-')) i++;
            return Double.parseDouble(s.substring(start, i));
        }

        char peek() {
            skipWhitespace();
            if (i >= s.length()) throw err("fin de texto inesperado");
            return s.charAt(i);
        }

        char next() {
            skipWhitespace();
            if (i >= s.length()) throw err("fin de texto inesperado");
            return s.charAt(i++);
        }

        void expect(char c) {
            char actual = next();
            if (actual != c) throw err("se esperaba '" + c + "' y se encontró '" + actual + "'");
        }

        RuntimeException err(String msg) {
            return new IllegalArgumentException("JSON inválido en posición " + i + ": " + msg);
        }
    }
}
