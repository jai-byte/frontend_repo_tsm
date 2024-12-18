terraform {
  backend "s3" {
    bucket         = "bkt-terraform-5590" # Create this S3 bucket in AWS
    key            = "terraform/state/instance.tfstate"
    region         = "us-east-1"
    encrypt        = true
    #dynamodb_table = "your-dynamodb-lock-table"    # Optional for locking
  }
}
