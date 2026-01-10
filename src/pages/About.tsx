import React from 'react';
import { Users, Calendar, Award, Target, Heart, Zap, Mail, Phone, MapPin, Globe, Star, Shield, Rocket } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    { name: 'Dr. Rajesh Kumar', role: 'Faculty Advisor', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Priya Sharma', role: 'Student Coordinator', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Amit Patel', role: 'Technical Lead', image: 'https://randomuser.me/api/portraits/men/67.jpg' },
    { name: 'Sneha Reddy', role: 'Event Manager', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  ];

  const stats = [
    { value: '500+', label: 'Events Hosted', icon: Calendar },
    { value: '10,000+', label: 'Students Registered', icon: Users },
    { value: '50+', label: 'Organizers', icon: Award },
    { value: '98%', label: 'Satisfaction Rate', icon: Star },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
            borderRadius: '20px',
            marginBottom: '1.5rem',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
          }}>
            <Zap size={40} color="white" strokeWidth={2} />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            letterSpacing: '1px'
          }}>
            About NEXUS
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Your comprehensive event management platform designed for college and university communities. 
            We make event discovery, registration, and management seamless and enjoyable.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} style={{
                background: 'rgba(16, 185, 129, 0.08)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <Icon size={32} style={{ color: '#10b981', marginBottom: '1rem' }} />
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '3rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Target size={28} color="#10b981" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Our Mission</h2>
          </div>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
            NEXUS aims to revolutionize how educational institutions manage and participate in events. 
            We believe that seamless event management leads to better engagement, stronger communities, 
            and more memorable experiences for students, organizers, and administrators alike.
            Our platform bridges the gap between event organizers and participants, making campus life more vibrant and connected.
          </p>
        </div>

        {/* Features Grid */}
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          What We Offer
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {[
            { icon: Calendar, title: 'Event Discovery', desc: 'Browse and discover events happening across your campus with powerful search and filters.' },
            { icon: Users, title: 'Easy Registration', desc: 'Register for events with just a few clicks and manage all your participations in one place.' },
            { icon: Rocket, title: 'For Organizers', desc: 'Create, manage, and track your events with powerful analytics and attendee management tools.' },
            { icon: Shield, title: 'Secure Platform', desc: 'Your data is protected with industry-standard security measures and privacy controls.' },
            { icon: Heart, title: 'Community Building', desc: 'Connect with like-minded individuals and build lasting relationships through shared experiences.' },
            { icon: Globe, title: 'Multi-Portal Access', desc: 'Dedicated portals for students, organizers, and administrators with role-based features.' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.15))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <feature.icon size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Meet Our Team
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {teamMembers.map((member, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <img 
                src={member.image} 
                alt={member.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem',
                  border: '3px solid rgba(16, 185, 129, 0.4)'
                }}
              />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
                {member.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#10b981', margin: 0 }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div id="contact" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Get in Touch
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Mail size={24} color="#10b981" />
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Email</div>
                <a href="mailto:support@nexus-events.com" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
                  support@nexus-events.com
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Phone size={24} color="#10b981" />
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Phone</div>
                <a href="tel:+919876543210" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
                  +91 98765 43210
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={24} color="#10b981" />
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Location</div>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>
                  College Campus, Main Building
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
