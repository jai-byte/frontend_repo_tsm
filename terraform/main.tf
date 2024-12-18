terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Secure credentials: Use environment variables, profiles, or IAM role
provider "aws" {
  region = "us-east-1"
 # access_key = "AKIA6D6JBWKRRF4OIAWB"
 # secret_key = "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"
}

# VPC creation
resource "aws_vpc" "my_vpc" {
  cidr_block           = "10.10.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "my-vpc-agni"
  }
}

# Internet Gateway for the VPC
resource "aws_internet_gateway" "my_igw" {
  tags = {
    Name = "agni-igw"
  }
}

# Attach Internet Gateway to the VPC
resource "aws_internet_gateway_attachment" "my_igw_attachment" {
  internet_gateway_id = aws_internet_gateway.my_igw.id
  vpc_id              = aws_vpc.my_vpc.id
}

# Public Subnet
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.10.1.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet"
  }
}

# Security Group for EC2 Instances
resource "aws_security_group" "allow_ssh_http" {
  vpc_id = aws_vpc.my_vpc.id

  name        = "allow_ssh_http"
  description = "Allow SSH and HTTP inbound traffic"

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow-ssh-http"
  }
}

# Three EC2 Instances in the Public Subnet
resource "aws_instance" "app_servers" {
  count                       = 3  # Creates three instances
  ami                         = "ami-005fc0f236362e99f"  # Amazon Linux 2 AMI example
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.allow_ssh_http.id]
  associate_public_ip_address = true
  key_name = "tsm_key"

  tags = {
    Name = "ExampleAppServerInstance-${count.index + 1}"
  }
}

# Output Public IPs of the Instances
output "instance_public_ips" {
  description = "Public IPs of the EC2 Instances"
  value       = aws_instance.app_servers[*].public_ip
}
