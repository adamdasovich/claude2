# Quick Start Guide 🚀

Get your AI Prompt Library running in 5 minutes!

## Step 1: Backend Setup (2 minutes)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate
# OR on macOS/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "SECRET_KEY=dev-secret-key-change-in-production" > .env
echo "DEBUG=True" >> .env
echo "ANTHROPIC_API_KEY=your-api-key-here" >> .env

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

✅ Backend is now running on http://localhost:8000

## Step 2: Frontend Setup (2 minutes)

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend is now running on http://localhost:3000

## Step 3: Get Your Anthropic API Key (1 minute)

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy it to your `backend/.env` file

## Step 4: Start Using! 🎉

1. Open http://localhost:3000
2. Click "Sign up" to create an account
3. Create your first prompt
4. Try the "Optimize" feature to improve your prompt with AI

## Tips

- **Create a superuser** to access Django admin:
  ```bash
  cd backend
  python manage.py createsuperuser
  ```
  Then visit http://localhost:8000/admin

- **Keyboard shortcuts** in the markdown editor:
  - `Ctrl/Cmd + B` - Bold
  - `Ctrl/Cmd + I` - Italic
  - `Ctrl/Cmd + K` - Code block

- **Use colors** to organize prompts by category or project

- **Mark favorites** to quickly access your most-used prompts

## Troubleshooting

**Backend won't start?**
- Make sure Python 3.12+ is installed
- Check that all dependencies installed correctly
- Verify your .env file is in the backend directory

**Frontend errors?**
- Make sure Node.js 18+ is installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Can't optimize prompts?**
- Check that your ANTHROPIC_API_KEY is correct in backend/.env
- Make sure you have API credits in your Anthropic account
- Restart the Django server after adding the API key

**API errors?**
- Ensure both backend (8000) and frontend (3000) are running
- Check CORS settings in `backend/config/settings.py`
- Verify the API base URL in `frontend/lib/api.ts`

## Next Steps

- Customize colors in the prompt editor
- Add tags to organize prompts (feature ready in the model!)
- Deploy to production (see README.md)
- Invite your team members

Enjoy your beautiful prompt library! ✨
