# Usa la imagen oficial de PostgreSQL como base
FROM postgres:16

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD

# Establece variables de entorno para PostgreSQL
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Copia scripts de inicialización a la carpeta de inicialización de PostgreSQL
# (Opcional) Si tienes scripts SQL o de shell para inicializar la base de datos, cópialos
COPY ./initdb /docker-entrypoint-initdb.d/

# Exponer el puerto 5432 para acceder a la base de datos desde fuera del contenedor
EXPOSE 5432

# El comando por defecto inicia PostgreSQL
CMD ["postgres"]
