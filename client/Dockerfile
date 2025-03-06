FROM node:18-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
EXPOSE 3000
CMD ["npm", "start"] 