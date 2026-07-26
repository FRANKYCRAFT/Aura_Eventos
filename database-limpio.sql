SET NAMES utf8mb4;

DROP DATABASE IF EXISTS aura_eventos;
CREATE DATABASE aura_eventos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE aura_eventos;

CREATE TABLE usuarios (
  id            VARCHAR(20)  NOT NULL,
  nombre        VARCHAR(60)  NOT NULL,
  apellidos     VARCHAR(80)  NULL,
  email         VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol           ENUM('admin','cliente') NOT NULL DEFAULT 'cliente',
  avatar        VARCHAR(4)   NULL,
  telefono      VARCHAR(20)  NULL,
  creado_en     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email)
) ENGINE=InnoDB;

CREATE TABLE categorias (
  id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categorias_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE articulos (
  id           VARCHAR(20)   NOT NULL,
  sku          VARCHAR(20)   NOT NULL,
  nombre       VARCHAR(120)  NOT NULL,
  categoria_id INT UNSIGNED  NOT NULL,
  descripcion  TEXT          NULL,
  precio       DECIMAL(10,2) NOT NULL,
  stock_total  INT UNSIGNED  NOT NULL DEFAULT 0,
  estado       ENUM('activo','deshabilitado') NOT NULL DEFAULT 'activo',
  dimensiones  VARCHAR(80)   NULL,
  material     VARCHAR(80)   NULL,
  incluye      VARCHAR(120)  NULL,
  peso_max     VARCHAR(20)   NULL,
  rating       DECIMAL(2,1)  NOT NULL DEFAULT 5.0,
  reviews      INT UNSIGNED  NOT NULL DEFAULT 0,
  imagen_url   TEXT          NULL,
  creado_en    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_articulos_sku (sku),
  KEY idx_articulos_categoria (categoria_id),
  CONSTRAINT fk_articulos_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT chk_articulos_precio CHECK (precio >= 0),
  CONSTRAINT chk_articulos_rating CHECK (rating BETWEEN 0 AND 5)
) ENGINE=InnoDB;

CREATE TABLE solicitudes (
  id             VARCHAR(20)   NOT NULL,
  cliente_id     VARCHAR(20)   NOT NULL,
  fecha_evento   DATE          NOT NULL,
  fecha_fin      DATE          NOT NULL,
  subtotal       DECIMAL(10,2) NOT NULL,
  iva            DECIMAL(10,2) NOT NULL,
  flete          DECIMAL(10,2) NULL,
  total          DECIMAL(10,2) NOT NULL,
  estado         ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  direccion      VARCHAR(255)  NULL,
  notas          TEXT          NULL,
  motivo_rechazo TEXT          NULL,
  creado_en      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  aprobado_en    DATETIME      NULL,
  PRIMARY KEY (id),
  KEY idx_solicitudes_cliente (cliente_id),
  KEY idx_solicitudes_estado  (estado),
  KEY idx_solicitudes_fechas  (fecha_evento, fecha_fin),
  CONSTRAINT fk_solicitudes_cliente
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT chk_solicitudes_fechas CHECK (fecha_fin >= fecha_evento)
) ENGINE=InnoDB;

CREATE TABLE solicitud_articulos (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  solicitud_id    VARCHAR(20)   NOT NULL,
  articulo_id     VARCHAR(20)   NOT NULL,
  cantidad        INT UNSIGNED  NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_solicitud_articulo (solicitud_id, articulo_id),
  KEY idx_sa_articulo (articulo_id),
  CONSTRAINT fk_sa_solicitud
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_sa_articulo
    FOREIGN KEY (articulo_id) REFERENCES articulos (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT chk_sa_cantidad CHECK (cantidad > 0)
) ENGINE=InnoDB;

CREATE TABLE password_resets (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id VARCHAR(20)  NOT NULL,
  codigo     VARCHAR(64)  NOT NULL,
  expira_en  DATETIME     NOT NULL,
  usado      TINYINT(1)   NOT NULL DEFAULT 0,
  creado_en  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_pr_usuario (usuario_id),
  CONSTRAINT fk_pr_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE OR REPLACE VIEW vista_stock_articulos AS
SELECT
  a.id,
  a.sku,
  a.nombre,
  c.nombre AS categoria,
  a.stock_total,
  COALESCE(r.rentados, 0)                    AS rentados,
  a.stock_total - COALESCE(r.rentados, 0)    AS stock_disponible,
  (a.stock_total - COALESCE(r.rentados, 0)) <= 3 AS stock_bajo
FROM articulos a
JOIN categorias c ON c.id = a.categoria_id
LEFT JOIN (
  SELECT sa.articulo_id, SUM(sa.cantidad) AS rentados
  FROM solicitud_articulos sa
  JOIN solicitudes s ON s.id = sa.solicitud_id
  WHERE s.estado = 'aprobado'
    AND CURDATE() BETWEEN s.fecha_evento AND s.fecha_fin
  GROUP BY sa.articulo_id
) r ON r.articulo_id = a.id;

CREATE OR REPLACE VIEW vista_resumen_agenda AS
SELECT
  SUM(estado = 'pendiente') AS pendientes,
  SUM(estado = 'aprobado')  AS aprobadas,
  SUM(estado = 'rechazado') AS rechazadas,
  COUNT(*)                  AS total
FROM solicitudes;

INSERT INTO usuarios (id, nombre, apellidos, email, password_hash, rol, avatar, telefono) VALUES
('u001', 'Ana',   'Martínez',     'admin@aura.mx',  '120000:H+zuOmRIrvO5zQmwVNu0BA==:lG2/nMpXSUiS2t2UvxBWFtaCO5twFR3h2mOKYc1lXtU=', 'admin',   'AM', '55 0000 0001'),
('u002', 'María', 'García López', 'maria@gmail.com','120000:tKl6FDjwtEDUCYWZ/HmfIg==:hIu7dkP1/1BKFAckYUTdn6tEpJTdIEizImf0IIIfGZs=', 'cliente', 'MG', '55 9876 5432');

INSERT INTO categorias (nombre) VALUES
('Mesa Candy'),
('Arco de Globos'),
('Letrero Neon'),
('Sillas & Mesas'),
('Lounge'),
('Backdrop'),
('Candy Bar');

INSERT INTO articulos
(id, sku, nombre, categoria_id, descripcion, precio, stock_total, estado, dimensiones, material, incluye, peso_max, rating, reviews) VALUES
('art001','MC-001-ORO','Mesa Candy Premium Dorada', 1,
 'Mesa decorativa de madera blanca con herrajes dorados. Perfecta para exposición de postres, dulces y bebidas. Incluye mantel de organza, faldón y 2 niveles de exhibición iluminados con tira LED cálida.',
 1200.00, 12, 'activo', '1.8m × 0.6m × 0.9m', 'MDF lacado blanco', 'Montaje + desmontaje', '80 kg', 4.9, 124),
('art002','AG-002-PAS','Arco Orgánico Pastel XL', 2,
 'Arco de globos orgánico en tonos pastel. Incluye instalación y desmontaje. Totalmente personalizable.',
 850.00, 8, 'activo', '2.5m × 0.8m', 'Globos látex', 'Instalación + desmontaje', NULL, 4.7, 89),
('art003','LN-003-RSA','Letrero LED "LOVE" Rosa', 3,
 'Letrero neón flexible con cable 3m. Brillo ajustable. Ideal para fondos fotográficos.',
 650.00, 5, 'activo', '60cm × 30cm', 'Neón LED', 'Soporte + cable', NULL, 4.8, 67),
('art004','SC-004-BLA','Sillas Chiavari Blancas x10', 4,
 'Set de 10 sillas con cojín satinado. Perfectas para ceremonias y banquetes formales.',
 2400.00, 15, 'activo', 'Estándar', 'Resina premium', 'Cojines incluidos', NULL, 4.6, 112),
('art005','SL-005-BLA','Set Lounge Blanco Moderno', 5,
 'Sofá 3 plazas, 2 sillones y mesa de centro. Ideal para áreas VIP y lounges de eventos.',
 3500.00, 6, 'activo', 'Conjunto completo', 'Tapizado blanco', 'Mesa de centro', NULL, 4.9, 43),
('art006','CV-006-VIN','Carrito Vintage para Dulces', 1,
 'Carrito de madera blanca con ruedas doradas. Incluye faldón y decoración base. Alta capacidad.',
 1800.00, 3, 'activo', '1.2m × 0.6m × 1.4m', 'Madera pintada', 'Decoración base', NULL, 4.5, 31),
('art007','TC-007-3NV','Torre de Cupcakes 3 Niveles', 1,
 'Torre acrílica para 40+ cupcakes en 3 niveles. Plateada o dorada. Totalmente personalizable.',
 950.00, 8, 'activo', '30cm diámetro × 60cm alto', 'Acrílico', 'Bases intercambiables', NULL, 4.4, 55),
('art008','FC-008-CHO','Fuente de Chocolate Premium', 1,
 'Fuente 3 pisos con motor silencioso. Capacidad 4kg choc. Incluye fondue de fresa.',
 1400.00, 4, 'activo', '40cm diámetro × 50cm alto', 'Acero inoxidable', 'Chocolate + accesorios', NULL, 4.7, 78);

INSERT INTO solicitudes
(id, cliente_id, fecha_evento, fecha_fin, subtotal, iva, flete, total, estado, direccion, notas, motivo_rechazo, creado_en, aprobado_en) VALUES
('AUR-2025-0801','u002','2025-07-05','2025-07-06', 5900.00,  944.00, 450.00, 7294.00, 'aprobado',
 'Col. Santa Fe, CDMX', NULL, NULL, '2025-06-20 10:00:00', '2025-06-21 09:30:00'),
('AUR-2025-0779','u002','2025-06-28','2025-06-28',  650.00,  104.00, 300.00, 1054.00, 'aprobado',
 'Col. Roma Norte, CDMX', NULL, NULL, '2025-06-10 12:00:00', '2025-06-11 11:15:00'),
('AUR-2025-0755','u002','2025-06-14','2025-06-14', 2050.00,  328.00, 350.00, 2728.00, 'rechazado',
 'Tlalnepantla, Edo. Méx', NULL, 'Fecha ya ocupada con otro evento aprobado en esa zona.', '2025-06-01 09:00:00', NULL),
('AUR-2025-0847','u002','2025-07-21','2025-07-24', 3350.00,  536.00, NULL,   3886.00, 'pendiente',
 'Col. Polanco, CDMX', NULL, NULL, '2025-07-15 14:20:00', NULL),
('AUR-2025-0820','u002','2025-07-19','2025-07-19', 3500.00,  560.00, NULL,   4060.00, 'pendiente',
 'Col. Lomas, CDMX', NULL, NULL, '2025-07-14 16:45:00', NULL),
('AUR-2025-0830','u002','2025-07-22','2025-07-22', 2400.00,  384.00, NULL,   2784.00, 'pendiente',
 'Col. Juárez, CDMX', NULL, NULL, '2025-07-15 18:05:00', NULL);

INSERT INTO solicitud_articulos (solicitud_id, articulo_id, cantidad, precio_unitario) VALUES
('AUR-2025-0801','art004', 1, 2400.00),
('AUR-2025-0801','art005', 1, 3500.00),
('AUR-2025-0779','art003', 1,  650.00),
('AUR-2025-0755','art001', 1, 1200.00),
('AUR-2025-0755','art002', 1,  850.00),
('AUR-2025-0847','art001', 1, 1200.00),
('AUR-2025-0847','art002', 1,  850.00),
('AUR-2025-0847','art003', 2,  650.00),
('AUR-2025-0820','art005', 1, 3500.00),
('AUR-2025-0830','art004', 1, 2400.00);
