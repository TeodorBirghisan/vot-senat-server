FROM node:16.13 As development

WORKDIR /app

COPY package*.json ./

RUN npm install --only=development

COPY . .

EXPOSE 8080

RUN npm run build

FROM node:16.13 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main"]
