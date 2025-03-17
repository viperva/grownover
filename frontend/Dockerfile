FROM node:22-alpine3.21

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project
COPY . .

# Start app in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]