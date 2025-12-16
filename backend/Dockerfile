# backend/Dockerfile
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json e instalar dependencias
COPY package.json ./
RUN npm install --only=production

# Copiar el código fuente
COPY src ./src

# Exponer el puerto interno de la app
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
