CREATE DATABASE IF NOT EXISTS traccar;

USE traccar;

CREATE TABLE IF NOT EXISTS personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos iniciales
INSERT INTO personas (nombre, correo, telefono) VALUES
('Juan Pérez', 'juan.perez@example.com', '123-456-7890'),
('Ana Gómez', 'ana.gomez@example.com', '987-654-3210'),
('Luis Rodríguez', 'luis.rodriguez@example.com', '456-789-1230'),
('Laura Martínez', 'laura.martinez@example.com', '321-654-9870'),
('Carlos Fernández', 'carlos.fernandez@example.com', '654-321-0987');
