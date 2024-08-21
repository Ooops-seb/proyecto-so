# Usa una imagen oficial de MySQL
FROM mysql:8.0

# Definir argumentos de construcción
ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_USER
ARG MYSQL_PASSWORD

# Establecer las variables de entorno usando los argumentos
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Copia el script de inicialización al directorio de inicialización de MySQL
COPY ./init/init.sql /docker-entrypoint-initdb.d/

# Expon el puerto de MySQL
EXPOSE 3306

# Comando de inicio del contenedor
CMD ["mysqld"]
