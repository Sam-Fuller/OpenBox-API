FROM node:12

# Create app directory
WORKDIR /OpenBoxDocker

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /OpenBoxDocker/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /OpenBoxDocker/

EXPOSE 8042
CMD [ "npm", "start" ]