# Usa a imagem oficial do Node.js como imagem base
FROM node:latest

# Define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Limpia la caché de npm
RUN npm cache clean --force

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al directorio de trabajo del contenedor
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

