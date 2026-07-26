@echo off
REM ─────────────────────────────────────────────────────────────
REM AURA EVENTOS API — Compilación en Windows (Java puro)
REM Requiere: JDK 17+ instalado y en el PATH
REM ─────────────────────────────────────────────────────────────
cd /d "%~dp0"
if not exist lib\*.jar (
  echo [AVISO] No hay ningun .jar en lib\
  echo         Descarga mysql-connector-j-9.x.x.jar desde:
  echo         https://dev.mysql.com/downloads/connector/j/
  echo         eligiendo "Platform Independent", y copia el .jar a lib\
)
echo Compilando...
dir /s /b src\*.java > sources.txt
javac -encoding UTF-8 -d out @sources.txt
del sources.txt
if %errorlevel% neq 0 ( echo ERROR de compilacion & exit /b 1 )
echo Compilacion exitosa. Ejecuta: ejecutar.bat
