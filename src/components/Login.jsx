import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { SITE_URL } from '/src/main.jsx';
import Swal from 'sweetalert2';
import vegImage from '/src/assets/veg.png'; // Ensure the path to the image is correct

function Login({ isOpen, onClose, onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Clear any previous errors

        try {
            const response = await axios.post(`${SITE_URL}/api/Users/check`, {
                userName: username,
                password: password
            });

            if (response.data) {
                Swal.fire({
                    icon: "success",
                    title: "התחברת בהצלחה!",
                    showConfirmButton: false,
                    timer: 1500
                });
                sessionStorage.setItem('user', JSON.stringify(response.data));
                onLoginSuccess(response.data); // Notify the parent component of the successful login
                onClose(); // Close the modal
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "ההתחברות נכשלה!",
                showConfirmButton: false,
                timer: 1500
            });
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent style={{ display: 'flex', padding: 0 }}>
                {/* Form Section */}
                <div style={{ flex: '70%', padding: '20px' }}>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            label="שם משתמש"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="סיסמה"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <DialogActions>
                            <Button onClick={onClose} color="secondary">
                                בטל
                            </Button>
                            <Button type="submit" color="primary">
                                התחבר
                            </Button>
                        </DialogActions>
                    </form>
                </div>
                {/* Image Section */}
                <div style={{
                    flex: '30%',
                    backgroundImage: `url(${vegImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 'auto'
                }}>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Login;
