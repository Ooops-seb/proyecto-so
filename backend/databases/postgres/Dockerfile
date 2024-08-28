# Usa la imagen oficial de PostgreSQL como base
FROM postgres:16

# Instalar PostGIS y sus dependencias
RUN apt-get update && \
    apt-get install -y \
    postgis \
    postgresql-16-postgis-3 \
    postgresql-16-postgis-3-scripts && \
    rm -rf /var/lib/apt/lists/*

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD

# Establece variables de entorno para PostgreSQL
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Copia scripts de inicialización a la carpeta de inicialización de PostgreSQL
COPY ./initdb/init.sql /docker-entrypoint-initdb.d/

# Exponer el puerto 5432 para acceder a la base de datos desde fuera del contenedor
EXPOSE 5432

# El comando por defecto inicia PostgreSQL
CMD ["postgres"]