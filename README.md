# 🌲 TreeVision -- AI-Powered Tree Detection Platform

**Live Demo:** https://treevision.lovable.app/

TreeVision is a full-stack AI web application that detects and annotates
trees in user-uploaded images and videos using cloud-based computer
vision inference.\
The platform processes media through a scalable serverless pipeline and
renders real-time bounding boxes and confidence scores directly in the
browser.

------------------------------------------------------------------------

## 🚀 Features

-   Image and video upload support\
-   AI-powered tree detection via cloud inference\
-   Real-time bounding box visualization\
-   Confidence score rendering\
-   Serverless edge function pipeline\
-   Production-ready deployment

------------------------------------------------------------------------

## 🏗️ Architecture

User Upload\
→ React Frontend\
→ Serverless Edge Function\
→ Vision Model Inference\
→ Bounding Box Coordinates\
→ Canvas Overlay Rendering

The system is designed for scalable media processing and cloud-native
deployment.

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React (Vite)
-   TypeScript
-   Tailwind CSS

### Backend

-   Supabase Edge Functions
-   Serverless cloud infrastructure

### AI

-   Cloud-based computer vision model
-   Bounding box post-processing

### Deployment

-   Lovable Cloud
-   GitHub

------------------------------------------------------------------------

## 💻 Running Locally

``` bash
git clone https://github.com/YOUR_USERNAME/TreeVision.git
cd TreeVision
npm install
npm run dev
```

Create a `.env` file based on `.env.example` and configure required
environment variables.

------------------------------------------------------------------------

## 🎯 Motivation

TreeVision was built to demonstrate end-to-end AI system design,
integrating frontend UX, cloud inference, serverless architecture, and
real-time visualization into a production-ready application.
