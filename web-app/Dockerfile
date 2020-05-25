FROM node:alpine
EXPOSE 3000
RUN npm install -g serve
WORKDIR /web-app
COPY . .
CMD serve -l tcp://0.0.0.0:3000 -s build
