FROM node:16.13 As development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

FROM node:16.13 As production

ARG MODE=PROD
ENV MODE=${MODE}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=development /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main"]
