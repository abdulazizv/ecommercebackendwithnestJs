# Base image
FROM node:18

RUN mkdir folder

COPY . /folder 
# Create app directory
WORKDIR /folder

# A wildcard is used to ensure both package.json AND package-lock.json are copied

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
RUN npm run start:dev

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
