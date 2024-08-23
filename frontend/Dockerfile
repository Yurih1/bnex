FROM node:16

# Define o diretorio de trabalho
WORKDIR /app

COPY product-frontend/package*.json ./

RUN npm install

# Copia o restante dos arquivos da aplicação
COPY product-frontend .

CMD ["npm", "start"]