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

# Make port 3000 available outside the container
EXPOSE 3000

# Run migrations
RUN yarn db:migrate

# Run seeders - this of course will be removed when the time come to go to production
RUN yarn db:seed

# Start the application
RUN yarn build

CMD [ "yarn", "start:prod" ]
