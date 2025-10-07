@echo off
REM Start frontend
start "Frontend Server" cmd /k "cd /d C:\Users\adamd\Project\claude2\frontend && npm run dev"



REM Start backend
start "Backend Server" cmd /k "cd /d C:\Users\adamd\Project\claude2\backend && call venv\Scripts\activate && python manage.py runserver 8001"

exit
