import React, { useState } from 'react';
import './Home.css';

const Home = ({ userName, userEmail = 'gnanesh@gmail.com', userRole = 'user', onLogout, onNavigate }) => {
  const [searchData, setSearchData] = useState({
    serviceName: '',
    serviceType: '',
    priceRange: ''
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(userRole === 'admin' ? 'admin' : 'home');

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [bookedServices, setBookedServices] = useState([]); // Store booked services
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    serviceDate: '',
    serviceTime: '',
    description: '',
    urgency: 'normal'
  });

  // Admin states
  const [adminView, setAdminView] = useState('overview');
  const [users, setUsers] = useState([
    { id: 1, name: 'Gnanesh', email: 'gnanesh@gmail.com', role: 'user', joinDate: '2025-10-15', bookings: 3 },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', joinDate: '2025-10-20', bookings: 1 },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', joinDate: '2025-10-25', bookings: 2 }
  ]);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', joinDate: new Date().toISOString().split('T')[0], bookings: 0 });
  const [newService, setNewService] = useState({ title: '', category: '', badge: 'New', badgeColor: 'blue', rating: 5.0, reviews: 0, price: '', description: '', features: [] });
  const [allServices, setAllServices] = useState([
    {
      id: 1,
      title: 'Professional Plumbing',
      image: '/plumbing.jpg',
      category: 'Repair',
      badge: 'Popular',
      badgeColor: 'blue',
      rating: 4.8,
      reviews: 245,
      price: '$50 - $200',
      description: 'Expert leak fixes & installations. Professional plumbing solutions with advanced equipment and experienced technicians.',
      features: ['Emergency service', 'Leak detection', 'Pipe installation', 'Water heater repair']
    },
    {
      id: 2,
      title: 'Electrical Services',
      image: '/electical.jpg',
      category: 'Repair',
      badge: 'Popular',
      badgeColor: 'yellow',
      rating: 4.9,
      reviews: 312,
      price: '$75 - $300',
      description: 'Wiring, repair & safety checks. Licensed electricians providing safe and reliable electrical solutions.',
      features: ['Wiring & rewiring', 'Circuit breaker repair', 'Safety inspections', 'Outlet installation']
    },
    {
      id: 3,
      title: 'Home Deep Cleaning',
      image: '/deep cleaning.jpg',
      category: 'Cleaning',
      badge: 'Trending',
      badgeColor: 'green',
      rating: 4.7,
      reviews: 428,
      price: '$40 - $150',
      description: 'Spotless, healthier living spaces. Transform your home with our professional deep cleaning services.',
      features: ['Deep carpet cleaning', 'Kitchen sanitization', 'Bathroom cleaning', 'Window washing']
    },
    {
      id: 4,
      title: 'AC & HVAC Services',
      image: '/ac.jpg',
      category: 'Repair',
      badge: 'Hot',
      badgeColor: 'orange',
      rating: 4.8,
      reviews: 189,
      price: '$60 - $250',
      description: 'Experienced HVAC technicians for AC cooling and heating needs, ensuring comfort year-round.',
      features: ['AC repair & service', 'Installation', 'Maintenance', 'Emergency cooling']
    },
    {
      id: 5,
      title: 'Professional Painting',
      image: '/painting.jpg',
      category: 'Renovation',
      badge: 'Popular',
      badgeColor: 'pink',
      rating: 4.6,
      reviews: 156,
      price: '$100 - $500',
      description: 'Professional painting services for interior, with creative color consultations and quality finishes.',
      features: ['Interior painting', 'Exterior painting', 'Color consultation', 'Wall preparation']
    },
    {
      id: 6,
      title: 'Carpentry & Woodwork',
      image: '/carpentry.jpg',
      category: 'Renovation',
      badge: 'Featured',
      badgeColor: 'orange',
      rating: 4.7,
      reviews: 203,
      price: '$80 - $350',
      description: 'Skilled carpenter services for expert furniture, cabinet installation, and custom woodworking projects.',
      features: ['Custom furniture', 'Cabinet installation', 'Door repair', 'Wood refinishing']
    },
    {
      id: 7,
      title: 'Smart Home Installation',
      image: '/smart.jpg',
      category: 'Technology',
      badge: 'New',
      badgeColor: 'purple',
      rating: 4.9,
      reviews: 134,
      price: '$150 - $600',
      description: 'Expert smart home and security systems for modern connected living with automation.',
      features: ['Smart device setup', 'Home automation', 'Voice control', 'App integration']
    },
    {
      id: 8,
      title: 'Bathroom Renovation',
      image: '/bath.jpg',
      category: 'Renovation',
      badge: 'Premium',
      badgeColor: 'teal',
      rating: 4.8,
      reviews: 267,
      price: '$500 - $3000',
      description: 'Complete bathroom transformation with modern fixtures, tiling, and custom design services.',
      features: ['Complete remodeling', 'Fixture installation', 'Tiling', 'Modern design']
    },
    {
      id: 9,
      title: 'Flooring Solutions',
      image: '/flooring.jpg',
      category: 'Renovation',
      badge: 'Quality',
      badgeColor: 'gray',
      rating: 4.7,
      reviews: 198,
      price: '$200 - $1500',
      description: 'Professional flooring installation including hardwood, tile, carpet, and laminate options.',
      features: ['Hardwood installation', 'Tile flooring', 'Carpet fitting', 'Floor refinishing']
    },
    {
      id: 10,
      title: 'Kitchen Appliance Repair',
      image: '/kit.jpg',
      category: 'Repair',
      badge: 'Fast',
      badgeColor: 'blue',
      rating: 4.6,
      reviews: 289,
      price: '$55 - $220',
      description: 'On-site kitchen repairs. Quick and reliable appliance repair services for all major brands.',
      features: ['Refrigerator repair', 'Oven servicing', 'Dishwasher fix', 'Same-day service']
    },
    {
      id: 11,
      title: 'Garden & Landscaping',
      image: '/garden.jpg',
      category: 'Outdoor',
      badge: 'Eco',
      badgeColor: 'green',
      rating: 4.5,
      reviews: 176,
      price: '$90 - $400',
      description: 'Transform outdoor spaces with professional landscaping, garden design, and lawn maintenance.',
      features: ['Lawn maintenance', 'Garden design', 'Tree trimming', 'Irrigation systems']
    },
    {
      id: 12,
      title: 'Roofing & Gutter Service',
      image: '/roof.jpg',
      category: 'Repair',
      badge: 'Trusted',
      badgeColor: 'gray',
      rating: 4.8,
      reviews: 145,
      price: '$150 - $800',
      description: 'Professional roofing and gutter cleaning services with quality materials and expert workmanship.',
      features: ['Roof repair', 'Gutter cleaning', 'Leak fixing', 'Inspection']
    },
    {
      id: 13,
      title: 'Window Installation & Repair',
      image: '/wind.jpg',
      category: 'Repair',
      badge: 'Quality',
      badgeColor: 'gray',
      rating: 4.7,
      reviews: 167,
      price: '$100 - $500',
      description: 'Complete window services including installation, repair, and energy-efficient replacements.',
      features: ['Window replacement', 'Glass repair', 'Energy efficient', 'Custom sizes']
    },
    {
      id: 14,
      title: 'Security System Installation',
      image: '/sec.jpg',
      category: 'Technology',
      badge: 'Premium',
      badgeColor: 'red',
      rating: 4.9,
      reviews: 203,
      price: '$200 - $1000',
      description: 'Complete home security system installation including cameras, sensors, and 24/7 monitoring.',
      features: ['CCTV installation', 'Alarm systems', '24/7 monitoring', 'Smart locks']
    },
    {
      id: 17,
      title: 'Handyman Services',
      image: '/man.jpg',
      category: 'General',
      badge: 'Versatile',
      badgeColor: 'gray',
      rating: 4.8,
      reviews: 312,
      price: '$40 - $150',
      description: 'All-in-one handyman services for minor repairs, installations, and home improvement tasks.',
      features: ['Minor repairs', 'Furniture assembly', 'TV mounting', 'General fixes']
    },
    {
      id: 18,
      title: 'Pool Maintenance',
      image: '/pool.jpg',
      category: 'Outdoor',
      badge: 'Summer',
      badgeColor: 'blue',
      rating: 4.5,
      reviews: 127,
      price: '$70 - $250',
      description: 'Professional pool cleaning, maintenance, and repair services for crystal clear water.',
      features: ['Pool cleaning', 'Chemical balance', 'Equipment repair', 'Regular maintenance']
    }
  ]);

  const categories = ['All Categories', 'Repair', 'Cleaning', 'Renovation', 'Technology', 'Outdoor', 'General'];

  // Get top 5 services by rating for home page
  const topRatedServices = [...allServices]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const filteredServices = allServices.filter(service => {
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const services = allServices.slice(0, 4); // Show first 4 on home page

  const stats = [
    { number: '8K+', label: 'Happy Customers' },
    { number: '6K+', label: 'Services Completed' },
    { number: '2K+', label: 'Expert Professionals' }
  ];

  const features = [
    {
      icon: '🏆',
      title: 'Verified Professionals',
      description: 'All our service providers are background checked and verified'
    },
    {
      icon: '💎',
      title: 'Transparent Pricing',
      description: 'Fair, transparent pricing with no hidden costs or surprise fees'
    },
    {
      icon: '🎯',
      title: '24/7 Support',
      description: 'Get round-the-clock customer support for all your queries'
    }
  ];

  const handleLogout = () => {
    setShowProfileMenu(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    // Navigate to services page
    setCurrentPage('service');
    
    // Apply filters based on search data
    if (searchData.serviceName) {
      setSearchQuery(searchData.serviceName);
    }
    if (searchData.serviceType && searchData.serviceType !== '') {
      setSelectedCategory(searchData.serviceType);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearchData({
      serviceName: '',
      serviceType: '',
      priceRange: ''
    });
    setSearchQuery('');
    setSelectedCategory('All Categories');
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetailModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
    setShowDetailModal(false);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setBookingData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      serviceDate: '',
      serviceTime: '',
      description: '',
      urgency: 'normal'
    });
    document.body.style.overflow = 'auto';
  };

  const handleBookingInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!bookingData.fullName || !bookingData.email || !bookingData.phone || 
        !bookingData.address || !bookingData.city || !bookingData.zipCode ||
        !bookingData.serviceDate || !bookingData.serviceTime || !bookingData.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(bookingData.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    // Create booking object
    const newBooking = {
      id: Date.now(),
      service: selectedService,
      bookingDetails: { ...bookingData },
      bookingDate: new Date().toLocaleDateString(),
      status: 'Scheduled',
      scheduledDate: bookingData.serviceDate,
      scheduledTime: bookingData.serviceTime
    };

    // Add to bookings
    setBookedServices(prev => [...prev, newBooking]);

    // Reset and close
    handleCloseBookingModal();
    
    // Navigate to bookings
    handleNavigation('bookings');
    
    alert('Booking confirmed successfully! Check My Bookings to view details.');
  };

  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDetailsModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseBookingDetailsModal = () => {
    setShowBookingDetailsModal(false);
    setSelectedBooking(null);
    document.body.style.overflow = 'auto';
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookedServices(prev => prev.filter(booking => booking.id !== bookingId));
      setShowBookingDetailsModal(false);
      setSelectedBooking(null);
      document.body.style.overflow = 'auto';
      alert('Booking cancelled successfully!');
    }
  };

  // Admin functions
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setAllServices(prev => prev.filter(service => service.id !== serviceId));
    }
  };

  const handleUpdateService = (serviceId, field, value) => {
    setAllServices(prev => prev.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditUserModal(true);
  };

  const handleSaveUser = () => {
    setUsers(prev => prev.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    setShowEditUserModal(false);
    setEditingUser(null);
  };

  const handleAddUser = () => {
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers(prev => [...prev, { ...newUser, id: newId }]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: 'user', joinDate: new Date().toISOString().split('T')[0], bookings: 0 });
  };

  const handleEditService = (service) => {
    setEditingService({ ...service });
    setShowEditServiceModal(true);
  };

  const handleSaveService = () => {
    setAllServices(prev => prev.map(service => 
      service.id === editingService.id ? editingService : service
    ));
    setShowEditServiceModal(false);
    setEditingService(null);
  };

  const handleAddService = () => {
    const newId = Math.max(...allServices.map(s => s.id), 0) + 1;
    setAllServices(prev => [...prev, { 
      ...newService, 
      id: newId,
      image: '/service-default.jpg',
      features: newService.features.filter(f => f.trim() !== '')
    }]);
    setShowAddServiceModal(false);
    setNewService({ title: '', category: '', badge: 'New', badgeColor: 'blue', rating: 5.0, reviews: 0, price: '', description: '', features: [] });
  };

  const displayServices = currentPage === 'service' ? allServices : services;

  return (
    <div className="home-wrapper">
      {/* Navigation Header */}
      <header className={`main-header ${currentPage === 'admin' ? 'header-admin' : ''}`}>
        <div className="header-container">
          <div className="logo-section">
            <h1 className="brand-logo">HomeServe</h1>
          </div>
          
          <nav className="main-nav">
            <a href="#home" className={currentPage === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => handleNavigation('home')}>
              <span>🏠</span> Home
            </a>
            <a href="#service" className={currentPage === 'service' ? 'nav-link active' : 'nav-link'} onClick={() => handleNavigation('service')}>
              <span>🛠️</span> Services
            </a>
            <a href="#bookings" className={currentPage === 'bookings' ? 'nav-link active' : 'nav-link'} onClick={() => handleNavigation('bookings')}>
              <span>📅</span> My Bookings
            </a>
            <a href="#about" className={currentPage === 'about' ? 'nav-link active' : 'nav-link'} onClick={() => handleNavigation('about')}>
              <span>ℹ️</span> About Us
            </a>
            {userRole === 'admin' && (
              <a href="#admin" className={`nav-link admin-link ${currentPage === 'admin' ? 'active' : ''}`} onClick={() => handleNavigation('admin')}>
                <span>⚙️</span> Admin Dashboard
              </a>
            )}
          </nav>

          <div className="header-actions">
            <div className="profile-dropdown-wrapper">
              <button 
                className="profile-icon-btn" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {userName ? userName.charAt(0).toUpperCase() : 'G'}
              </button>
              
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <div className="profile-avatar">{userName ? userName.charAt(0).toUpperCase() : 'G'}</div>
                    <div className="profile-details">
                      <div className="profile-name">{userName || 'User'}</div>
                      <div className="profile-email">{userEmail}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 18a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    My Profile
                  </button>
                  <button className="dropdown-item" onClick={() => { handleNavigation('bookings'); setShowProfileMenu(false); }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M2 6h16M2 10h16M2 14h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    My Bookings
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h4m5 10l4-4m0 0l-4-4m4 4H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Conditional Rendering based on current page */}
      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section className="hero-section-main">
        <div className="hero-container">
          <div className="hero-content-left">
            <h1 className="hero-main-title">
              Find Your<br />
              Perfect Service
            </h1>
            <p className="hero-description">
              Explore our curated selection of professional home services 
              meticulously tailored to your unique needs and preferences
            </p>
            <button className="cta-button" onClick={() => handleNavigation('service')}>Book Services</button>

            {/* Search Bar */}
            <div className="search-box-wrapper">
              <div className="search-field">
                <label className="search-label">Service</label>
                <input 
                  type="text" 
                  placeholder="Enter service name" 
                  className="search-input"
                  value={searchData.serviceName}
                  onChange={(e) => setSearchData({...searchData, serviceName: e.target.value})}
                />
              </div>
              
              <div className="search-field">
                <label className="search-label">Category</label>
                <select 
                  className="search-input"
                  value={searchData.serviceType}
                  onChange={(e) => setSearchData({...searchData, serviceType: e.target.value})}
                >
                  <option value="">Select category</option>
                  <option value="Repair">Repair</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Technology">Technology</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="search-field">
                <label className="search-label">Price Range</label>
                <select 
                  className="search-input"
                  value={searchData.priceRange}
                  onChange={(e) => setSearchData({...searchData, priceRange: e.target.value})}
                >
                  <option value="">Select range</option>
                  <option value="0-100">$0 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>

              <button className="search-submit-btn" onClick={handleSearch}>Search</button>
            </div>
          </div>

          <div className="hero-content-right">
            <div className="hero-image-card">
              <img src="/welcome.jpg" alt="Dream Home" className="hero-main-image" />
              
              {/* Stats Card Overlay */}
              <div className="stats-overlay-card">
                <h3 className="stats-title">We Help You Find The Best Home Services</h3>
                <p className="stats-subtitle">
                  From quick repairs to complete renovations, our dedicated team of verified 
                  professionals guides you through every step
                </p>
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us Card */}
              <div className="why-choose-card">
                <h4 className="why-title">Why Choose Us</h4>
                <p className="why-subtitle">
                  Elevate Your Home Service Experience with Expertise, Integrity, and Unmatched Quality
                </p>
                <div className="features-list">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-item-inline">
                      <div className="feature-icon-small">{feature.icon}</div>
                      <div className="feature-content-small">
                        <h5>{feature.title}</h5>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="popular-section">
        <div className="section-container">
          <div className="section-heading">
            <h2 className="section-title-main">Discover Popular Services</h2>
            <a href="#all" className="see-all-link" onClick={(e) => { e.preventDefault(); handleNavigation('service'); }}>See All →</a>
          </div>

          <div className="services-grid-modern">
            {topRatedServices.map((service) => (
              <div key={service.id} className="service-card-modern">
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.title} className="service-image" />
                  <span className={`service-badge badge-${service.badgeColor}`}>{service.badge}</span>
                </div>
                <div className="service-info">
                  <div className="service-header-row">
                    <h3 className="service-name">{service.title}</h3>
                    <span className="service-price">{service.price}</span>
                  </div>
                  <p className="service-category-inline">� {service.category}</p>
                  <p className="service-desc">{service.description}</p>
                  <div className="service-footer-row">
                    <div className="rating-info">
                      <span className="star">⭐</span>
                      <span className="rating-text">{service.rating}</span>
                      <span className="reviews-text">({service.reviews} reviews)</span>
                    </div>
                    <button className="book-service-btn" onClick={() => handleBookNow(service)}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title-main">What People Say About HomeServe</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="/welcome.jpg" alt="Client" className="client-avatar" />
                <div className="client-info">
                  <h4 className="client-name">Michael Rodriguez</h4>
                  <p className="client-location">San Diego</p>
                </div>
                <div className="testimonial-rating">⭐ 4.3</div>
              </div>
              <p className="testimonial-text">
                "HomeServe provided exceptional service! The plumber was professional, 
                punctual, and fixed our issue quickly. Best home service platform!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="/welcome.jpg" alt="Client" className="client-avatar" />
                <div className="client-info">
                  <h4 className="client-name">Emily Johnson</h4>
                  <p className="client-location">Los Angeles</p>
                </div>
                <div className="testimonial-rating">⭐ 4.8</div>
              </div>
              <p className="testimonial-text">
                "Amazing experience! The cleaning service was thorough and the staff 
                was friendly. Will definitely use HomeServe again."
              </p>
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Service Page - Show all services with filters */}
      {currentPage === 'service' && (
        <section className="all-services-page">
          {/* Hero Header */}
          <div className="services-hero">
            <div className="services-hero-content">
              <h1 className="services-hero-title">Our Services</h1>
              <p className="services-hero-subtitle">
                Discover our comprehensive range of professional home services designed to meet your essential needs. 
                From everyday maintenance to specialized projects, trust HomeServe for quality service delivery.
              </p>
            </div>
          </div>

          <div className="section-container">
            {/* Search and Filter Bar */}
            <div className="services-filter-bar">
              <div className="search-box-services">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search services..." 
                  className="search-input-services"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="services-results">
              <p className="results-count">Showing {filteredServices.length} services</p>
              <div className="services-grid-full">
                {filteredServices.map((service) => (
                  <div key={service.id} className="service-card-full">
                    <div className="service-image-wrapper-full">
                      <img src={service.image} alt={service.title} className="service-image-full" />
                      <span className={`service-badge-full badge-${service.badgeColor}`}>
                        {service.badge}
                      </span>
                    </div>
                    <div className="service-content-full">
                      <div className="service-category-tag">{service.category}</div>
                      <h3 className="service-title-full">{service.title}</h3>
                      <p className="service-description-full">{service.description}</p>
                      
                      <div className="service-features-list">
                        <h4 className="features-heading">What's Included:</h4>
                        <ul className="features-ul">
                          {service.features.map((feature, index) => (
                            <li key={index} className="feature-item">
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <path d="M7 10l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="service-footer-full">
                        <div className="service-rating-full">
                          <span className="star">⭐</span>
                          <span className="rating-value">{service.rating}</span>
                          <span className="reviews-count">({service.reviews} reviews)</span>
                        </div>
                        <div className="service-price-full">{service.price}</div>
                      </div>

                      <div className="service-actions">
                        <button className="btn-view-details" onClick={() => handleViewDetails(service)}>View Full Details</button>
                        <button className="btn-book-now" onClick={() => handleBookNow(service)}>Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Can't Find Section */}
            <div className="cant-find-section">
              <h2 className="cant-find-title">Can't Find What You're Looking For?</h2>
              <p className="cant-find-text">
                We're constantly adding new services. Contact us to suggest specific services or get a quote for custom work.
              </p>
              <div className="cant-find-actions">
                <button className="btn-contact">Contact Support</button>
                <button className="btn-custom-quote">Request Custom Quote</button>
              </div>
            </div>
          </div>
        </section>
      )}







      {/* My Bookings Page */}
      {currentPage === 'bookings' && (
        <section className="bookings-section">
          {bookedServices.length === 0 ? (
            // Empty State
            <div className="bookings-empty-state">
              <div className="empty-state-content">
                <div className="empty-state-left">
                  <h1 className="empty-state-title">Your Bookings</h1>
                  <p className="empty-state-description">
                    Track and manage all your service bookings in one place. 
                    View booking history, upcoming appointments, and service details.
                  </p>
                  <button className="cta-button" onClick={() => handleNavigation('service')}>
                    Browse Services
                  </button>

                  <div className="empty-state-features">
                    <div className="empty-feature-card">
                      <div className="feature-icon">📅</div>
                      <h3>Easy Scheduling</h3>
                      <p>Book services at your convenience with flexible scheduling options</p>
                    </div>
                    <div className="empty-feature-card">
                      <div className="feature-icon">🔔</div>
                      <h3>Real-time Updates</h3>
                      <p>Get instant notifications about your booking status and provider arrival</p>
                    </div>
                    <div className="empty-feature-card">
                      <div className="feature-icon">⭐</div>
                      <h3>Service History</h3>
                      <p>Access your complete service history and re-book your favorite providers</p>
                    </div>
                  </div>
                </div>

                <div className="empty-state-right">
                  <div className="empty-state-image-card">
                    <img src="/welcome.jpg" alt="No Bookings" className="empty-state-image" />
                  </div>
                  
                  <div className="empty-stats-card">
                    <h3 className="stats-card-title">Why Choose Us</h3>
                    <div className="stats-list">
                      <div className="stat-item-vertical">
                        <span className="stat-icon">✓</span>
                        <span className="stat-text">Verified & trusted professionals</span>
                      </div>
                      <div className="stat-item-vertical">
                        <span className="stat-icon">✓</span>
                        <span className="stat-text">Transparent pricing, no hidden fees</span>
                      </div>
                      <div className="stat-item-vertical">
                        <span className="stat-icon">✓</span>
                        <span className="stat-text">24/7 customer support available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Bookings List
            <div className="section-container">
              <h2 className="section-title-main">My Bookings</h2>
              <p className="bookings-subtitle">Manage and track all your scheduled services</p>
              <div className="bookings-grid">
                {bookedServices.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <span className={`booking-status status-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                      <span className="booking-date">Booked: {booking.bookingDate}</span>
                    </div>
                    
                    <div className="booking-body">
                      <div className="booking-image-wrapper">
                        <img src={booking.service.image} alt={booking.service.title} />
                      </div>
                      <div className="booking-details">
                        <h3 className="booking-service-title">{booking.service.title}</h3>
                        <p className="booking-category">{booking.service.category}</p>
                        <p className="booking-price">{booking.service.price}</p>
                        
                        <div className="booking-info-row">
                          <div className="info-item">
                            <span className="info-icon">📅</span>
                            <span>{booking.scheduledDate}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-icon">🕒</span>
                            <span>{booking.scheduledTime}</span>
                          </div>
                        </div>

                        <div className="booking-customer-info">
                          <div className="customer-detail">
                            <span className="detail-label">Contact:</span>
                            <span className="detail-value">{booking.bookingDetails.phone}</span>
                          </div>
                          <div className="customer-detail">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">{booking.bookingDetails.city}</span>
                          </div>
                          <div className="customer-detail">
                            <span className="detail-label">Urgency:</span>
                            <span className={`urgency-badge ${booking.bookingDetails.urgency}`}>
                              {booking.bookingDetails.urgency.charAt(0).toUpperCase() + booking.bookingDetails.urgency.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="booking-actions">
                      <button className="btn-booking-details" onClick={() => handleViewBookingDetails(booking)}>
                        Show Details
                      </button>
                      <button className="btn-booking-cancel" onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}






      {/* Admin Dashboard */}
      {currentPage === 'admin' && userRole === 'admin' && (
        <section className="admin-dashboard">
          <div className="admin-container">
            <div className="admin-header">
              <h1 className="admin-title">Admin Dashboard</h1>
              <p className="admin-subtitle">Manage users, services, and bookings</p>
            </div>

            {/* Admin Navigation Tabs */}
            <div className="admin-tabs">
              <button 
                className={`admin-tab ${adminView === 'overview' ? 'active' : ''}`}
                onClick={() => setAdminView('overview')}
              >
                📊 Overview
              </button>
              <button 
                className={`admin-tab ${adminView === 'users' ? 'active' : ''}`}
                onClick={() => setAdminView('users')}
              >
                👥 Users
              </button>
              <button 
                className={`admin-tab ${adminView === 'services' ? 'active' : ''}`}
                onClick={() => setAdminView('services')}
              >
                🛠️ Services
              </button>
              <button 
                className={`admin-tab ${adminView === 'bookings' ? 'active' : ''}`}
                onClick={() => setAdminView('bookings')}
              >
                📋 Bookings
              </button>
            </div>

            {/* Overview Section */}
            {adminView === 'overview' && (
              <div className="admin-overview">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <h3 className="stat-number">{users.length}</h3>
                      <p className="stat-label">Total Users</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🛠️</div>
                    <div className="stat-content">
                      <h3 className="stat-number">{allServices.length}</h3>
                      <p className="stat-label">Total Services</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                      <h3 className="stat-number">{bookedServices.length}</h3>
                      <p className="stat-label">Total Bookings</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                      <h3 className="stat-number">$12.5K</h3>
                      <p className="stat-label">Revenue</p>
                    </div>
                  </div>
                </div>

                <div className="recent-activity">
                  <h2 className="section-heading">Recent Activity</h2>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">📋</div>
                      <div className="activity-content">
                        <p className="activity-text"><strong>New booking</strong> from {bookedServices.length > 0 ? bookedServices[bookedServices.length - 1].bookingDetails.fullName : 'Customer'}</p>
                        <span className="activity-time">2 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">👤</div>
                      <div className="activity-content">
                        <p className="activity-text"><strong>New user</strong> registered: {users.length > 0 ? users[users.length - 1].name : 'User'}</p>
                        <span className="activity-time">15 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">⭐</div>
                      <div className="activity-content">
                        <p className="activity-text"><strong>5-star review</strong> received for Professional Plumbing</p>
                        <span className="activity-time">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Management */}
            {adminView === 'users' && (
              <div className="admin-users">
                <div className="table-header">
                  <h2 className="section-heading">User Management</h2>
                  <button className="btn-add" onClick={() => setShowAddUserModal(true)}>+ Add User</button>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Join Date</th>
                        <th>Bookings</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>#{user.id}</td>
                          <td className="user-name">
                            <div className="user-avatar">{user.name.charAt(0)}</div>
                            {user.name}
                          </td>
                          <td>{user.email}</td>
                          <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                          <td>{user.joinDate}</td>
                          <td>{user.bookings}</td>
                          <td>
                            <button className="btn-action edit" onClick={() => handleEditUser(user)}>✏️</button>
                            <button className="btn-action delete" onClick={() => handleDeleteUser(user.id)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Services Management */}
            {adminView === 'services' && (
              <div className="admin-services">
                <div className="admin-header">
                  <h1 className="admin-title">Service Management</h1>
                  <p className="admin-subtitle">Add, edit, and manage all services from one place</p>
                </div>
                <div className="admin-content">
                  <div className="table-header">
                    <div className="search-stats">
                      <h2 className="section-heading">All Services ({allServices.length})</h2>
                    </div>
                    <button className="btn-add" onClick={() => setShowAddServiceModal(true)}>
                      <span>+</span> Add New Service
                    </button>
                  </div>
                  <div className="services-grid-admin">
                    {allServices.map(service => (
                      <div key={service.id} className="service-card-admin">
                        <div className="service-card-header">
                          <span className={`badge-admin ${service.badgeColor}`}>{service.badge}</span>
                          <button 
                            className="btn-delete-service" 
                            onClick={() => handleDeleteService(service.id)}
                            title="Delete Service"
                          >
                            🗑️
                          </button>
                        </div>
                        <h3 className="service-title-admin">{service.title}</h3>
                        <p className="service-category-admin">{service.category}</p>
                        <div className="service-stats-admin">
                          <span title="Rating">⭐ {service.rating}</span>
                          <span title="Review Count">💬 {service.reviews} reviews</span>
                        </div>
                        <p className="service-price-admin">{service.price}</p>
                        <div className="service-actions-admin">
                          <button 
                            className="btn-edit-service" 
                            onClick={() => handleEditService(service)}
                            title="Edit Service Details"
                          >
                            <span>✏️</span> Edit
                          </button>
                          <button 
                            className="btn-view-service-admin" 
                            onClick={() => { setSelectedService(service); setShowDetailModal(true); }}
                            title="View Service Details"
                          >
                            <span>👁️</span> View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Management */}
            {adminView === 'bookings' && (
              <div className="admin-bookings">
                <div className="table-header">
                  <h2 className="section-heading">Bookings Management</h2>
                  <button className="btn-add">📊 Export</button>
                </div>
                {bookedServices.length === 0 ? (
                  <div className="empty-state-admin">
                    <div className="empty-icon">📋</div>
                    <h3>No Bookings Yet</h3>
                    <p>Bookings will appear here when users make service requests</p>
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Urgency</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookedServices.map(booking => (
                          <tr key={booking.id}>
                            <td>#{booking.id}</td>
                            <td>{booking.bookingDetails.fullName}</td>
                            <td>{booking.service.title}</td>
                            <td>{booking.scheduledDate}</td>
                            <td>{booking.scheduledTime}</td>
                            <td><span className="status-badge scheduled">{booking.status}</span></td>
                            <td><span className={`urgency-badge-admin ${booking.bookingDetails.urgency}`}>{booking.bookingDetails.urgency}</span></td>
                            <td>
                              <button className="btn-action view" onClick={() => handleViewBookingDetails(booking)}>👁️</button>
                              <button className="btn-action delete" onClick={() => handleCancelBooking(booking.id)}>🗑️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* About Us Page */}
      {currentPage === 'about' && (
        <section className="about-section">
          {/* Our Story Section */}
          <div className="story-section">
            <div className="section-container">
              <h2 className="story-title">Our Story</h2>
              <p className="story-description">
                Born from a simple idea: every home deserves exceptional care. We've revolutionized 
                how homeowners connect with trusted professionals, creating a platform built on trust, 
                transparency, and unwavering quality.
              </p>
              <div className="stats-boxes">
                <div className="stat-box">
                  <h3 className="stat-number">50K+</h3>
                  <p className="stat-label">Happy Homes</p>
                </div>
                <div className="stat-box">
                  <h3 className="stat-number">1,200+</h3>
                  <p className="stat-label">Trusted Pros</p>
                </div>
                <div className="stat-box">
                  <h3 className="stat-number">200+</h3>
                  <p className="stat-label">Cities Served</p>
                </div>
                <div className="stat-box">
                  <h3 className="stat-number">98%</h3>
                  <p className="stat-label">5-Star Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Journey Section */}
          <div className="journey-section">
            <div className="section-container">
              <h2 className="section-title-main">Our Journey</h2>
              <div className="journey-cards">
                <div className="journey-card">
                  <div className="journey-icon">💡</div>
                  <h3 className="journey-card-title">The Dream</h3>
                  <p className="journey-card-text">
                    In 2022, we saw homeowners struggling to find reliable service providers. Long waits, hidden 
                    fees, and questionable quality were the norm.
                  </p>
                </div>
                <div className="journey-card">
                  <div className="journey-icon">🎯</div>
                  <h3 className="journey-card-title">The Solution</h3>
                  <p className="journey-card-text">
                    We built a platform that connects verified professionals directly with homeowners, 
                    offering real-time availability and transparent pricing.
                  </p>
                </div>
                <div className="journey-card">
                  <div className="journey-icon">🚀</div>
                  <h3 className="journey-card-title">The Impact</h3>
                  <p className="journey-card-text">
                    Today, thousands of families trust us for their home services. We've not just built a platform - 
                    we've created a community.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="values-section">
            <div className="section-container">
              <h2 className="section-title-main">Our Core Values</h2>
              <p className="values-subtitle">
                These principles guide everything we do, from how we select professionals to how we serve our customers.
              </p>
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon">🛡️</div>
                  <h3 className="value-title">Trust First</h3>
                  <p className="value-text">
                    Every professional is thoroughly vetted, insured, and background-checked before joining our platform.
                  </p>
                </div>
                <div className="value-card">
                  <div className="value-icon">📊</div>
                  <h3 className="value-title">Transparency Always</h3>
                  <p className="value-text">
                    No hidden fees, upfront pricing, and real-time updates throughout your service journey.
                  </p>
                </div>
                <div className="value-card">
                  <div className="value-icon">✅</div>
                  <h3 className="value-title">Quality Guaranteed</h3>
                  <p className="value-text">
                    We stand behind every service with our quality guarantee and satisfaction promise.
                  </p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🔬</div>
                  <h3 className="value-title">Innovation Driven</h3>
                  <p className="value-text">
                    We continuously improve our technology to make booking and managing home services effortless.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <div className="section-container">
              <h2 className="section-title-main">Meet Our Team</h2>
              <p className="team-subtitle">
                The passionate individuals behind HomeServe, dedicated to revolutionizing home care.
              </p>
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-image">
                    <img src="/welcome.jpg" alt="Team Member" />
                  </div>
                  <h3 className="team-name">USL Challivary</h3>
                  <p className="team-id">2300031193</p>
                  <p className="team-role">CEO & Founder</p>
                  <p className="team-specialty">Platform Architecture</p>
                </div>
                <div className="team-card">
                  <div className="team-image">
                    <img src="/welcome.jpg" alt="Team Member" />
                  </div>
                  <h3 className="team-name">G Gnanesh</h3>
                  <p className="team-id">2300031699</p>
                  <p className="team-role">Head of Operations</p>
                  <p className="team-specialty">Service Management</p>
                </div>
                <div className="team-card">
                  <div className="team-image">
                    <img src="/welcome.jpg" alt="Team Member" />
                  </div>
                  <h3 className="team-name">C Chetan Siva</h3>
                  <p className="team-id">2300031840</p>
                  <p className="team-role">CTO</p>
                  <p className="team-specialty">Technology Innovation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Mission Section */}
          <div className="mission-section">
            <div className="section-container">
              <h2 className="mission-title">Join Our Mission</h2>
              <div className="mission-cards">
                <div className="mission-card">
                  <h3 className="mission-card-title">For Homeowners</h3>
                  <p className="mission-card-text">
                    Get superior service and enjoy hassle-free home maintenance with complete peace of mind.
                  </p>
                </div>
                <div className="mission-card">
                  <h3 className="mission-card-title">For Professionals</h3>
                  <p className="mission-card-text">
                    Grow your business with our platform while we handle all the complicated parts.
                  </p>
                </div>
                <div className="mission-card">
                  <h3 className="mission-card-title">For Communities</h3>
                  <p className="mission-card-text">
                    We're building stronger communities through better home care services.
                  </p>
                </div>
              </div>
              <button className="cta-button mission-cta">Start Your Journey Today</button>
            </div>
          </div>
        </section>
      )}

      {/* Service Detail Modal */}
      {showDetailModal && selectedService && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="modal-body">
              {/* Left Section - Service Info */}
              <div className="modal-left">
                <div className="modal-header-section">
                  <div className="modal-image-wrapper">
                    <img src={selectedService.image} alt={selectedService.title} className="modal-service-image" />
                    <span className={`modal-badge badge-${selectedService.badgeColor}`}>
                      {selectedService.badge}
                    </span>
                  </div>
                  
                  <div className="modal-title-section">
                    <span className="modal-category-tag">{selectedService.category}</span>
                    <h2 className="modal-service-title">{selectedService.title}</h2>
                    <div className="modal-rating-row">
                      <span className="star">⭐</span>
                      <span className="modal-rating">{selectedService.rating}</span>
                      <span className="modal-reviews">({selectedService.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">About this service</h3>
                  <p className="modal-description">{selectedService.description}</p>
                  <p className="modal-additional-text">
                    Certified professionals for {selectedService.title.toLowerCase()}. We handle all types of requirements 
                    and scheduled maintenance with professional tools and licensed technicians.
                  </p>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">What's included</h3>
                  <ul className="modal-features-list">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="modal-feature-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7 10l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">Available Providers</h3>
                  <div className="modal-provider-card">
                    <div className="provider-avatar">
                      <img src="/welcome.jpg" alt="Provider" />
                    </div>
                    <div className="provider-info">
                      <h4 className="provider-name">Professional Team</h4>
                      <p className="provider-specialty">{selectedService.title}</p>
                      <div className="provider-rating">
                        <span className="star">⭐</span>
                        <span>{selectedService.rating}</span>
                        <span className="provider-reviews">({selectedService.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Booking */}
              <div className="modal-right">
                <div className="modal-booking-card">
                  <div className="booking-price-section">
                    <span className="booking-price-label">Starting from</span>
                    <h2 className="booking-price">{selectedService.price}</h2>
                  </div>

                  <div className="booking-form">
                    <h3 className="booking-title">Book this service</h3>
                    <p className="booking-subtitle">
                      Start with just a few details. Our team will confirm availability and send professional providers.
                    </p>

                    <div className="booking-features">
                      <div className="booking-feature">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4CAF50" strokeWidth="2"/>
                        </svg>
                        <span>Licensed professionals</span>
                      </div>
                      <div className="booking-feature">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4CAF50" strokeWidth="2"/>
                        </svg>
                        <span>Insured professionals</span>
                      </div>
                      <div className="booking-feature">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4CAF50" strokeWidth="2"/>
                        </svg>
                        <span>Rated providers</span>
                      </div>
                    </div>

                    <button className="btn-book-now-modal" onClick={() => handleBookNow(selectedService)}>Book Now</button>
                  </div>

                  <div className="modal-questions">
                    <h4 className="questions-title">Questions?</h4>
                    <p className="questions-text">
                      Not sure if this service is right for you? We can help clarify details and recommendations.
                    </p>
                    <button className="btn-contact-modal">Contact us →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="booking-modal-overlay" onClick={handleCloseBookingModal}>
          <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="booking-modal-close-btn" onClick={handleCloseBookingModal}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="booking-modal-header">
              <h2 className="booking-modal-title">Book {selectedService.title}</h2>
              <p className="booking-modal-subtitle">Fill in the details below to schedule your service</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form-content">
              <div className="booking-form-grid">
                {/* Personal Information Section */}
                <div className="booking-section">
                  <h3 className="booking-section-title">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" fill="#4CAF50"/>
                    </svg>
                    Personal Information
                  </h3>
                  <div className="booking-form-row">
                    <div className="booking-input-group">
                      <label className="booking-label">Full Name *</label>
                      <input
                        type="text"
                        className="booking-input"
                        placeholder="Enter your full name"
                        value={bookingData.fullName}
                        onChange={(e) => handleBookingInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-form-row">
                    <div className="booking-input-group">
                      <label className="booking-label">Email Address *</label>
                      <input
                        type="email"
                        className="booking-input"
                        placeholder="your.email@example.com"
                        value={bookingData.email}
                        onChange={(e) => handleBookingInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-input-group">
                      <label className="booking-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="booking-input"
                        placeholder="(123) 456-7890"
                        value={bookingData.phone}
                        onChange={(e) => handleBookingInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Service Location Section */}
                <div className="booking-section">
                  <h3 className="booking-section-title">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="#4CAF50"/>
                    </svg>
                    Service Location
                  </h3>
                  <div className="booking-form-row">
                    <div className="booking-input-group full-width">
                      <label className="booking-label">Street Address *</label>
                      <input
                        type="text"
                        className="booking-input"
                        placeholder="123 Main Street, Apt 4B"
                        value={bookingData.address}
                        onChange={(e) => handleBookingInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-form-row">
                    <div className="booking-input-group">
                      <label className="booking-label">City *</label>
                      <input
                        type="text"
                        className="booking-input"
                        placeholder="Enter city"
                        value={bookingData.city}
                        onChange={(e) => handleBookingInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-input-group">
                      <label className="booking-label">ZIP Code *</label>
                      <input
                        type="text"
                        className="booking-input"
                        placeholder="12345"
                        value={bookingData.zipCode}
                        onChange={(e) => handleBookingInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule Section */}
                <div className="booking-section">
                  <h3 className="booking-section-title">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 2v2M14 2v2M3 8h14M5 4h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#4CAF50" strokeWidth="2" fill="none"/>
                    </svg>
                    Schedule Service
                  </h3>
                  <div className="booking-form-row">
                    <div className="booking-input-group">
                      <label className="booking-label">Preferred Date *</label>
                      <input
                        type="date"
                        className="booking-input"
                        value={bookingData.serviceDate}
                        onChange={(e) => handleBookingInputChange('serviceDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="booking-input-group">
                      <label className="booking-label">Preferred Time *</label>
                      <select
                        className="booking-input"
                        value={bookingData.serviceTime}
                        onChange={(e) => handleBookingInputChange('serviceTime', e.target.value)}
                        required
                      >
                        <option value="">Select time</option>
                        <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                        <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Service Details Section */}
                <div className="booking-section full-width">
                  <h3 className="booking-section-title">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" fill="#4CAF50"/>
                    </svg>
                    Service Details
                  </h3>
                  
                  <div className="booking-input-group full-width">
                    <label className="booking-label">Describe your service needs *</label>
                    <textarea
                      className="booking-textarea"
                      placeholder="Please provide details about the service you need, any specific requirements, or issues you're facing..."
                      rows="4"
                      value={bookingData.description}
                      onChange={(e) => handleBookingInputChange('description', e.target.value)}
                      required
                    />
                  </div>

                  <div className="booking-input-group full-width">
                    <label className="booking-label">Urgency Level *</label>
                    <div className="urgency-options">
                      <label className={`urgency-option ${bookingData.urgency === 'low' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="urgency"
                          value="low"
                          checked={bookingData.urgency === 'low'}
                          onChange={(e) => handleBookingInputChange('urgency', e.target.value)}
                        />
                        <div className="urgency-content">
                          <span className="urgency-icon">📅</span>
                          <span className="urgency-text">Low - Within a week</span>
                        </div>
                      </label>
                      
                      <label className={`urgency-option ${bookingData.urgency === 'normal' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="urgency"
                          value="normal"
                          checked={bookingData.urgency === 'normal'}
                          onChange={(e) => handleBookingInputChange('urgency', e.target.value)}
                        />
                        <div className="urgency-content">
                          <span className="urgency-icon">⏰</span>
                          <span className="urgency-text">Normal - Within 2-3 days</span>
                        </div>
                      </label>
                      
                      <label className={`urgency-option ${bookingData.urgency === 'high' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="urgency"
                          value="high"
                          checked={bookingData.urgency === 'high'}
                          onChange={(e) => handleBookingInputChange('urgency', e.target.value)}
                        />
                        <div className="urgency-content">
                          <span className="urgency-icon">🚨</span>
                          <span className="urgency-text">High - Urgent/Same day</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Service Summary */}
                <div className="booking-summary">
                  <h3 className="booking-summary-title">Booking Summary</h3>
                  <div className="booking-summary-item">
                    <span className="summary-label">Service:</span>
                    <span className="summary-value">{selectedService.title}</span>
                  </div>
                  <div className="booking-summary-item">
                    <span className="summary-label">Category:</span>
                    <span className="summary-value">{selectedService.category}</span>
                  </div>
                  <div className="booking-summary-item">
                    <span className="summary-label">Starting Price:</span>
                    <span className="summary-value price">{selectedService.price}</span>
                  </div>
                  <div className="booking-summary-note">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" fill="#4CAF50"/>
                    </svg>
                    Final price will be confirmed by the service provider based on your specific requirements.
                  </div>
                </div>
              </div>

              <div className="booking-form-actions">
                <button type="button" className="btn-booking-cancel" onClick={handleCloseBookingModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-booking-submit">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showBookingDetailsModal && selectedBooking && (
        <div className="booking-details-overlay" onClick={handleCloseBookingDetailsModal}>
          <div className="booking-details-content" onClick={(e) => e.stopPropagation()}>
            <button className="booking-details-close-btn" onClick={handleCloseBookingDetailsModal}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="booking-details-header">
              <div className="booking-details-title-section">
                <h2 className="booking-details-title">Booking Details</h2>
                <span className={`booking-status-large status-${selectedBooking.status.toLowerCase()}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="booking-details-body">
              {/* Service Information */}
              <div className="details-section">
                <h3 className="details-section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a6 6 0 00-6 6v1H3a1 1 0 00-1 1v7a2 2 0 002 2h12a2 2 0 002-2v-7a1 1 0 00-1-1h-1V8a6 6 0 00-6-6z" fill="#4CAF50"/>
                  </svg>
                  Service Information
                </h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Service Name</span>
                    <span className="detail-value">{selectedBooking.service.title}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">{selectedBooking.service.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Starting Price</span>
                    <span className="detail-value price-highlight">{selectedBooking.service.price}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Rating</span>
                    <span className="detail-value">⭐ {selectedBooking.service.rating} ({selectedBooking.service.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="details-section">
                <h3 className="details-section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" fill="#4CAF50"/>
                  </svg>
                  Customer Information
                </h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Full Name</span>
                    <span className="detail-value">{selectedBooking.bookingDetails.fullName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{selectedBooking.bookingDetails.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone Number</span>
                    <span className="detail-value">{selectedBooking.bookingDetails.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Booking Date</span>
                    <span className="detail-value">{selectedBooking.bookingDate}</span>
                  </div>
                </div>
              </div>

              {/* Service Location */}
              <div className="details-section">
                <h3 className="details-section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="#4CAF50"/>
                  </svg>
                  Service Location
                </h3>
                <div className="details-grid">
                  <div className="detail-item full-width">
                    <span className="detail-label">Street Address</span>
                    <span className="detail-value">{selectedBooking.bookingDetails.address}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">City</span>
                    <span className="detail-value">{selectedBooking.bookingDetails.city}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ZIP Code</span>
                    <span className="detail-value">{selectedBooking.bookingDetails.zipCode}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="details-section">
                <h3 className="details-section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 2v2M14 2v2M3 8h14M5 4h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#4CAF50" strokeWidth="2" fill="none"/>
                  </svg>
                  Schedule
                </h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Service Date</span>
                    <span className="detail-value">{selectedBooking.scheduledDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Service Time</span>
                    <span className="detail-value">{selectedBooking.scheduledTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Urgency Level</span>
                    <span className={`urgency-badge-large ${selectedBooking.bookingDetails.urgency}`}>
                      {selectedBooking.bookingDetails.urgency === 'low' && '📅 '}
                      {selectedBooking.bookingDetails.urgency === 'normal' && '⏰ '}
                      {selectedBooking.bookingDetails.urgency === 'high' && '🚨 '}
                      {selectedBooking.bookingDetails.urgency.charAt(0).toUpperCase() + selectedBooking.bookingDetails.urgency.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Description */}
              <div className="details-section full-width">
                <h3 className="details-section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" fill="#4CAF50"/>
                  </svg>
                  Service Description
                </h3>
                <div className="description-box">
                  {selectedBooking.bookingDetails.description}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="booking-details-actions">
                <button className="btn-view-service" onClick={() => {
                  handleCloseBookingDetailsModal();
                  handleViewDetails(selectedBooking.service);
                }}>
                  View Service Details
                </button>
                <button className="btn-cancel-booking" onClick={() => handleCancelBooking(selectedBooking.id)}>
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="modal-overlay" onClick={() => setShowEditUserModal(false)}>
          <div className="modal-content premium-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header gradient-header">
              <div className="header-content">
                <h2>Edit User Profile</h2>
                <p className="modal-subtitle">Update user information and settings</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowEditUserModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body premium-form">
              {/* Personal Information Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" fill="currentColor"/>
                  </svg>
                  Personal Information
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">👤</span>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="premium-input"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">📧</span>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="premium-input"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Account Settings Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" fill="currentColor"/>
                    <path d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" fill="currentColor"/>
                  </svg>
                  Account Settings
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🔑</span>
                      User Role
                    </label>
                    <select 
                      className="premium-input"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">📅</span>
                      Join Date
                    </label>
                    <input 
                      type="date" 
                      className="premium-input"
                      value={editingUser.joinDate}
                      onChange={(e) => setEditingUser({...editingUser, joinDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowEditUserModal(false)}>
                  Cancel
                </button>
                <button className="btn-save gradient-btn" onClick={handleSaveUser}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay" onClick={() => setShowAddUserModal(false)}>
          <div className="modal-content premium-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header gradient-header">
              <div className="header-content">
                <h2>Add New User</h2>
                <p className="modal-subtitle">Create a new user account</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddUserModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body premium-form">
              {/* Basic Information Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" fill="currentColor"/>
                  </svg>
                  Basic Information
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required">
                      <span className="label-icon">👤</span>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="premium-input"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      placeholder="Enter user's full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label required">
                      <span className="label-icon">📧</span>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="premium-input"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Account Settings Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" fill="currentColor"/>
                    <path d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" fill="currentColor"/>
                  </svg>
                  Account Settings
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🔑</span>
                      User Role
                    </label>
                    <select 
                      className="premium-input"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">📅</span>
                      Join Date
                    </label>
                    <input 
                      type="date" 
                      className="premium-input"
                      value={newUser.joinDate}
                      onChange={(e) => setNewUser({...newUser, joinDate: e.target.value})}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="modal-info-box">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" fill="#3498db"/>
                </svg>
                <p>The new user will receive an email with their login credentials.</p>
              </div>
              
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowAddUserModal(false)}>
                  Cancel
                </button>
                <button 
                  className="btn-save gradient-btn" 
                  onClick={handleAddUser}
                  disabled={!newUser.name || !newUser.email}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditServiceModal && editingService && (
        <div className="modal-overlay" onClick={() => setShowEditServiceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Service</h2>
              <p className="modal-subtitle">Update service details</p>
              <button className="close-modal" onClick={() => setShowEditServiceModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {/* Basic Information */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" fill="currentColor"/>
                  </svg>
                  Basic Information
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Service Title</label>
                    <input 
                      type="text" 
                      value={editingService.title}
                      onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                      placeholder="Enter service title"
                    />
                  </div>
                  <div className="form-group">
                    <label className="required">Category</label>
                    <select 
                      value={editingService.category}
                      onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                    >
                      <option value="Repair">Repair</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Installation">Installation</option>
                      <option value="Renovation">Renovation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-3H9V7h2v4z" fill="currentColor"/>
                  </svg>
                  Service Details
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Price Range</label>
                    <input 
                      type="text" 
                      value={editingService.price}
                      onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                      placeholder="e.g., $50 - $200"
                    />
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="5"
                      value={editingService.rating}
                      onChange={(e) => setEditingService({...editingService, rating: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Reviews Count</label>
                    <input 
                      type="number" 
                      value={editingService.reviews}
                      onChange={(e) => setEditingService({...editingService, reviews: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      value={editingService.description}
                      onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                      placeholder="Enter service description"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              {/* Badge Settings */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor"/>
                  </svg>
                  Badge Settings
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Badge Text</label>
                    <select
                      value={editingService.badge}
                      onChange={(e) => setEditingService({...editingService, badge: e.target.value})}
                    >
                      <option value="Popular">Popular</option>
                      <option value="New">New</option>
                      <option value="Trending">Trending</option>
                      <option value="Top Rated">Top Rated</option>
                      <option value="Best Value">Best Value</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Badge Color</label>
                    <select 
                      className="color-select"
                      value={editingService.badgeColor}
                      onChange={(e) => setEditingService({...editingService, badgeColor: e.target.value})}
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="yellow">Yellow</option>
                    </select>
                    <div className={`badge-preview badge-${editingService.badgeColor}`}>
                      {editingService.badge}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowEditServiceModal(false)}>Cancel</button>
                <button className="btn-save" onClick={handleSaveService}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="modal-overlay" onClick={() => setShowAddServiceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Service</h2>
              <p className="modal-subtitle">Create a new service offering</p>
              <button className="close-modal" onClick={() => setShowAddServiceModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {/* Basic Information Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" fill="currentColor"/>
                  </svg>
                  Basic Information
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Service Title</label>
                    <input 
                      type="text" 
                      value={newService.title}
                      onChange={(e) => setNewService({...newService, title: e.target.value})}
                      placeholder="Enter service title"
                    />
                    <p className="help-text">Choose a clear, descriptive name for your service</p>
                  </div>
                  <div className="form-group">
                    <label className="required">Category</label>
                    <select 
                      value={newService.category}
                      onChange={(e) => setNewService({...newService, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option value="Repair">Repair</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Installation">Installation</option>
                      <option value="Renovation">Renovation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing and Description */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-3H9V7h2v4z" fill="currentColor"/>
                  </svg>
                  Service Details
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Price Range</label>
                    <input 
                      type="text" 
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                      placeholder="e.g., $50 - $200"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      placeholder="Enter service description"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              {/* Badge Settings */}
              <div className="form-section">
                <h3 className="section-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor"/>
                  </svg>
                  Badge Settings
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Badge Text</label>
                    <select
                      value={newService.badge}
                      onChange={(e) => setNewService({...newService, badge: e.target.value})}
                    >
                      <option value="New">New</option>
                      <option value="Popular">Popular</option>
                      <option value="Featured">Featured</option>
                      <option value="Top Rated">Top Rated</option>
                      <option value="Best Value">Best Value</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Badge Color</label>
                    <select 
                      className="color-select"
                      value={newService.badgeColor}
                      onChange={(e) => setNewService({...newService, badgeColor: e.target.value})}
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="yellow">Yellow</option>
                    </select>
                    <div className={`badge-preview badge-${newService.badgeColor}`}>
                      {newService.badge}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowAddServiceModal(false)}>
                  Cancel
                </button>
                <button 
                  className="btn-save" 
                  onClick={handleAddService}
                  disabled={!newService.title || !newService.category || !newService.price}
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Shown on all pages */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-column">
              <h3 className="footer-brand">HomeServe</h3>
              <p className="footer-tagline">
                Connecting homeowners with trusted professionals for all your home needs.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📸</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={() => handleNavigation('service')}>Find Services</a></li>
                <li><a href="#" onClick={() => handleNavigation('service')}>Book Now</a></li>
                <li><a href="#" onClick={() => handleNavigation('bookings')}>Track Bookings</a></li>
                <li><a href="#" onClick={() => handleNavigation('bookings')}>My Bookings</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={() => handleNavigation('about')}>About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Customer Support</a></li>
                <li><a href="#">Safety Info</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="footer-stat-number">50K+</span>
                <span className="footer-stat-label">Services Completed</span>
              </div>
              <div className="footer-stat">
                <span className="footer-stat-number">15K+</span>
                <span className="footer-stat-label">Happy Customers</span>
              </div>
              <div className="footer-stat">
                <span className="footer-stat-number">850+</span>
                <span className="footer-stat-label">Verified Professionals</span>
              </div>
              <div className="footer-stat">
                <span className="footer-stat-number">99%</span>
                <span className="footer-stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            <p>© 2025 HomeServe. All rights reserved. Made with ❤️ by KLU Team.</p>
            <div className="footer-legal">
              <a href="#">Terms of Service</a>
              <span>•</span>
              <a href="#">Privacy Policy</a>
              <span>•</span>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
