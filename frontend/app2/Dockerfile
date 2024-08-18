# Usar una imagen base oficial de Node.js
FROM node:22

ARG APP_NAME

ENV APP_NAME=${APP_NAME}

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que la aplicación Next.js correrá
EXPOSE 3000

# Comando por defecto para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
