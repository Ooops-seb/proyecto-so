db = db.getSiblingDB('traccar');

db.createCollection('personas');

db.personas.insertMany([
    { nombre: 'Juan Pérez', correo: 'juan.perez@example.com', telefono: '123-456-7890' },
    { nombre: 'Ana Gómez', correo: 'ana.gomez@example.com', telefono: '987-654-3210' },
    { nombre: 'Luis Rodríguez', correo: 'luis.rodriguez@example.com', telefono: '456-789-1230' },
    { nombre: 'Laura Martínez', correo: 'laura.martinez@example.com', telefono: '321-654-9870' },
    { nombre: 'Carlos Fernández', correo: 'carlos.fernandez@example.com', telefono: '654-321-0987' }
]);
