FROM node:20-alpine
# Set the working directory in the container to /app
WORKDIR /app
# Copy package.json, package-lock.json, and yarn.lock to the workdir
COPY package*.json ./
COPY yarn.lock ./
# Install your application's dependencies
RUN yarn
# Bundle your app's source code inside the Docker image
COPY . .
# Make port 3000 available outside the container
EXPOSE 3000
# Build the application
RUN yarn build
# Start the application
#CMD [ "yarn", "start:prod" ]
CMD [ "yarn", "start:dev" ]
