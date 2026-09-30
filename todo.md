# TODO - Secure File Upload Application

This file contains the planned improvements to take this project from a learning project to a more production-style cloud application.

---

# 1. Authentication

Add user authentication so users have their own accounts.

- [ ] Add Sign Up
- [ ] Add Sign In
- [ ] Add Logout
- [ ] Add password hashing
- [ ] Add JWT-based authentication
- [ ] Add protected frontend routes
- [ ] Add protected backend APIs
- [ ] Add authentication middleware
- [ ] Validate JWT on protected requests

---

# 2. User-Specific File Access

Currently, files are managed at the application level.

Change the application so every user can access only their own files.

- [ ] Associate every file with a user ID
- [ ] Store the file owner
- [ ] Allow users to view only their own files
- [ ] Allow users to download only their own files
- [ ] Allow users to delete only their own files
- [ ] Validate file ownership before every operation
- [ ] Prevent users from accessing another user's S3 objects
- [ ] Generate S3 keys using a user-specific structure

Example:

```text
User A
│
├── file-a1.jpg
├── file-a2.pdf
└── file-a3.png

User B
│
├── file-b1.jpg
└── file-b2.pdf

# 3. Database Integration

Add a database to store application data.

- Choose a database
- Create users table/collection
- Create files table/collection
- Store user information
- Store file metadata
- Store user ID
- Store S3 object key
- Store filename
- Store file size
- Store file type
- Store upload date
- Store file owner
- Connect Node.js backend to the database


# 4. Improve S3 Security

Make the S3 implementation more production-ready.

- Keep S3 bucket private
- Use IAM least-privilege permissions
- Use presigned URLs
- Configure S3 CORS correctly
- Validate uploaded file types
- Validate maximum file size
- Generate safe S3 object keys
- Prevent unauthorized file access
- Add presigned URL expiration handling
- Review all S3 permissions
- Avoid storing AWS access keys inside application code
- Use IAM Roles when running on AWS infrastructure



# 5. Nginx

Add Nginx to understand reverse proxy architecture.

## Frontend Traffic

Add Nginx between the user and the frontend application.

```
User
  ↓
Nginx
  ↓
Frontend
```

## Backend Traffic

Add Nginx between the frontend and backend.

```
Frontend
   ↓
Nginx
   ↓
Backend API
```

## Complete Flow

```
                 User
                   │
                   ▼
                 Nginx
                   │
             ┌─────┴─────┐
             │           │
             ▼           ▼
         Frontend     Backend
                       │
                       ▼
                    Amazon S3
```

## Tasks

- Install Nginx
- Understand reverse proxy
- Configure frontend proxy
- Configure backend proxy
- Configure API routes
- Configure Nginx location blocks
- Configure frontend/backend communication through Nginx
- Configure production Nginx
- Configure HTTPS
- Learn SSL/TLS termination
- Configure domain name



# 6. Docker

Containerize both frontend and backend.

## Backend Docker

- Create backend Dockerfile
- Build backend image
- Run backend container
- Configure environment variables
- Expose backend port
- Test backend container

## Frontend Docker

- Create frontend Dockerfile
- Build frontend image
- Run frontend container
- Use Nginx to serve production frontend
- Configure frontend environment variables
- Test frontend container

## Docker Compose

- Create docker-compose.yml
- Run frontend and backend together
- Configure Docker networking
- Configure environment variables
- Add Nginx container
- Connect Nginx to frontend
- Connect Nginx to backend


7. AWS EC2 Deployment

Deploy the application to an EC2 instance.

 Create EC2 instance
 Configure security group
 Configure SSH
 Install Docker
 Install Nginx if running outside Docker
 Deploy frontend
 Deploy backend
 Configure environment variables
 Configure S3 access
 Use EC2 IAM Role instead of AWS access keys
 Configure Nginx reverse proxy
 Configure domain
 Configure HTTPS
 Test production deployment
 Configure application restart/recovery


 CI/CD

Create a complete CI/CD pipeline.

 Create GitHub repository
 Add GitHub Actions
 Run frontend build automatically
 Run backend build automatically
 Run tests automatically
 Add linting
 Build Docker images
 Push Docker images to container registry
 Deploy automatically
 Add deployment workflow
 Add environment variables/secrets securely
 Add production deployment workflow


 Kubernetes

Move from Docker Compose to Kubernetes.

 Learn Kubernetes fundamentals
 Create frontend Deployment
 Create backend Deployment
 Create frontend Service
 Create backend Service
 Configure ConfigMaps
 Configure Secrets
 Configure environment variables
 Configure Ingress
 Configure replicas
 Configure health checks
 Configure readiness probes
 Configure liveness probes
 Test horizontal scaling
 Deploy application to Kubernetes
 Understand Pods
 Understand Deployments
 Understand Services
 Understand Ingress


 Terraform

Use Terraform to manage AWS infrastructure as code.

 Install Terraform
 Create Terraform project
 Create VPC
 Create subnets
 Create route tables
 Create Internet Gateway
 Create security groups
 Create EC2 instance
 Create S3 bucket
 Create IAM policies
 Create IAM roles
 Configure EC2 IAM role
 Create required networking
 Use variables
 Use outputs
 Create reusable Terraform modules
 Run terraform init
 Run terraform plan
 Run terraform apply
 Run terraform destroy
 Store Terraform state properly

 11. Monitoring and Logging

Add monitoring and proper application logging.

 Add structured backend logging
 Improve error handling
 Add health check endpoint
 Monitor EC2
 Monitor Docker containers
 Learn AWS CloudWatch
 Monitor application logs
 Monitor CPU and memory
 Add alerts for important failures
 Monitor S3 activity
 Monitor application availability


 Testing

Add automated testing.

 Add backend unit tests
 Add API tests
 Test authentication
 Test upload API
 Test download API
 Test delete API
 Test file ownership
 Test invalid requests
 Add frontend tests
 Add integration tests
 Run tests automatically through CI/CD


 Production Improvements

Improve the application for real-world usage.

 Add proper API validation
 Add centralized error handling
 Add request logging
 Add rate limiting
 Add security headers
 Add file size limits
 Add allowed file type restrictions
 Add pagination for large file lists
 Add S3 multipart upload for large files
 Add file search
 Add file sorting
 Add file deletion confirmation
 Add user profile
 Add password reset
 Add email verification