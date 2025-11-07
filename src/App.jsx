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

  const handleLoginSuccess = (role = 'user', name = 'Gnanesh', email = 'gnanesh@gmail.com') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
    setUserName('');
    setUserEmail('');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Home userName={userName} userEmail={userEmail} userRole={userRole} onLogout={handleLogout} />
      ) : (
        <Welcome onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
