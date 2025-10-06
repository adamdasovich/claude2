# AI Prompt Library 🎨

A gorgeous, modern web application for managing and optimizing your AI prompts. Built with Next.js, Django, and Claude AI.

![Prompt Library](https://img.shields.io/badge/Next.js-15-black) ![Django](https://img.shields.io/badge/Django-5.2-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- **Beautiful Markdown Editor**: Write and edit prompts with syntax highlighting and live preview
- **AI-Powered Optimization**: Optimize your prompts with Claude Sonnet 4.5 API
- **Organized Library**: Browse your prompts in a stunning masonry grid layout
- **Search & Filter**: Quickly find prompts with full-text search and favorite filtering
- **Color Coding**: Categorize prompts with custom colors
- **Authentication**: Secure user registration and login
- **Responsive Design**: Works beautifully on all devices
- **Glassmorphism UI**: Modern design with blur effects and gradients
- **Smooth Animations**: Powered by Framer Motion

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful UI components
- **Framer Motion** - Smooth animations
- **@uiw/react-md-editor** - Markdown editor with preview

### Backend
- **Django 5.2** - Python web framework
- **Django REST Framework** - API toolkit
- **SQLite** - Database (easily swappable)
- **Anthropic Claude API** - Prompt optimization

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory:
```bash
SECRET_KEY=your-secret-key-here
DEBUG=True
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

6. Run migrations:
```bash
python manage.py migrate
```

7. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

8. Start the development server:
```bash
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. **Register**: Create an account at `/register`
2. **Login**: Sign in at `/login`
3. **Create Prompts**: Click "New Prompt" to create a prompt
4. **Edit Prompts**: Click the edit button on any prompt card
5. **Optimize**: When editing an existing prompt, click "Optimize" to improve it with AI
6. **Search**: Use the search bar to find prompts
7. **Favorite**: Mark important prompts as favorites
8. **Color Code**: Assign colors to organize your prompts

## 🎨 Features in Detail

### Markdown Editor
- Full markdown support with syntax highlighting
- Live preview
- Code blocks with language detection
- Tables, lists, and more

### Prompt Optimization
The optimization feature uses Claude Sonnet 4.5 to:
- Improve clarity and specificity
- Add helpful context
- Structure prompts better
- Make them more effective

### Beautiful UI
- Glassmorphism effects with backdrop blur
- Gradient accents and shadows
- Smooth hover animations
- Responsive grid layout
- Dark mode optimized

## 📁 Project Structure

```
claude2/
├── backend/
│   ├── config/           # Django settings
│   ├── prompts/          # Prompts app
│   ├── accounts/         # Authentication app
│   ├── manage.py
│   └── .env.example
├── frontend/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Main library view
│   │   ├── login/        # Login page
│   │   └── register/     # Register page
│   ├── components/       # React components
│   │   ├── prompt-editor.tsx
│   │   ├── prompt-card.tsx
│   │   └── ui/           # Shadcn components
│   └── lib/
│       ├── api.ts        # API client
│       └── types.ts      # TypeScript types
└── README.md
```

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/user/` - Get current user

### Prompts
- `GET /api/prompts/` - List all prompts
- `POST /api/prompts/` - Create prompt
- `GET /api/prompts/{id}/` - Get prompt details
- `PATCH /api/prompts/{id}/` - Update prompt
- `DELETE /api/prompts/{id}/` - Delete prompt
- `POST /api/prompts/{id}/optimize/` - Optimize prompt with AI

## 🛠️ Development

### Requirements Files

Create a `requirements.txt` in the backend directory:
```txt
django==5.2.6
djangorestframework==3.16.1
django-cors-headers==4.9.0
anthropic==0.69.0
python-decouple==3.8
dj-database-url==3.0.1
```

### Environment Variables

Backend (`.env`):
```
SECRET_KEY=your-django-secret-key
DEBUG=True
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## 🚢 Deployment

### Backend
1. Set `DEBUG=False` in production
2. Configure a production database (PostgreSQL recommended)
3. Set up proper CORS settings
4. Use a WSGI server like Gunicorn
5. Configure static files with WhiteNoise

### Frontend
1. Build the app: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting
3. Update API base URL in `lib/api.ts`

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📝 License

MIT License - feel free to use this project for learning or production!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Powered by [Anthropic Claude](https://www.anthropic.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ and Claude Code
