FROM node:22-alpine3.21

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy TypeScript config files
COPY tsconfig.json tsconfig.node.json vite.config.ts ./

# Copy project files
COPY src ./src
COPY public ./public
COPY index.html ./

# Start app in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]