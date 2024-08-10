import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { SITE_URL } from '/src/main.jsx';
import Swal from 'sweetalert2';
import EditUser from '/src/components/EditUser';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get(`${SITE_URL}/api/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "לא תוכל להחזיר את המשתמש לאחר המחיקה!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      cancelButtonText: "בטל",
      confirmButtonText: 'כן, תמחק!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${SITE_URL}/api/users/${id}`)
          .then(response => {
            setUsers(users.filter(user => user.id !== id));
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            );
          })
          .catch(error => console.error('Error deleting user:', error));
      }
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
    axios.get(`${SITE_URL}/api/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 2: return 'אדמין';
      case 1: return 'רכז';
      case 0: return 'חקלאי';
      default: return 'באג?????';
    }
  };

  const partialBorderStyle = {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '40%',
      right: '0',
      height: '25%',  // Adjust this value to change the length of the border
      borderRight: '1px solid #ddd',
    }
  };

  const rowStyle = {
    height: '28px', // Adjust this value to make the row height half of its default height
  };

  return (
    <>
      <TableContainer component={Paper} style={{ width: '70vw', height: '70vh', marginTop: 30, marginLeft: 'auto', marginRight: 'auto', borderRadius:"10px", border:"1px solid lightgrey"}}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fff' }}>
              <TableCell sx={partialBorderStyle} align="center">מספר מזהה</TableCell>
              <TableCell sx={partialBorderStyle} align="center">שם משתמש</TableCell>
              <TableCell sx={partialBorderStyle} align="center">שם פרטי</TableCell>
              <TableCell sx={partialBorderStyle} align="center">שם משפחה</TableCell>
              <TableCell sx={partialBorderStyle} align="center">אימייל</TableCell>
              <TableCell sx={partialBorderStyle} align="center">מספר טלפון</TableCell>
              <TableCell sx={partialBorderStyle} align="center">סוג משתמש</TableCell>
              <TableCell sx={partialBorderStyle} align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={rowStyle}>
                <TableCell sx={partialBorderStyle} align="center">{user.id}</TableCell>
                <TableCell sx={partialBorderStyle} align="center">{user.userName}</TableCell>
                <TableCell sx={partialBorderStyle} align="center">{user.firstName}</TableCell>
                <TableCell sx={partialBorderStyle} align="center">{user.lastName}</TableCell>
                <TableCell sx={partialBorderStyle} align="center">{user.email}</TableCell>
                <TableCell sx={partialBorderStyle} align="center">{user.phoneNum}</TableCell>
                <TableCell sx={partialBorderStyle} align="center">{getTypeLabel(user.type)}</TableCell>
                <TableCell sx={partialBorderStyle} align="center">
                  <IconButton color="primary" onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      <EditUser
        isOpen={isEditOpen}
        onClose={handleEditClose}
        user={selectedUser}
      />
    </>
  );
};

export default AdminPanel;
