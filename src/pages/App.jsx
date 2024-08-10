import React from 'react';
import NavBar from '/src/components/navbar.jsx';
import { Container } from '@mui/material';
import '/src/css/App.css';
import PageHeader from '/src/components/page-header';
import Cards from '/src/components/Card.jsx'; 



function App() {
  return (
    <>
      <NavBar />
      <PageHeader />
      <Cards/>
    </>
  );
}

export default App;
