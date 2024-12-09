# Step 1: Set up a Node.js environment to build the frontend-app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Step 2: Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY HRMS_FE-version1/package.json HRMS_FE-version1/package-lock.json ./

# Step 3: Install the dependencies
RUN npm install

# Step 4: Copy the rest of the application files into the container
COPY . .

# Step 5: Build the application
RUN npm run build

# Step 6: Set up the production environment using Nginx to serve the app
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that Nginx is listening on
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
