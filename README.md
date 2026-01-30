# ApplyUniNow - Frontend Application

## Overview
Next.js-based frontend application for the ApplyUniNow platform - a comprehensive university application management system.

## Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 8.x or higher
- **Backend API**: Running instance (see backend ZIP or use production API)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3337
NEXT_PUBLIC_DATA_STORAGE_URL=http://localhost:3337
```

### 3. Run Development Server
```bash
npm run dev
# or for Next.js specific dev server
npm run ndev
```

The application will be available at: **http://localhost:3001**

### 4. Build for Production
```bash
npm run nbuild
npm run nstart
```

## Project Structure

```
applyuninow-frontend/
├── src/                      # Source code
│   ├── components/           # React components
│   ├── Pages/                # Page components
│   ├── store/                # Redux state management
│   ├── api/                  # API integration layer
│   ├── config/               # Configuration files
│   ├── utils/                # Utility functions
│   ├── styles/               # Global styles
│   ├── hooks/                # Custom React hooks
│   └── environments/         # Environment configs
├── pages/                    # Next.js pages (routing)
├── public/                   # Static assets
├── package.json              # Dependencies
├── next.config.js            # Next.js configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## Key Features

- **Multi-step Application Form**: Student application process
- **University Search**: Browse and filter universities
- **Course Catalog**: Explore courses by industry and area
- **Student Dashboard**: Track application status
- **Admin Panel**: Manage students, leads, and content
- **Real-time Chat**: Communication between students and advisors
- **Document Upload**: S3-integrated file uploads
- **Responsive Design**: Mobile-first approach

## Available Scripts

```bash
# Development
npm run dev          # React development server (port 3000)
npm run ndev         # Next.js development server (port 3001)

# Production Build
npm run build        # React production build
npm run nbuild       # Next.js production build
npm run nstart       # Start Next.js production server

# Styling
npm run scss         # Compile SCSS to CSS
npm run scss-watch   # Watch and compile SCSS

# Testing
npm test             # Run tests
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:3337` |
| `NEXT_PUBLIC_DATA_STORAGE_URL` | Data storage URL | `http://localhost:3337` |

## Docker Deployment

### Build Docker Image
```bash
docker build -t applyuninow-frontend .
```

### Run Container
```bash
docker run -p 3001:3001 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.applyuninow.com \
  applyuninow-frontend
```

### Using Docker Compose
```bash
docker-compose up -d
```

## Deployment Platforms

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run nbuild
# Deploy the .next folder
```

### Railway
- Connect GitHub repository
- Set build command: `npm run nbuild`
- Set start command: `npm run nstart`
- Add environment variables

## API Integration

The frontend communicates with the backend API through the `src/api/index.js` module:

```javascript
import api from './api';

// Example API call
const response = await api.get('/admin/students');
```

All API calls automatically include:
- JWT token authentication (from localStorage)
- 401 redirect to login on unauthorized
- Base URL from environment variables

## State Management

Redux Toolkit is used for global state management:

```javascript
// src/store/slices/prerequisiteSlice.js
import { useSelector, useDispatch } from 'react-redux';

const dispatch = useDispatch();
const data = useSelector(state => state.prerequisite);
```

## Styling

The project uses multiple styling approaches:

1. **Tailwind CSS**: Utility-first CSS framework
2. **SCSS Modules**: Component-specific styles
3. **CSS-in-JS**: Material-UI styled components
4. **Global CSS**: `src/index.css`

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run nbuild
```

### API Connection Issues
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct
- Check backend server is running
- Check CORS configuration on backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- CSS minification
- Tree shaking for unused code

## Security

- JWT token stored in localStorage
- Automatic logout on 401 responses
- HTTPS required in production
- Environment variables for sensitive data

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## Support

For issues or questions:
- Check `docs/TROUBLESHOOTING.md`
- Review API documentation in backend ZIP
- Contact development team

## License

Proprietary - ApplyUniNow Platform
