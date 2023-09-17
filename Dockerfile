# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the client
RUN npm run build

# Expose port
EXPOSE 3000

# Start the client server
CMD ["npm", "start"]
