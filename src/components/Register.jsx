import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { SITE_URL } from '/src/main.jsx'; // Ensure SITE_URL is defined and exported properly
import Swal from 'sweetalert2';
import fruitImage from '/src/assets/fruit.png'; // Ensure the path to the image is correct

function Register({ isOpen, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [type, setType] = useState(1); // Default to 1, adjust as necessary
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Regex patterns for validation
    const usernamePattern = /.{5,}/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const namePattern = /^[a-zA-Zא-ת]{2,}$/;
    const phonePattern = /^\d{10}$/;

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Clear any previous errors
        setSuccess(null); // Clear any previous success messages

        // Input validation
        if (!usernamePattern.test(username)) {
            setError('Username must be 5 characters or more.');
            return;
        }
        if (!passwordPattern.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }
        if (!namePattern.test(firstName)) {
            setError('First name must contain at least 2 characters and no numbers or symbols.');
            return;
        }
        if (!namePattern.test(lastName)) {
            setError('Last name must contain at least 2 characters and no numbers or symbols.');
            return;
        }
        if (!phonePattern.test(phoneNum)) {
            setError('Phone number must contain 10 numbers!');
            return;
        }

        try {
            const response = await axios.post(`${SITE_URL}/api/users/add`, {
                userName: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNum: phoneNum,
                type: type // User type from select box
            });

            if (response.data && response.data.message === "User added successfully.") {
                Swal.fire({
                    icon: "success",
                    title: "ההרשמה הצליחה!",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Clear the form fields
                setUsername('');
                setPassword('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPhoneNum('');
                setType(1); // Reset to default type
                // Optionally, close the modal or perform other actions
                onClose(); // Close the modal
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ההרשמה לא הצליחה!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle style={{ marginBottom: 0 }}>הרשמה</DialogTitle>
            <DialogContent style={{ display: 'flex', padding: 0, margin: 0 }}>
                {/* Form Section */}
                <div style={{ flex: '70%', padding: '15px' }}>
                    <form onSubmit={handleRegisterSubmit}>
                        <TextField
                            label="שם משתמש"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            size="small"
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
                            size="small"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="דואר אלקטרוני"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            size="small"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="שם פרטי"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            size="small"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="שם משפחה"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            size="small"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            label="מספר טלפון"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            size="small"
                            required
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                        />
                        <TextField
                            select
                            label="סוג משתמש"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            size="small"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value={0}>חקלאי</option>
                            <option value={1}>רכז</option>
                        </TextField>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <DialogActions>
                            <Button onClick={onClose} color="secondary">
                                בטל
                            </Button>
                            <Button type="submit" color="primary">
                                הירשם
                            </Button>
                        </DialogActions>
                    </form>
                </div>
                {/* Image Section */}
                <div style={{
                    flex: '30%',
                    backgroundImage: `url(${fruitImage})`,
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

export default Register;
