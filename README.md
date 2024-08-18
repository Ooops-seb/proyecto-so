# TRACCAR

## Pasos para ejecucion

Clonar el proyecto

### BackEnd

Dentro de este directorio esta divido por carpetas para cada una de las bases de datos a usar, cada una tiene su respectivo Dockerfile para sus configuraciones.

1. Crear archivo .env dentro de cada aplicacion con la estructura que se encuentre en el archivo .env.example
Los datos ingresados en las varibles de entorno seran las credenciales para poder conectarse a estas bases de datos
1. Dentro de este directorio backend ejecutar docker-compose up y se crearan los contenedores de las aplicaciones web

Ejecutar VM de Ubuntu (Opcional)
Dentro de la carpeta vm se encuentra una imagen de Ubuntu para revisar las conexiones en la red creada en los contenedores

### FrontEnd

Dentro de este directorio, se encuentran 2 apps de Next.js sin funcionalidades

1. Crear archivo .env dentro de cada aplicacion con la estructura que se encuentre en el archivo .env.example
1. Dentro de este directorio frontend ejecutar docker-compose up y se crearan los contenedores de las aplicaciones web

Se ejecutaran app1 en el puerto 3000 y app2 en el puerto 3001