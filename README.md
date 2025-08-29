# Mukuru Rewards - Loyalty Program

> **⚠️ IMPORTANT: All team members are working on the main branch. Please coordinate with the team before making changes.**

A comprehensive loyalty rewards system for Mukuru financial services, featuring AI-powered chatbot assistance and tiered rewards.

## 🚀 Features

- **Tiered Rewards System**: Bronze, Silver, and Gold tiers with different point multipliers
- **AI Chatbot**: Mukuru-branded chatbot to help users save money and earn points
- **Real-time Dashboard**: Live tracking of balance, points, and tier status
- **Points Calculator**: Calculate points earned for different transaction amounts
- **RESTful API**: Complete backend API for all operations
- **Modern UI**: Responsive design with Bootstrap and custom CSS

## 🏗️ Architecture

- **Backend**: Django REST Framework
- **Frontend**: HTML/CSS/JavaScript with Bootstrap
- **AI Integration**: SheCodes API for chatbot functionality
- **Database**: SQLite (development) / PostgreSQL (production ready)

## 📁 Project Structure

```
Mukuru_Rewards/
├── Backend/                          # Django backend application
│   ├── manage.py                     # Django management script
│   ├── requirements.txt              # Python dependencies
│   ├── start.py                      # Quick startup script
│   ├── AI.py                         # AI chatbot implementation
│   ├── .env                          # Environment variables
│   └── rewards_api/                  # Django project package
│       ├── __init__.py               # Python package marker
│       ├── settings.py               # Django settings configuration
│       ├── urls.py                   # Main URL routing
│       ├── wsgi.py                   # WSGI application entry point
│       └── api/                      # API application
│           ├── __init__.py           # API package marker
│           ├── models.py             # Database models (User, Points, Balance, Reward)
│           ├── serializers.py        # API data serializers
│           ├── urls.py               # API endpoint routing
│           ├── admin.py              # Django admin configuration
│           └── view/                 # API view implementations
│               ├── __init__.py       # Views package marker
│               ├── points.py         # Points and user management views
│               ├── balance.py        # Balance management views
│               └── rewards.py        # Rewards management views
├── front_end/                        # Frontend application
│   ├── inspo.html                    # Main application page
│   ├── inspo.css                     # Styling and responsive design
│   ├── index.js                      # Frontend logic and interactions
│   ├── api.js                        # API communication layer
│   └── images/                       # Static images and assets
├── AI Model/                         # AI model directory (future use)
├── .git/                             # Git version control
└── README.md                         # Project documentation
```

## 📋 Prerequisites

- Python 3.8+
- pip
- Git

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Mukuru_Rewards
```

### 2. Set up the backend
```bash
cd Backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set up environment variables
Create a `.env` file in the Backend directory:
```env
MUKURU_CHATBOT=your_shecodes_api_key_here
SECRET_KEY=your_django_secret_key_here
DEBUG=True
```

### 4. Run database migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create a superuser (optional)
```bash
python manage.py createsuperuser
```

### 6. Run the development server
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 7. Open the frontend
Open `front_end/inspo.html` in your web browser or serve it using a local server.

## 🎯 API Endpoints

### Users
- `GET /api/users/` - Get all users
- `POST /api/users/` - Create a new user
- `GET /api/users/{id}/` - Get specific user

### Points
- `GET /api/points/` - Get all points records
- `GET /api/points/{user_id}/` - Get user's points
- `POST /api/points/{user_id}/calculate/` - Calculate and award points

### Balance
- `GET /api/balance/` - Get all balance records
- `GET /api/balance/{user_id}/` - Get user's balance
- `POST /api/balance/{user_id}/update/` - Update user's balance

### Rewards
- `GET /api/rewards/` - Get all rewards
- `POST /api/rewards/` - Create a new reward
- `GET /api/rewards/{user_id}/` - Get user's rewards
- `POST /api/rewards/{user_id}/redeem/{reward_id}/` - Redeem a reward

## 🎨 Frontend Features

- **Responsive Dashboard**: Shows balance, points, and tier
- **Points Calculator**: Real-time calculation as you type
- **Tier Information**: Detailed breakdown of each tier's benefits
- **Interactive Elements**: Clickable dashboard items with additional info

## 🤖 AI Chatbot

The Mukuru chatbot helps users:
- Understand how to earn more points
- Get financial advice
- Learn about rewards and tiers
- Optimize their savings

## 🏆 Rewards System

### Bronze Tier (R100 - R1,000)
- 1 point per R100 sent
- 100 points = 10% off next transfer
- 50 points = 5 units electricity

### Silver Tier (R1,000 - R5,000)
- 1.5 points per R100 sent
- 100 points = 10% off next transfer
- Additional rewards coming soon

### Gold Tier (R6,000+)
- 2 points per R100 sent
- 100 points = 10% off next transfer
- Premium rewards coming soon

## 🧪 Testing

### Test the API
```bash
# Test points calculation (updated calculation: 1 point per R100)
curl -X POST http://localhost:8000/api/points/1/calculate/ \
  -H "Content-Type: application/json" \
  -d '{"amount": 1500}'
# Expected: 22 points (1500/100 * 1.5 for Silver tier)

# Test balance update
curl -X POST http://localhost:8000/api/balance/1/update/ \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000, "operation": "add"}'
```

### Points Calculation Examples
- **R500 sent** (Bronze tier): 5 points (500/100 × 1)
- **R1,500 sent** (Silver tier): 22 points (1500/100 × 1.5)
- **R6,000 sent** (Gold tier): 120 points (6000/100 × 2)

### Test the AI Chatbot
```bash
cd Backend
python AI.py
```

## 🚀 Deployment

### Production Settings
1. Update `settings.py`:
   - Set `DEBUG = False`
   - Configure production database
   - Set proper `SECRET_KEY`
   - Configure `ALLOWED_HOSTS`

2. Install production dependencies:
   ```bash
   pip install gunicorn psycopg2-binary
   ```

3. Set up environment variables for production

## 🤝 Contributing

1. clone the repository
2. cd into the repo
3. Make your changes
4. Add tests if applicable
5. pull changes before pushing to avoid merge conflicts

## 👥 Authors

**Group 5:**
- Dikeledi Kwenaite
- Boitumelo Rakgole  
- Ayanda Khumalo
- Keneiloe Motona
- Tendo
- Resego
- Khanyisile

## 📝 License

This project is part of the Mukuru Hackerthon.

## 🆘 Support

For support, please contact the development team or refer to the project documentation.

## 📝 Recent Updates

### Points Calculation Update (Latest)
- **Changed from**: 1 point per R10 sent
- **Changed to**: 1 point per R100 sent
- **Reason**: More sustainable rewards structure for business viability
- **Impact**: Users now earn fewer but more valuable points

## 🔮 Future Enhancements

- [ ] User authentication and login system
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with Mukuru's main platform
- [ ] Push notifications for rewards
- [ ] Social sharing features
- [ ] Referral program
