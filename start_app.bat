@echo off

REM --- 1. START DJANGO BACKEND on Port 8001 ---
echo Starting Django Backend on port 8001 in a new window...
REM We explicitly pass the port (8001) to the runserver command
start "Django Server (8001)" /D "backend_dir" cmd /k "python manage.py runserver 8001"

REM --- 2. START NEXT.JS FRONTEND on Port 3001 ---
echo Starting Next.js Frontend on port 3001 in a new window...
REM 'npm run dev' now uses the port defined in package.json (e.g., 3001)
start "Next.js Dev Server (3001)" /D "frontend_dir" cmd /k "npm run dev"

echo.
echo Both servers have been launched on custom ports (8001 & 3001) in separate windows.
echo Close the respective server windows to stop the servers.