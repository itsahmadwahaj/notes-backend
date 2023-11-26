# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /user/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prisma ./prisma/

# Install the application dependencies
RUN npm ci
# Copy the application code to the container
COPY . .


CMD ["node", "server.js"]
EXPOSE 4040
