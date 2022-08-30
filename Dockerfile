FROM node:18

CMD ["sh", "-c", "sudo apt-get update -y && \ sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libnotify-dev \ libgconf-2-4 libnss3 libxss1 \ libasound2 libxtst6 xauth xvfb \ libgbm-dev"] 
CMD ["sh", "-c", "sudo apt-get install -y chromium-browser"]

# set working directory
WORKDIR /usr/src/app

# copy json files into ./backend
COPY ./backend/package.json ./backend
COPY ./backend/package-lock.json ./backend

# install dependencies from json files
# for production: RUN npm ci --only=production
# RUN npm install
CMD ["sh", "-c", "cd backend/ && npm install"]

# copy everything into workdir
COPY . .

EXPOSE 8383

#run script
CMD ["sh", "-c", "cd backend/ && npm start"]