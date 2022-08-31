FROM node:18-alpine


# --------------------------------------------------------------------
# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app 
# --------------------------------------------------------------------

# set working directory
WORKDIR /usr/src/app
# RUN cd /usr/src/ && mkdir app
# RUN chown -R pptruser:pptruser /usr/src/app/
# RUN cd /usr/src/app && mkdir backend
# RUN chown -R pptruser:pptruser /usr/src/app/backend/
# CMD ["sh", "-c", "chmod -R 777 usr/src/app/* "]
# CMD ["sh", "-c", "chown -R pptruser:pptruser /usr/src/app/backend"]


# copy json files into ./backend
COPY --chown=pptruser:pptruser ./backend/package.json ./backend
COPY --chown=pptruser:pptruser ./backend/package-lock.json ./backend


# copy everything into workdir
COPY . .

# install dependencies from json files
RUN cd ./backend/ && npm install

EXPOSE 8383

#run script
CMD ["sh", "-c", "cd backend/ && npm start"]

# Run everything after as non-privileged user.
# USER pptruser