# Secure-File-Upload-Application-using-S3

# Secure File Upload Application

A full-stack file upload and download application built using React, Node.js, TypeScript, and Amazon S3.

The main goal of this project is to understand how applications securely upload and download files using Amazon S3 and presigned URLs.

## What This Project Does

Users can:

- Upload files from their computer
- View all files stored in the S3 bucket
- Download files
- Delete files

The actual files are stored in Amazon S3.

The Node.js backend does not handle the file data directly. Instead, it generates temporary presigned URLs that allow the frontend to communicate directly with S3.

## How It Works

### Upload

User selects a file
        ↓
React frontend
        ↓
Backend requests a presigned URL
        ↓
Backend generates temporary S3 URL
        ↓
React uploads file directly to S3
        ↓
File is stored in S3

### Download

User clicks Download
        ↓
React asks backend for a download URL
        ↓
Backend generates a temporary presigned URL
        ↓
Browser downloads file directly from S3

### View Files

React
  ↓
Backend /files API
  ↓
S3 ListObjectsV2
  ↓
Backend returns file information
  ↓
React displays files

### Delete

User clicks Delete
        ↓
React
        ↓
Backend
        ↓
S3 DeleteObject
        ↓
File removed from S3

## Architecture

                 React Frontend
                       │
                       │ Axios
                       ▼
              Node.js + TypeScript
                    Backend
                       │
          ┌────────────┼────────────┐
          │            │            │
       Upload       Download      Files
       URL            URL          List
          │            │            │
          └────────────┼────────────┘
                       ▼
                 Amazon S3
                       │
                       ▼
                 Stored Files

## Tech Stack

### Frontend

- React
- TypeScript
- Axios
- Tailwind CSS

### Backend

- Node.js
- TypeScript
- Express
- AWS SDK for JavaScript

### AWS

- Amazon S3
- IAM
- S3 Presigned URLs
- S3 CORS

## Security

The application uses IAM permissions to control what the backend can do with the S3 bucket.

The backend has permissions for operations such as:

- s3:PutObject
- s3:GetObject
- s3:ListBucket
- s3:DeleteObject

Files are not exposed through permanent public URLs.

Instead, the backend generates temporary presigned URLs. These URLs expire after a limited amount of time.

## Project Structure

secure-file-upload/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── upload.ts
│   │   │   ├── download.ts
│   │   │   ├── files.ts
│   │   │   └── delete.ts
│   │   │
│   │   ├── s3.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── Upload.tsx
    │   │   ├── Download.tsx
    │   │   └── Files.tsx
    │   │
    │   ├── services/
    │   │   └── api.ts
    │   │
    │   ├── App.tsx
    │   └── main.tsx
    │
    └── package.json

## Main Learning Goals

This project demonstrates how to:

- Work with Amazon S3 from a Node.js backend
- Configure IAM permissions
- Upload files to S3
- Download files from S3
- List objects in an S3 bucket
- Delete S3 objects
- Generate presigned URLs
- Allow a browser to upload directly to S3
- Configure S3 CORS
- Build REST APIs with Express
- Connect a React frontend to a backend API
- Handle file uploads in React

## Important Concept

The biggest concept in this project is that the backend does not need to receive the entire file.

Instead:

Backend → gives temporary permission
Frontend → uploads/downloads directly with S3
S3 → stores/serves the file

This reduces the amount of file data passing through the backend and is a common pattern for applications that handle file uploads.