import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/src/assets/LeketLemaanIsrael-17.svg';
import Login from '/src/components/Login';
import Register from '/src/components/Register';
import Donations from '/src/components/Donations';
import Swal from 'sweetalert2';

function NavBar() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDonationsOpen, setIsDonationsOpen] = useState(false); // State for Donations modal
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Check if user data exists in session storage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      icon: 'success',
      title: 'התנתקת בהצלחה!',
      showConfirmButton: false,
      timer: 1500
    });
    // Remove user data from session storage
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Redirect to the home page
  };

  const renderDonationsButton = () => {
    if (!user) return null;

    switch (user.type) {
      case 0:
        return (
          <Button color="inherit" onClick={() => setIsDonationsOpen(true)}>
            תרומה
          </Button>
        );
      case 1:
        return (
          <Button color="inherit" onClick={() => setIsDonationsOpen(true)}>
            ניבויים
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <AppBar position="fixed" style={{ background: 'linear-gradient(to right, #689F38, #8BC34A)' }}>
        <Toolbar>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logo} alt="Logo" style={{ height: 50, marginRight: 20 }} />
          </Link>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', marginRight: 10}}>
            <Button color="inherit">בית</Button>
          </Link>
          <Link to="/stats" style={{ color: 'inherit', textDecoration: 'none', marginRight: 10 }}>
            <Button color="inherit">מידע כללי</Button>
          </Link>
          {renderDonationsButton()}
          {user && user.type === 2 && (
            <Link to="/Admin" style={{ color: 'inherit', textDecoration: 'none', marginRight: 10 }}>
              <Button color="inherit">לוח אדמינים</Button>
            </Link>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
                style={{ marginRight: 10 }}
                sx={{ textTransform: 'none' }} // Override the default text-transform style
              >
                {user.firstName}
              </Button>
              <Button color="inherit" onClick={handleLogout} style={{ marginRight: 10 }}>
                התנתק
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => setIsLoginOpen(true)} style={{ marginRight: 10 }}>
                התחבר
              </Button>
              <Button color="inherit" onClick={() => setIsRegisterOpen(true)}>
                הירשם
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={(user) => setUser(user)} />

      {/* Register Dialog */}
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      {/* Donations Dialog */}
      <Donations isOpen={isDonationsOpen} onClose={() => setIsDonationsOpen(false)} user={user} />
    </div>
  );
}

export default NavBar;
