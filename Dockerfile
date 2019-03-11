FROM node:10.13-alpine
WORKDIR /usr/src/app/
ADD package.json ./
COPY .npmrc /root/.npmrc
RUN npm install && rm /root/.npmrc
# ADDING . before this will invalidate the cache for NPM install.. This is probably not what you want.
ADD . .
EXPOSE 8000
CMD npm start
