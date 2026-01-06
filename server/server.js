console.log('--- Starting server.js ---');

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import database configuration
const { pool, testConnection } = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test database connection on startup
testConnection()
  .then((connected) => {
    if (!connected) {
      console.error('❌ Failed to connect to database. Exiting...');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// ==================== USER ROUTES ====================

// Register student
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, phone, college, year = '1', studentId } = req.body;
    
    console.log('Registration attempt:', { name, email, phone, college, year });
    
    // Check if user exists (only check email since studentId column doesn't exist)
    const [existing] = await pool.query('SELECT * FROM Students WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user (using actual column names from your database)
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
        studentId: user.student_id, // Use student_id as studentId for frontend compatibility
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

// Get all users (for admin)
app.get('/api/users', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT student_id as id, full_name as name, email, "student" as role FROM Students');
    const [organizers] = await pool.query('SELECT organizer_id as id, full_name as name, email, "organizer" as role, account_status FROM Organizers');
    const [admins] = await pool.query('SELECT admin_id as id, name, email, role FROM Admins');
    res.json([...students, ...organizers, ...admins]);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user (for admin)
app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let user = null;

        const [student] = await pool.query('SELECT student_id as id, full_name as name, email, "student" as role FROM Students WHERE student_id = ?', [id]);
        if (student.length > 0) {
            user = student[0];
        } else {
            const [organizer] = await pool.query('SELECT organizer_id as id, full_name as name, email, "organizer" as role, account_status FROM Organizers WHERE organizer_id = ?', [id]);
            if (organizer.length > 0) {
                user = organizer[0];
            } else {
                const [admin] = await pool.query('SELECT admin_id as id, name, email, role FROM Admins WHERE admin_id = ?', [id]);
                if (admin.length > 0) {
                    user = admin[0];
                }
            }
        }

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Delete user (for admin)
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let result = await pool.query('DELETE FROM Students WHERE student_id = ?', [id]);
    if (result[0].affectedRows === 0) {
        result = await pool.query('DELETE FROM Organizers WHERE organizer_id = ?', [id]);
        if (result[0].affectedRows === 0) {
            result = await pool.query('DELETE FROM Admins WHERE admin_id = ?', [id]);
        }
    }

    if (result[0].affectedRows > 0) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Update user role (for master admin)
app.put('/api/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // This is a simplified implementation. A more robust solution would handle moving user data between tables.
    // For now, we'll focus on promoting users to admins.
    if (role === 'admin') {
      let userQuery = await pool.query('SELECT * FROM Students WHERE student_id = ?', [id]);
      let user = userQuery[0][0];

      if (!user) {
        userQuery = await pool.query('SELECT * FROM Organizers WHERE organizer_id = ?', [id]);
        user = userQuery[0][0];
      }

      if (user) {
        const [existingAdmin] = await pool.query('SELECT * FROM Admins WHERE email = ?', [user.email]);
        if (existingAdmin.length === 0) {
            const name = user.full_name || user.name;
            await pool.query('INSERT INTO Admins (name, email, password, role) VALUES (?, ?, ?, ?)', [name, user.email, user.password, 'reviewer']);
            res.json({ message: 'User promoted to admin.' });
        } else {
            res.status(400).json({ error: 'User is already an admin.' });
        }
      } else {
        res.status(404).json({ error: 'User not found to promote.' });
      }
    } else {
        // Demoting or other role changes would require more complex logic.
        res.status(400).json({ error: 'Only promotion to admin is supported in this version.' });
    }
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});


// ==================== EVENT ROUTES ====================

// Helper function to parse event fields
const parseEvent = (event) => {
  try {
    return {
      ...event,
      images: event.images ? JSON.parse(event.images) : [],
      tags: event.tags ? JSON.parse(event.tags) : [],
      prizes: event.prizes ? JSON.parse(event.prizes) : [],
      requirements: event.requirements ? JSON.parse(event.requirements) : [],
      contact_info: event.contact_info ? JSON.parse(event.contact_info) : {},
      payment_info: event.payment_info ? JSON.parse(event.payment_info) : {},
      social_links: event.social_links ? JSON.parse(event.social_links) : {},
    };
  } catch (e) {
    console.error('Failed to parse JSON fields for event:', event.event_id);
    return event; // return as is if parsing fails
  }
};


// Get all approved events
app.get('/api/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT 
        e.*,
        o.full_name as organizer_name,
        o.department as organizer_department,
        (SELECT COUNT(*) FROM Registrations r WHERE r.event_id = e.event_id) as registered_count
      FROM Events e
      JOIN Organizers o ON e.organizer_id = o.organizer_id
      WHERE e.approval_status = 'approved'
      ORDER BY e.start_date ASC
    `);
    const parsedEvents = events.map(parseEvent);
    res.json(parsedEvents);
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
        (SELECT COUNT(*) FROM Registrations r WHERE r.event_id = e.event_id) as registered_count
      FROM Events e
      JOIN Organizers o ON e.organizer_id = o.organizer_id
      WHERE e.event_id = ? AND e.approval_status = 'approved'
    `, [req.params.id]);
    
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const parsedEvent = parseEvent(events[0]);
    res.json(parsedEvent);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create event (organizer only)
app.post('/api/events', async (req, res) => {
  try {
    const { 
      eventName, description, shortDescription, eventType, startDate, endDate, time, venue, 
      registrationFee, maxParticipants, organizerId, images, tags, prizes, requirements,
      contactInfo, paymentInfo, socialLinks
    } = req.body;
    
    // Verify organizer exists and is approved
    const [organizer] = await pool.query(
      'SELECT * FROM Organizers WHERE organizer_id = ? AND account_status = "approved"',
      [organizerId]
    );
    
    if (organizer.length === 0) {
      return res.status(403).json({ error: 'Organizer not found or not approved' });
    }
    
    const [result] = await pool.query(
      `INSERT INTO Events (event_name, short_description, event_type, description, start_date, end_date, time, venue, 
       registration_fee, max_participants, organizer_id, images, tags, prizes, requirements, contact_info, payment_info, social_links) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        eventName, shortDescription, eventType, description, startDate, endDate, time, venue, 
        registrationFee || 0, maxParticipants, organizerId,
        JSON.stringify(images || []),
        JSON.stringify(tags || []),
        JSON.stringify(prizes || []),
        JSON.stringify(requirements || []),
        JSON.stringify(contactInfo || {}),
        JSON.stringify(paymentInfo || {}),
        JSON.stringify(socialLinks || {})
      ]
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

// Update event (organizer only)
app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      eventName, description, shortDescription, eventType, startDate, endDate, time, venue, 
      registrationFee, maxParticipants, organizerId, images, tags, prizes, requirements,
      contactInfo, paymentInfo, socialLinks, status
    } = req.body;

    // Verify organizer owns this event
    const [event] = await pool.query('SELECT organizer_id FROM Events WHERE event_id = ?', [id]);
    if (event.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (event[0].organizer_id !== organizerId) {
        return res.status(403).json({ error: 'You are not authorized to update this event.' });
    }

    const [result] = await pool.query(
      `UPDATE Events SET 
        event_name = ?, short_description = ?, event_type = ?, description = ?, start_date = ?, 
        end_date = ?, time = ?, venue = ?, registration_fee = ?, max_participants = ?, 
        images = ?, tags = ?, prizes = ?, requirements = ?, contact_info = ?, payment_info = ?, social_links = ?, status = ?
       WHERE event_id = ?`,
      [
        eventName, shortDescription, eventType, description, startDate, endDate, time, venue,
        registrationFee, maxParticipants,
        JSON.stringify(images || []),
        JSON.stringify(tags || []),
        JSON.stringify(prizes || []),
        JSON.stringify(requirements || []),
        JSON.stringify(contactInfo || {}),
        JSON.stringify(paymentInfo || {}),
        JSON.stringify(socialLinks || {}),
        status,
        id
      ]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event (organizer or admin)
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // In a real app, you'd also check for user role (admin) or ownership (organizer) here
    const [result] = await pool.query('DELETE FROM Events WHERE event_id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Failed to delete event' });
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

// Unregister from event
app.delete('/api/registrations', async (req, res) => {
  try {
    const { event_id, user_id } = req.body;
    
    const [result] = await pool.query(
      'DELETE FROM Registrations WHERE event_id = ? AND student_id = ?',
      [event_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.json({ message: 'Unregistered successfully' });
  } catch (error) {
    console.error('Unregistration error:', error);
    res.status(500).json({ error: 'Unregistration failed' });
  }
});

// ==================== COLLEGE MANAGEMENT ROUTES ====================

// Get all colleges (for master admin)
app.get('/api/colleges', async (req, res) => {
  try {
    // Since we don't have a colleges table, we'll aggregate from organizers
    const [colleges] = await pool.query(`
      SELECT 
        o.department as name,
        COUNT(DISTINCT o.organizer_id) as admin_count,
        COUNT(DISTINCT e.event_id) as event_count,
        'active' as status,
        MIN(o.created_at) as joined_date,
        MAX(o.updated_at) as last_activity
      FROM Organizers o
      LEFT JOIN Events e ON o.organizer_id = e.organizer_id
      WHERE o.department IS NOT NULL AND o.department != ''
      GROUP BY o.department
      ORDER BY o.department
    `);
    
    // Add mock data for demonstration
    const mockColleges = [
      {
        id: '1',
        name: 'MIT College of Engineering',
        location: 'Cambridge, MA',
        email: 'admin@mit.edu',
        phone: '+1-617-253-1000',
        website: 'https://mit.edu',
        admin_count: 12,
        event_count: 45,
        student_count: 11000,
        status: 'active',
        joined_date: '2023-01-15',
        last_activity: '2 hours ago'
      }
    ];
    
    res.json(mockColleges);
  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// Add college (for master admin)
app.post('/api/colleges', async (req, res) => {
  try {
    const { name, location, email, phone, website } = req.body;
    
    // For now, we'll create a placeholder admin for this college
    const hashedPassword = await bcrypt.hash('defaultPassword123', 10);
    
    const [result] = await pool.query(
      'INSERT INTO Admins (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [`${name} Admin`, email, hashedPassword, phone || '', 'event_manager']
    );

    res.status(201).json({ 
      message: 'College added successfully',
      collegeId: result.insertId 
    });
  } catch (error) {
    console.error('Add college error:', error);
    res.status(500).json({ error: 'Failed to add college' });
  }
});

// Update college (for master admin)
app.put('/api/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, email, phone, website, status } = req.body;
    
    // Update admin record (simplified approach)
    const [result] = await pool.query(
      'UPDATE Admins SET name = ?, email = ?, phone = ? WHERE admin_id = ?',
      [name, email, phone, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json({ message: 'College updated successfully' });
  } catch (error) {
    console.error('Update college error:', error);
    res.status(500).json({ error: 'Failed to update college' });
  }
});

// Delete college (for master admin)
app.delete('/api/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM Admins WHERE admin_id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    console.error('Delete college error:', error);
    res.status(500).json({ error: 'Failed to delete college' });
  }
});

// ==================== ADMIN MANAGEMENT ROUTES ====================

// Get all admins (for master admin)
app.get('/api/admins', async (req, res) => {
  try {
    const [admins] = await pool.query(`
      SELECT 
        admin_id as id,
        name,
        email,
        phone,
        role,
        'Computer Science' as department,
        'active' as status,
        0 as events_managed,
        last_login,
        created_at as joined_date
      FROM Admins
      ORDER BY created_at DESC
    `);
    
    res.json(admins);
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Add admin (for master admin)
app.post('/api/admins', async (req, res) => {
  try {
    const { name, email, phone, department, role, password } = req.body;
    
    // Check if admin exists
    const [existing] = await pool.query('SELECT * FROM Admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password || 'defaultPassword123', 10);
    
    const [result] = await pool.query(
      'INSERT INTO Admins (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone || '', role || 'reviewer']
    );

    res.status(201).json({ 
      message: 'Admin added successfully',
      adminId: result.insertId 
    });
  } catch (error) {
    console.error('Add admin error:', error);
    res.status(500).json({ error: 'Failed to add admin' });
  }
});

// Update admin (for master admin)
app.put('/api/admins/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;
    
    const [result] = await pool.query(
      'UPDATE Admins SET name = ?, email = ?, phone = ?, role = ? WHERE admin_id = ?',
      [name, email, phone, role, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

// Delete admin (for master admin)
app.delete('/api/admins/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM Admins WHERE admin_id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

// ==================== NOTIFICATION ROUTES ====================

// Get all notifications (for master admin)
app.get('/api/notifications', async (req, res) => {
  try {
    const [notifications] = await pool.query(`
      SELECT 
        notification_id as id,
        message as title,
        message,
        type,
        'medium' as priority,
        user_type as category,
        status,
        sent_at as created_at,
        sent_at,
        0 as read_count,
        1 as total_recipients
      FROM Notifications
      ORDER BY sent_at DESC
      LIMIT 50
    `);
    
    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Create notification (for master admin)
app.post('/api/notifications', async (req, res) => {
  try {
    const { title, message, type, priority, category, recipients } = req.body;
    
    // Insert notification for each recipient type
    if (recipients.includes('all_users')) {
      // Notify all students
      await pool.query(`
        INSERT INTO Notifications (user_type, user_id, message, type, status)
        SELECT 'student', student_id, ?, ?, 'unread'
        FROM Students
      `, [message, type]);
      
      // Notify all organizers
      await pool.query(`
        INSERT INTO Notifications (user_type, user_id, message, type, status)
        SELECT 'organizer', organizer_id, ?, ?, 'unread'
        FROM Organizers
      `, [message, type]);
      
      // Notify all admins
      await pool.query(`
        INSERT INTO Notifications (user_type, user_id, message, type, status)
        SELECT 'admin', admin_id, ?, ?, 'unread'
        FROM Admins
      `, [message, type]);
    }

    res.status(201).json({ 
      message: 'Notification created and sent successfully'
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// Delete notification (for master admin)
app.delete('/api/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM Notifications WHERE notification_id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
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
      [name, email, hashedPassword, phone || '', 'master']
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
