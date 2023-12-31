# Use an official Node.js runtime as the base image
FROM node:18

ENV NODE_ENV=development
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_DB=peakpursuit
ENV POSTGRES_USER=marckraw
ENV POSTGRES_PASSWORD=marckraw

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the workdir
COPY .env.development ./
COPY package*.json ./
COPY yarn.lock ./

# Install your application's dependencies
RUN yarn

# Bundle your app's source code inside the Docker image
COPY . .

# Make port 3000 available outside the container
EXPOSE 8080

# Start the application
CMD [ "yarn", "start:dev" ]
