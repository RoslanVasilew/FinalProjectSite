import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { SITE_URL } from '/src/main.jsx';
import Swal from 'sweetalert2';


function EditUser({ isOpen, onClose, user }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPhoneNum(user.phoneNum);
            setType(user.type);
        }
    }, [user]);

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${SITE_URL}/api/users/update`, {
                ID: user.id,
                Password: password,
                Type: type,
                FirstName: firstName,
                LastName: lastName,
                PhoneNum: phoneNum,
                Email: email,
            });

            if (response.data && response.data.message === "User details updated successfully.") {
                Swal.fire({
                    icon: "success",
                    title: "המשתמש נערך בהצלחה!",
                    showConfirmButton: false,
                    timer: 1500
                });
                onClose(); // Close the modal and refresh the list
            } else {
                Swal.fire({
                    icon: "error",
                    title: "העריכה נכשלה!",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: 'swal-popup',
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "העריכה נכשלה!",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal-popup',
                }
            });
            console.error('Error updating user:', error.message);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} sx={{ zIndex: 1 }}>
            <DialogTitle>ערוך משתמש בשם {user && (
                        <span>{user.userName}</span>
                )}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleEditSubmit}>
                    <TextField
                        label="סיסמה"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="אימייל"
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
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">
                            ביטול
                        </Button>
                        <Button type="submit" color="primary">
                            שמור
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditUser;
