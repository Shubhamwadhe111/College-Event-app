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
  database: process.env.DB_NAME || 'nexusxrcpit',
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

// Register student
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, phone, college, year = '1' } = req.body;
    
    console.log('Registration attempt:', { name, email, phone, college });
    
    // Check if user exists
    const [existing] = await pool.query('SELECT * FROM Students WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user
    const [result] = await pool.query(
      'INSERT INTO Students (full_name, email, password, phone, department, year) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone || '', college || 'Not specified', year]
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

// Login student
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await pool.query('SELECT * FROM Students WHERE email = ?', [email]);
    
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
      user: {
        id: user.student_id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        department: user.department,
        year: user.year,
        role: 'student'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register organizer
app.post('/api/organizers/register', async (req, res) => {
  try {
    const { name, email, password, phone, department, designation } = req.body;
    
    console.log('Organizer registration attempt:', { name, email, phone, department, designation });
    
    // Check if organizer exists
    const [existing] = await pool.query('SELECT * FROM Organizers WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert organizer
    const [result] = await pool.query(
      'INSERT INTO Organizers (full_name, email, password, phone, department, designation) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone || '', department || '', designation || '']
    );

    console.log('Organizer registered successfully:', result.insertId);
    
    res.status(201).json({ 
      message: 'Organizer registration submitted. Please wait for admin approval.',
      organizerId: result.insertId 
    });
  } catch (error) {
    console.error('Organizer registration error:', error.message);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

// Login organizer
app.post('/api/organizers/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [organizers] = await pool.query('SELECT * FROM Organizers WHERE email = ?', [email]);
    
    if (organizers.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const organizer = organizers[0];
    
    if (organizer.account_status === 'pending') {
      return res.status(403).json({ error: 'Account pending approval. Please wait for admin approval.' });
    }
    
    if (organizer.account_status === 'rejected') {
      return res.status(403).json({ error: 'Account has been rejected. Please contact admin.' });
    }

    const validPassword = await bcrypt.compare(password, organizer.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Don't send password back
    delete organizer.password;
    
    res.json({ 
      message: 'Login successful',
      user: {
        id: organizer.organizer_id,
        name: organizer.full_name,
        email: organizer.email,
        phone: organizer.phone,
        department: organizer.department,
        designation: organizer.designation,
        role: 'organizer',
        account_status: organizer.account_status
      }
    });
  } catch (error) {
    console.error('Organizer login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== EVENT ROUTES ====================

// Get all approved events
app.get('/api/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT 
        e.event_id,
        e.event_name,
        e.event_type,
        e.description,
        e.start_date,
        e.end_date,
        e.time,
        e.venue,
        e.registration_fee,
        e.max_participants,
        e.status,
        o.full_name as organizer_name,
        o.department as organizer_department,
        COUNT(DISTINCT r.registration_id) as registered_count
      FROM Events e
      JOIN Organizers o ON e.organizer_id = o.organizer_id
      LEFT JOIN Registrations r ON e.event_id = r.event_id
      WHERE e.approval_status = 'approved'
      GROUP BY e.event_id
      ORDER BY e.start_date ASC
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
      SELECT 
        e.*,
        o.full_name as organizer_name,
        o.email as organizer_email,
        o.phone as organizer_phone,
        o.department as organizer_department,
        COUNT(DISTINCT r.registration_id) as registered_count
      FROM Events e
      JOIN Organizers o ON e.organizer_id = o.organizer_id
      LEFT JOIN Registrations r ON e.event_id = r.event_id
      WHERE e.event_id = ? AND e.approval_status = 'approved'
      GROUP BY e.event_id
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

// Create event (organizer only)
app.post('/api/events', async (req, res) => {
  try {
    const { 
      event_name, description, event_type, start_date, end_date, time, venue, 
      registration_fee, max_participants, organizer_id 
    } = req.body;
    
    // Verify organizer exists and is approved
    const [organizer] = await pool.query(
      'SELECT * FROM Organizers WHERE organizer_id = ? AND account_status = "approved"',
      [organizer_id]
    );
    
    if (organizer.length === 0) {
      return res.status(403).json({ error: 'Organizer not found or not approved' });
    }
    
    const [result] = await pool.query(
      `INSERT INTO Events (event_name, description, event_type, start_date, end_date, time, venue, 
       registration_fee, max_participants, organizer_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [event_name, description, event_type, start_date, end_date, time, venue, 
       registration_fee || 0, max_participants, organizer_id]
    );

    res.status(201).json({ 
      message: 'Event created successfully and submitted for approval',
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
      'SELECT * FROM Registrations WHERE event_id = ? AND student_id = ?',
      [event_id, user_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Check event exists and is approved
    const [event] = await pool.query(
      'SELECT * FROM Events WHERE event_id = ? AND approval_status = "approved"',
      [event_id]
    );
    
    if (event.length === 0) {
      return res.status(404).json({ error: 'Event not found or not approved' });
    }

    // Check event capacity
    const [capacity] = await pool.query(
      'SELECT COUNT(*) as current_count FROM Registrations WHERE event_id = ?',
      [event_id]
    );
    
    if (event[0].max_participants && capacity[0].current_count >= event[0].max_participants) {
      return res.status(400).json({ error: 'Event is full' });
    }

    // Register
    const [result] = await pool.query(
      'INSERT INTO Registrations (event_id, student_id) VALUES (?, ?)',
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
      SELECT 
        r.*,
        e.event_name,
        e.start_date,
        e.time,
        e.venue,
        e.event_type
      FROM Registrations r
      JOIN Events e ON r.event_id = e.event_id
      WHERE r.student_id = ?
      ORDER BY r.registration_date DESC
    `, [req.params.userId]);
    
    res.json(registrations);
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// ==================== ADMIN ROUTES ====================

// Register admin (with secret code)
app.post('/api/admin/register', async (req, res) => {
  try {
    const { name, email, password, phone, department, secretCode } = req.body;
    
    console.log('Admin registration attempt:', { name, email, phone, department });
    
    // Verify secret code
    const ADMIN_SECRET_CODE = 'ADMIN2024';
    if (secretCode !== ADMIN_SECRET_CODE) {
      return res.status(403).json({ error: 'Invalid secret code. Access denied.' });
    }
    
    // Check if admin exists
    const [existing] = await pool.query('SELECT * FROM Admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert admin
    const [result] = await pool.query(
      'INSERT INTO Admins (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone || '', 'super_admin']
    );

    console.log('Admin registered successfully:', result.insertId);
    
    res.status(201).json({ 
      message: 'Admin account created successfully!',
      adminId: result.insertId 
    });
  } catch (error) {
    console.error('Admin registration error:', error.message);
    res.status(500).json({ error: error.message || 'Admin registration failed' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [admins] = await pool.query('SELECT * FROM Admins WHERE email = ?', [email]);
    
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
      user: {
        id: admin.admin_id,
        name: admin.name,
        email: admin.email,
        role: 'admin',
        admin_role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get pending organizers (admin)
app.get('/api/admin/pending-organizers', async (req, res) => {
  try {
    const [organizers] = await pool.query(`
      SELECT organizer_id, full_name, email, phone, department, designation, created_at
      FROM Organizers 
      WHERE account_status = 'pending'
      ORDER BY created_at ASC
    `);
    res.json(organizers);
  } catch (error) {
    console.error('Get pending organizers error:', error);
    res.status(500).json({ error: 'Failed to fetch pending organizers' });
  }
});

// Approve/Reject organizer (admin)
app.post('/api/admin/organizers/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { action, admin_id, remarks } = req.body; // action: 'approve' or 'reject'
    
    const status = action === 'approve' ? 'approved' : 'rejected';
    const isActive = action === 'approve';
    
    await pool.query(
      'UPDATE Organizers SET account_status = ?, is_active = ?, approved_by_admin = ?, approval_date = NOW() WHERE organizer_id = ?',
      [status, isActive, admin_id, id]
    );
    
    res.json({ message: `Organizer ${action}d successfully` });
  } catch (error) {
    console.error('Organizer approval error:', error);
    res.status(500).json({ error: 'Failed to update organizer status' });
  }
});

// Get pending events (admin)
app.get('/api/admin/pending-events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT 
        e.event_id,
        e.event_name,
        e.event_type,
        e.start_date,
        e.venue,
        e.created_at,
        o.full_name as organizer_name,
        o.email as organizer_email
      FROM Events e
      JOIN Organizers o ON e.organizer_id = o.organizer_id
      WHERE e.approval_status = 'pending'
      ORDER BY e.created_at ASC
    `);
    res.json(events);
  } catch (error) {
    console.error('Get pending events error:', error);
    res.status(500).json({ error: 'Failed to fetch pending events' });
  }
});

// Approve/Reject event (admin)
app.post('/api/admin/events/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { action, admin_id, remarks } = req.body; // action: 'approve' or 'reject'
    
    const status = action === 'approve' ? 'approved' : 'rejected';
    
    await pool.query(
      'UPDATE Events SET approval_status = ? WHERE event_id = ?',
      [status, id]
    );
    
    res.json({ message: `Event ${action}d successfully` });
  } catch (error) {
    console.error('Event approval error:', error);
    res.status(500).json({ error: 'Failed to update event status' });
  }
});

// Get dashboard stats (admin)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM Students) as total_students,
        (SELECT COUNT(*) FROM Organizers WHERE account_status = 'approved') as total_organizers,
        (SELECT COUNT(*) FROM Events WHERE approval_status = 'approved') as total_events,
        (SELECT COUNT(*) FROM Registrations) as total_registrations,
        (SELECT COUNT(*) FROM Organizers WHERE account_status = 'pending') as pending_organizers,
        (SELECT COUNT(*) FROM Events WHERE approval_status = 'pending') as pending_events
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
