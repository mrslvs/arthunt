FROM node:18

# set working directory
WORKDIR /usr/src/app

# copy json files into ./backend
COPY ./backend/package.json ./backend
COPY ./backend/package-lock.json ./backend

# install dependencies from json files
RUN npm install
# for production: RUN npm ci --only=production

# copy everything into workdir
COPY . .

EXPOSE 8383

CMD ["npm", "app.js"]