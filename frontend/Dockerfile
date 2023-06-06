# Use an official Node.js runtime as the base image
FROM node:14.17.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the desired port (e.g., 3000) for the container
EXPOSE 3000

# Define the command to start the app inside the container
CMD ["npm", "start"]
