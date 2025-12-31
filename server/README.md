# Backend Server for College Event Management Platform

This directory contains the Node.js Express backend for the application.

## Getting Started

To get the backend server running, you need to have a MySQL database set up and running.

### 1. Install MySQL

If you don't have MySQL installed, you can download it from the official website: [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)

### 2. Create the Database and User

1.  Open the MySQL command line or your preferred MySQL client.
2.  Run the following commands to create the database:

    ```sql
    CREATE DATABASE nexusxrcpit;
    ```

3.  It is recommended to create a dedicated user for this application. Run the following commands, replacing `'password'` with a secure password of your choice:

    ```sql
    CREATE USER 'eventuser'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON nexusxrcpit.* TO 'eventuser'@'localhost';
    FLUSH PRIVILEGES;
    ```

### 3. Load the Database Schema

1.  The complete database schema is defined in `../database/schema.sql`.
2.  You need to import this schema into your newly created database. You can do this using the `mysql` command-line tool:

    ```bash
    mysql -u eventuser -p nexusxrcpit < ../database/schema.sql
    ```

    You will be prompted for the password you set in the previous step.

    **Note**: If you have already set up the database, you should re-import the schema as it has been updated. This will drop your existing tables and recreate them with the new structure.

### 4. Set up Environment Variables

1.  Create a new file in this `server` directory named `.env`.
2.  Add the following content to the `.env` file, replacing the placeholder values with your database credentials:

    ```
    # Server Port
    PORT=5000

    # MySQL Database Configuration
    DB_HOST=localhost
    DB_USER=eventuser
    DB_PASSWORD=your_database_password
    DB_NAME=nexusxrcpit
    ```

### 5. Install Dependencies and Run the Server

1.  Open a terminal in this `server` directory.
2.  Install the server's dependencies:

    ```bash
    npm install
    ```

3.  Start the server:

    ```bash
    npm start
    ```

The server should now be running on `http://localhost:5000`.
