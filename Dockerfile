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





name: Build, Push and Deploy Docker Image to EC2

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    # Step 1: Checkout the code
    - name: Checkout code
      uses: actions/checkout@v3

    # Step 2: Log in to Docker Hub
    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: jaihub
        password: duckduckgo  # Use GitHub secrets for security

    # Step 3: Build the Docker image
    - name: Build Docker Image
      run: |
        docker buildx build -t jaihub/my-frontend:latest -f HRMS_FE-version1/Dockerfile .

    # Step 4: Push the Docker image to Docker Hub
    - name: Push Docker Image
      run: |
        docker push jaihub/my-frontend:latest

    # Step 5: SSH into EC2 and pull Docker image from Docker Hub
    - name: SSH into EC2 and pull Docker image
      uses: appleboy/ssh-action@v0.1.6
      with:
        host: ${{ secrets.EC2_HOST }}  # Your EC2 instance public IP or DNS
        username: ${{ secrets.EC2_USER }}  # EC2 SSH user (e.g., 'ec2-user', 'ubuntu')
        key: ${{ secrets.EC2_SSH_KEY }}  # EC2 private SSH key
        port: 22  # The default SSH port for EC2 instances
        script: |
          # Pull the latest Docker image from Docker Hub
          sudo docker pull jaihub/my-frontend:latest

    # Step 6: Stop and remove any existing Docker container, then run the new container
    - name: Deploy Docker container on EC2
      uses: appleboy/ssh-action@v0.1.6
      with:
        host: ${{ secrets.EC2_HOST }}
        username: ${{ secrets.EC2_USER }}
        key: ${{ secrets.EC2_SSH_KEY }}
        port: 22
        script: |
          # Stop and remove the existing container if it exists
          sudo docker stop my-frontend-container || true
          sudo docker rm my-frontend-container || true

          # Run the new container from the pulled image
          sudo docker run -d --name my-frontend-container -p 3000:3000 jaihub/my-frontend:latest