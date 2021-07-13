# Dockerfile

# base image
FROM node:14

# create & set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy source files
COPY . /usr/src/app

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 8080
CMD npm run start