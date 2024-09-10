FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV HOST=0.0.0.0

RUN npm run build

# Expose port 3000
EXPOSE 3000

CMD [ "npx", "serve", "-s", "build" ]


