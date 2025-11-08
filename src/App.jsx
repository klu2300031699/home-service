import './App.css'
import './components/Modal.css'
import './components/Admin.css'
import { useState } from 'react'
import Welcome from './components/Welcome'
import Home from './components/Home'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (id = null, role = 'user', name = 'Gnanesh', email = 'gnanesh@gmail.com') => {
    console.log('Login success:', { id, role, name, email });
    setIsLoggedIn(true);
    setUserId(id);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
    setUserName('');
    setUserEmail('');
    setUserId(null);
  };

  console.log('App render:', { isLoggedIn, userName, userRole, userId });

  return (
    <div className="App">
      {isLoggedIn ? (
        <Home userId={userId} userName={userName} userEmail={userEmail} userRole={userRole} onLogout={handleLogout} />
      ) : (
        <Welcome onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
