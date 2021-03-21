FROM node:alpine
WORKDIR /usr/app
COPY . .
RUN yarn
RUN tsc
EXPOSE 5000
CMD ["yarn", "dev"]