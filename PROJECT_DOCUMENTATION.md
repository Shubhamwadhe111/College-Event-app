# College Event Management Platform: Project Documentation

## 1. Project Overview

### What is this project?

This project is a comprehensive web application designed to serve as a centralized platform for managing college events. It provides a seamless experience for various user roles, from students looking for events to administrators overseeing the entire system.

### Why was it built?

The primary goal of this platform is to streamline the process of creating, discovering, and managing college events. It aims to replace fragmented systems (like social media posts, paper forms, etc.) with a single, unified solution. This centralization improves communication, increases participation, and provides valuable data insights into event performance.

### Who are the users?

The application is built for four distinct user roles:

*   **Students**: The primary consumers of the platform. They can browse events, view details, and register for them.
*   **Organizers**: Users (likely students or faculty) who have been approved to create and manage their own events. They have a dedicated dashboard to track registrations and other statistics for their events.
*   **Admins**: College-level administrators who have oversight over all users and events. They can manage users (approve/reject organizers, delete users), and moderate events.
*   **Super Admins**: Top-level administrators who manage the system itself, including the ability to appoint or remove college admins.

---

## 2. Core Features

The platform is rich with features tailored to each user role:

*   **Event Discovery**: Students can browse a gallery of all available events, with filtering and search capabilities.
*   **Event Details**: A detailed view for each event, showing information like description, date/time, location, requirements, prizes, and registration status.
*   **User Registration & Login**: A complete authentication system allowing users to register and log in.
*   **User Dashboard**: A personalized dashboard for each user.
    *   For **students**, it shows the events they have registered for.
    *   For **organizers**, it provides statistics and management tools for the events they have created.
*   **Event Creation**: Approved organizers can use a comprehensive form to create new events, including details about pricing, payment methods, and imagery.
*   **Admin Panel**: A powerful interface for admins to manage all users and events on the platform. This includes:
    *   Approving or rejecting organizer requests.
    *   Deleting users and events.
    *   Exporting user data to PDF.
*   **Super Admin Panel**: A top-level dashboard for managing college admins and viewing system-wide analytics.
*   **Notifications**: A real-time notification system to inform users about important events, such as account approval.

---

## 3. Technical Architecture

### How is the project built?

The application is a modern, client-side rendered Single Page Application (SPA).

*   **Frontend Framework**: **React** (v19) with **TypeScript**. This provides a robust, type-safe foundation for building the user interface.
*   **Routing**: **React Router DOM** (v7) is used for all client-side routing, enabling a seamless multi-page experience without full page reloads.
*   **Styling**: The project uses a combination of styling methods:
    *   **Inline CSS**: Many components use inline style objects for dynamic and specific styling.
    *   **Custom CSS Classes**: A custom set of CSS classes is used throughout the application.
    *   **Animations**: **Framer Motion** is used for animations, providing a richer user experience.
*   **State Management**: The application's state is managed through **React Context API**. Separate contexts are used for:
    *   `AuthContext`: Manages user authentication state (the logged-in user, their role, etc.).
    *   `EventContext`: Manages all event and registration data.
    *   `NotificationContext`: Manages user notifications.
*   **Data Storage**: A key architectural decision for this project is the use of the browser's **`localStorage`** as the primary database. All users, events, registrations, and notifications are stored and retrieved from `localStorage`. 
    *   **Note**: This approach is simple and works for a self-contained, single-client demonstration, but it is not a scalable or robust solution for a real-world, multi-user application. Data is not shared between different users or browsers, and it can be easily lost.
*   **PDF Generation**: The admin panel uses **`jspdf`** and **`jspdf-autotable`** to generate PDF reports of user data.

---

## 4. Data Models

The core data structures of the application are defined in `src/types/index.ts`:

*   **`User`**: Represents a user of the application.
    ```typescript
    interface User {
      id: string;
      name: string;
      email: string;
      role: 'student' | 'organizer' | 'admin' | 'superadmin';
      // ... and other properties like college, department, etc.
    }
    ```
*   **`Event`**: Represents an event created on the platform.
    ```typescript
    interface Event {
      id: string;
      title: string;
      description: string;
      date: string;
      location: string;
      capacity: number;
      organizerId: string;
      // ... and many other properties for event details.
    }
    ```
*   **`Registration`**: Represents a user's registration for an event.
    ```typescript
    interface Registration {
      id: string;
      userId: string;
      eventId: string;
      registeredAt: string;
    }
    ```
*   **`Notification`**: Represents a notification for a user.
    ```typescript
    interface Notification {
      id: string;
      userId: string;
      title: string;
      message: string;
      type: 'info' | 'success' | 'warning' | 'error';
      read: boolean;
    }
    ```

---

## 5. Project Structure

The project follows a standard Create React App structure, with the main application code located in the `src` directory:

*   **`src/components`**: Contains reusable UI components used across the application (e.g., `Layout`, `Navbar`, `EventStatistics`).
*   **`src/pages`**: Contains the main page components for each route (e.g., `Home`, `Events`, `Dashboard`, `AdminPanel`).
*   **`src/contexts`**: Contains the React context providers for state management (`AuthContext`, `EventContext`).
*   **`src/types`**: Contains all the TypeScript type definitions for the application's data models.
*   **`src/services`**: Likely intended for API calls, but given the `localStorage` approach, it might be used for abstracting data access.
*   **`src/utils`**: Contains utility functions, such as the PDF export logic.

---

## 6. How to Run the Project

This project was bootstrapped with Create React App. To run it locally:

1.  **Install Dependencies**: Open a terminal in the project's root directory (`event-management-app`) and run:
    ```bash
    npm install
    ```
2.  **Start the Development Server**: After the installation is complete, run:
    ```bash
    npm start
    ```
    This will open the application in your default browser at [http://localhost:3000](http://localhost:3000).
