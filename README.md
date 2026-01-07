# 🎯 Nexus Event Management Platform

A comprehensive web-based event management system designed for college and university environments. The platform streamlines the entire event lifecycle from creation and approval to registration and management.

## 🌐 LIVE PORTAL LINKS (PERMANENT)

### 📱 Main Portal (Student Interface)
**🔗 https://shubhamwadhe111.github.io/College-Event-app/**
- Student-facing event discovery and registration
- Browse events, register, view gallery, notifications

### 🔧 Admin Portal (College Administration)  
**🔗 https://shubhamwadhe111.github.io/College-Event-app/nexusadmin/**
- College administrator interface
- Event management, user management, analytics, approvals

### 🚀 Super Admin Portal (Master Administration)
**🔗 https://shubhamwadhe111.github.io/College-Event-app/nexussuper/**
- Master administrator interface with system-wide controls
- College management, admin oversight, system analytics

---

## 🏗️ Architecture

### Multi-Portal System
- **Single Page Application (SPA)** with React Router DOM
- **Three Distinct Portals** with role-based access
- **Unified Codebase** with shared components and services
- **GitHub Pages Deployment** with SPA routing support

### Technology Stack
- **Frontend:** React 19.2.0 + TypeScript 4.9.5
- **Routing:** React Router DOM 7.9.4
- **State Management:** Context API (Auth, Event, Notification)
- **Styling:** CSS with Framer Motion animations
- **Icons:** Lucide React
- **Backend:** Node.js + Express.js + MySQL
- **Deployment:** GitHub Pages

---

## 🚀 Quick Start

### Development Setup

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

## 🚀 Additional Commands

### Development Setup
```bash
# Install all dependencies
npm run setup

# Start full system (frontend + backend)
npm run start:system

# Start backend only
npm run start:backend
```

### Production Deployment
```bash
# Deploy to GitHub Pages
npm run deploy

# System health check
npm run health
```

---

## 🗂️ Project Structure

```
event-management-app/
├── src/                    # Frontend React application
│   ├── nexusadmin/        # Admin portal components
│   ├── nexussuper/        # Super admin portal components
│   ├── components/        # Shared UI components
│   ├── pages/            # Main portal pages
│   ├── contexts/         # React Context providers
│   ├── services/         # API services and utilities
│   └── types/            # TypeScript type definitions
├── server/               # Backend Node.js/Express server
├── database/            # Database schema and setup files
├── public/              # Static assets and HTML files
└── build/               # Production build output
```

---

## 🔧 Key Features

### Student Portal
- Event discovery and browsing
- Event registration and management
- Personal dashboard and notifications
- Event gallery and history

### Admin Portal
- Event creation and management
- User and organizer management
- Registration analytics and reports
- Approval workflows

### Super Admin Portal
- Multi-college management
- System-wide analytics
- Admin oversight and controls
- Master configuration settings

---

## 🌐 Deployment Information

- **Hosting:** GitHub Pages
- **Repository:** shubhamwadhe111/College-Event-app
- **Branch:** gh-pages (auto-deployed)
- **SPA Routing:** 404.html fallback implemented
- **SSL:** Enabled via GitHub Pages

---

## 📚 Additional Documentation

- [PORTAL_LINKS_PERMANENT.md](./PORTAL_LINKS_PERMANENT.md) - **PERMANENT portal links and technical details**
- [PROJECT_COMPLETE_DOCUMENTATION.md](./PROJECT_COMPLETE_DOCUMENTATION.md) - Complete system documentation
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [DATABASE_README.md](./database/README.md) - Database schema and setup

---

**🔒 Portal Links are Permanent and Locked - See PORTAL_LINKS_PERMANENT.md for details**