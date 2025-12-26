const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Nexusxrcpit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

// ==================== USER ROUTES ====================

// Register user
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, phone, college } = req.body;
    
    console.log('Registration attempt:', { name, email, phone, college });
    
    // Check if user exists
    const [existing] = await pool.query('SELECT * FROM students WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user
    const [result] = await pool.query(
      'INSERT INTO students (full_name, email, password, phone, department) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone || '', college || 'Not specified']
    );

    console.log('User registered successfully:', result.insertId);
    
    res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

// Login user
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await pool.query('SELECT * FROM students WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Don't send password back
    delete user.password;
    
    res.json({ 
      message: 'Login successful',
      user 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== EVENT ROUTES ====================

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, eo.name as organizer_name, eo.email as organizer_email
      FROM events e
      LEFT JOIN event_organizers eo ON e.organizer_id = eo.organizer_id
      ORDER BY e.event_date DESC
    `);
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, eo.name as organizer_name, eo.email as organizer_email
      FROM events e
      LEFT JOIN event_organizers eo ON e.organizer_id = eo.organizer_id
      WHERE e.event_id = ?
    `, [req.params.id]);
    
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(events[0]);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create event
app.post('/api/events', async (req, res) => {
  try {
    const { 
      title, description, event_date, event_time, location, 
      category, max_participants, organizer_id, image_url 
    } = req.body;
    
    const [result] = await pool.query(
      `INSERT INTO events (title, description, event_date, event_time, location, 
       category, max_participants, organizer_id, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, event_date, event_time, location, 
       category, max_participants, organizer_id, image_url]
    );

    res.status(201).json({ 
      message: 'Event created successfully',
      eventId: result.insertId 
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// ==================== REGISTRATION ROUTES ====================

// Register for event
app.post('/api/registrations', async (req, res) => {
  try {
    const { event_id, user_id } = req.body;
    
    // Check if already registered
    const [existing] = await pool.query(
      'SELECT * FROM registrations WHERE event_id = ? AND user_id = ?',
      [event_id, user_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Check event capacity
    const [event] = await pool.query(
      'SELECT max_participants, (SELECT COUNT(*) FROM registrations WHERE event_id = ?) as current_count FROM events WHERE event_id = ?',
      [event_id, event_id]
    );
    
    if (event[0].current_count >= event[0].max_participants) {
      return res.status(400).json({ error: 'Event is full' });
    }

    // Register
    const [result] = await pool.query(
      'INSERT INTO registrations (event_id, user_id) VALUES (?, ?)',
      [event_id, user_id]
    );

    res.status(201).json({ 
      message: 'Registration successful',
      registrationId: result.insertId 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get user registrations
app.get('/api/registrations/user/:userId', async (req, res) => {
  try {
    const [registrations] = await pool.query(`
      SELECT r.*, e.title, e.event_date, e.event_time, e.location
      FROM registrations r
      JOIN events e ON r.event_id = e.event_id
      WHERE r.user_id = ?
      ORDER BY r.registration_date DESC
    `, [req.params.userId]);
    
    res.json(registrations);
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// ==================== ADMIN ROUTES ====================

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [admins] = await pool.query('SELECT * FROM admin_users WHERE email = ?', [email]);
    
    if (admins.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = admins[0];
    const validPassword = await bcrypt.compare(password, admin.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    delete admin.password;
    
    res.json({ 
      message: 'Admin login successful',
      admin 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all users (admin)
app.get('/api/admin/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT user_id, name, email, phone, college, created_at FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get dashboard stats (admin)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM events) as total_events,
        (SELECT COUNT(*) FROM registrations) as total_registrations,
        (SELECT COUNT(*) FROM event_organizers) as total_organizers
    `);
    
    res.json(stats[0]);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
