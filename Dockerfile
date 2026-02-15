# # Build Stage
# FROM node:20.19.0-alpine as build-step
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --force
# COPY . .
# RUN npm run build
# # List files in the Angular build directory to verify the path
# RUN ls -la /app/dist/vso-revamp/browser

# # Production Stage
# FROM nginx:1.16.0-alpine as prod-stage

# # Copy Angular build output to NGINX html directory
# COPY --from=build-step /app/dist/vso-revamp/browser /usr/share/nginx/html

# # *** DEBUGGING STEP: LIST FILES IN THE NGINX DIRECTORY ***
# # This will show you if the files were successfully copied.
# RUN ls -la /usr/share/nginx/html

# # Copy custom NGINX config
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 80

# # Run NGINX in foreground
# CMD ["nginx", "-g", "daemon off;"]

# Base image
FROM node:20.19.0-alpine

# Set the working directory
WORKDIR /app
# Install dependencies including Python
RUN apk add --no-cache python3 py3-pip make g++ \
    && ln -sf python3 /usr/bin/python \
    && ln -sf pip3 /usr/bin/pip

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the entire project to the working directory
COPY . .

# Build the Angular app
RUN npm run build
# RUN npm run postbuild

# Expose the SSR server port
EXPOSE 80

# Set environment variables
ENV NODE_ENV=production

# Start the SSR server
CMD ["npm", "run", "serve:ssr"]