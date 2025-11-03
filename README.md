# 📰 NewsHub - React News Application

A modern, feature-rich news application built with React.js that integrates NewsAPI.org, Firebase Authentication, and Firestore for an interactive news reading experience.

![React](https://img.shields.io/badge/React-18.2-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)

## ✨ Features

### 🔐 Authentication
- **Google Authentication** via Firebase
- Persistent user sessions (stay logged in after refresh)
- Protected content - only logged-in users can read full articles

### 📊 Voting System
- **Upvote/Downvote** functionality for each article
- Vote data stored in Firebase Firestore
- **Prevents duplicate voting** - one vote per user per article
- Real-time vote count updates
- Change your vote or remove it anytime

### 📱 News Categories
- **7 Categories**: General, Business, Sports, Technology, Entertainment, Health, Science
- Dynamic category-based news filtering
- Smooth navigation between categories

### 🔍 Advanced Filtering & Sorting
Sort articles by:
- **Highest Votes** (default)
- **Newest First**
- **Oldest First**

Filter by date range:
- **All Time**
- **Today**
- **Past Week**
- **Past Month**

### 🔥 Top Trending Section
- Displays the **top 3 most upvoted** articles
- Eye-catching design with gradient background
- Quick access to popular content

### 💎 User Interface
- **Clean, modern design** with Tailwind CSS
- **Fully responsive** - works perfectly on mobile, tablet, and desktop
- Loading spinners for better UX
- Error handling with retry functionality
- Smooth animations and transitions
- Article cards with images, descriptions, and metadata

### 📄 Article Modal
- Read full articles in a beautiful modal
- Click "Read Full Article" to open
- Links to original source for complete content
- Authentication required to access

## 🛠️ Tech Stack

- **Frontend**: React.js 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth (Google Sign-In)
- **Database**: Firebase Firestore
- **API**: NewsAPI.org
- **HTTP Client**: Axios
- **Icons**: React Icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd "News App"
```

Or download and extract the ZIP file.

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages including React, Firebase, Tailwind CSS, Axios, and more.

### 3️⃣ Get NewsAPI Key

1. Go to [NewsAPI.org](https://newsapi.org/)
2. Click **"Get API Key"** (free tier available)
3. Sign up for a free account
4. Copy your API key from the dashboard

### 4️⃣ Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"** or use an existing project
3. Enable **Google Authentication**:
   - Go to **Authentication** → **Sign-in method**
   - Enable **Google** provider
4. Create a **Firestore Database**:
   - Go to **Firestore Database**
   - Click **"Create Database"**
   - Start in **Production mode** or **Test mode** (for development)
5. Get your Firebase config:
   - Go to **Project Settings** → **General**
   - Scroll down to **"Your apps"**
   - Click the **Web** icon (`</>`)
   - Copy the Firebase configuration object

### 5️⃣ Configure Environment Variables

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Open `.env` and fill in your credentials:

```env
# NewsAPI.org API Key
VITE_NEWS_API_KEY=your_actual_newsapi_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**⚠️ Important**: Never commit your `.env` file to Git! It's already in `.gitignore`.

### 6️⃣ Start the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000` 🎉

## 📁 Project Structure

```
News App/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── ArticleModal.jsx      # Modal for reading full articles
│   │   ├── FilterSort.jsx        # Filtering and sorting controls
│   │   ├── LoadingSpinner.jsx    # Loading indicator
│   │   ├── Navbar.jsx             # Navigation bar with categories
│   │   ├── NewsCard.jsx           # Individual article card
│   │   ├── NewsList.jsx           # Grid of article cards
│   │   ├── TopTrending.jsx        # Top voted articles section
│   │   └── VoteButtons.jsx        # Upvote/downvote buttons
│   ├── config/
│   │   └── firebase.js           # Firebase initialization
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication context provider
│   ├── pages/
│   │   └── Home.jsx              # Main home page
│   ├── services/
│   │   ├── authService.js        # Authentication service
│   │   ├── newsService.js        # NewsAPI service
│   │   └── voteService.js        # Firestore voting service
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles with Tailwind
├── .env                          # Environment variables (DO NOT COMMIT)
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

## 🎯 Usage Guide

### Reading News
1. Browse articles on the home page
2. Click category tabs to filter by topic
3. Click **"Read Full Article"** to view details
4. If not logged in, you'll be prompted to sign in with Google

### Voting
1. **Sign in** with your Google account
2. Click the **👍 thumbs up** to upvote an article
3. Click the **👎 thumbs down** to downvote
4. Click again to remove your vote
5. View the net vote score in the center

### Filtering & Sorting
1. Use the **"Sort by"** dropdown to change article order
2. Use the **"Date Range"** filter to show articles from specific time periods
3. View the **Top Trending** section at the top for most popular articles

## 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔒 Security Best Practices

1. **Never expose your API keys**:
   - Keep `.env` out of version control
   - Use environment variables for all secrets

2. **Firebase Security Rules**:
   - Configure Firestore rules to prevent unauthorized access
   - Example rule for `articleVotes` collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articleVotes/{articleId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /userVotes/{voteId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🐛 Troubleshooting

### Issue: "Failed to fetch news"
- **Solution**: Check your NewsAPI key in `.env`
- Verify you haven't exceeded the API rate limit (free tier: 100 requests/day)

### Issue: "Google Sign-In not working"
- **Solution**: Ensure Google Auth is enabled in Firebase Console
- Check that your Firebase config is correct in `.env`

### Issue: "Votes not saving"
- **Solution**: Verify Firestore is set up in Firebase Console
- Check Firestore security rules allow writes for authenticated users

### Issue: Build errors
- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## 🌟 Features Breakdown

### Authentication Flow
1. User clicks "Sign In with Google"
2. Firebase Auth popup appears
3. User authenticates with Google
4. User data is stored in Auth Context
5. Session persists across page refreshes

### Voting Mechanism
1. User clicks upvote/downvote button
2. Check if user is authenticated
3. Check user's previous vote in Firestore (`userVotes` collection)
4. Update vote in Firestore (`articleVotes` collection)
5. Update UI with new vote counts
6. Prevent duplicate votes from same user

### Article ID Generation
- Uses base64 encoding of article URL
- Ensures consistent IDs across sessions
- Allows vote persistence even after refresh

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
    }
  }
}
```

### Add More Categories
Edit the categories array in `src/components/Navbar.jsx`:

```javascript
const categories = [
  { name: 'Your Category', path: '/category/your-category' },
  // ...
];
```

### Change Sorting Options
Modify the sort logic in `src/pages/Home.jsx` in the `sortArticles` function.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

If you have any questions or need help, please open an issue on GitHub.

## 🙏 Acknowledgments

- [NewsAPI.org](https://newsapi.org/) for providing the news API
- [Firebase](https://firebase.google.com/) for authentication and database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NewsAPI Documentation](https://newsapi.org/docs)

---

**Built with ❤️ using React, Firebase, and NewsAPI**

*Happy coding! 🚀*
