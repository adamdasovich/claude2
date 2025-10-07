#!/bin/bash

# --- 1. START DJANGO BACKEND on Port 8001 ---
echo "Starting Django Backend on port 8001..."
# Run the activation and server command in the background (&)
(cd backend && source venv/Scripts/activate && python manage.py runserver 8001) &
DJANGO_PID=$!

# --- 2. START NEXT.JS FRONTEND on Port 3001 ---
echo "Starting Next.js Frontend on port 3001..."
# Run the frontend. We leave this one in the foreground to keep the terminal open.
(cd frontend && npm run dev)

# This section runs after you stop the Next.js server with Ctrl+C
echo "Stopping Django Backend (PID: $DJANGO_PID)..."
kill $DJANGO_PID