# Use a node image that's compatible with ARM, such as the official Node image for ARM
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY app ./

# Expose the port that the Svelte app will run on
EXPOSE 4400

# Start the application
CMD ["node", "server.mjs"]