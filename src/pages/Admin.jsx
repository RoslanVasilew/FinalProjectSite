import React from 'react';
import NavBar from '../components/navbar.jsx';
import { Container, Typography } from '@mui/material';
import '../css/Admin.css';
import AdminPanel from '../components/AdminPanel';

function Admin() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '80px' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          טבלת משתמשים
        </Typography>
        <AdminPanel />
      </Container>
    </>
  );
}

export default Admin;
