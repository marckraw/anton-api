FROM node:20-alpine

#ENV NODE_ENV production


# Set the working directory in the container to /app
WORKDIR /app


# Copy package.json and package-lock.json to the workdir
COPY package*.json ./
COPY yarn.lock ./
COPY ca-certificate.crt ./

# Install your application's dependencies
RUN yarn

# Bundle your app's source code inside the Docker image
COPY . .

# Make port 30152 available outside the container
EXPOSE 30152

# Start the application
RUN yarn build

CMD [ "yarn", "start:prod" ]
