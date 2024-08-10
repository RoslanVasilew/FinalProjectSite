import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar.jsx';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../css/Stats.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { SITE_URL } from '/src/main.jsx';

function Stats() {
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false); // State to track the expanded accordion

  const handleCheck = async (url, successMessage) => {
    setLoading(true);
    try {
      const response = await axios.get(SITE_URL + url);
      const totalAmountKG = response.data.totalAmountKG.toLocaleString(); // Format number with commas
      Swal.fire({
        title: 'תוצאות',
        text: successMessage(totalAmountKG),
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'שגיאה',
        text: 'אירעה שגיאה בעת שליפת הנתונים.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '80px' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          מידע על תרומות
        </Typography>

        <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')} style={{ marginTop: '20px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>כמות שנתית של מזון מסוים</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheck(
                `/api/donations/totalAmountByDescAndYear?description=${description}&year=${year}`,
                (totalAmountKG) => `בשנת ${year} התקבל ${totalAmountKG} ק"ג של ${description}`
              )}
              disabled={loading}
            >
              בדוק
            </Button>
            {loading && <CircularProgress size={24} style={{ marginLeft: '10px' }} />}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')} style={{ marginTop: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>כמות שנתית לפי אזור</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheck(
                `/api/donations/totalAmountByDistrictAndYear?district=${district}&year=${year}`,
                (totalAmountKG) => `בשנת ${year} התקבל ${totalAmountKG} ק"ג של מזון מאזור ה${district}`
              )}
              disabled={loading}
            >
              בדוק
            </Button>
            {loading && <CircularProgress size={24} style={{ marginLeft: '10px' }} />}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')} style={{ marginTop: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>כמות שנתית לפי עיר</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheck(
                `/api/donations/totalAmountByCityAndYear?city=${city}&year=${year}`,
                (totalAmountKG) => `בשנת ${year} התקבל ${totalAmountKG} ק"ג של מזון מהעיר ${city}`
              )}
              disabled={loading}
            >
              בדוק
            </Button>
            {loading && <CircularProgress size={24} style={{ marginLeft: '10px' }} />}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleAccordionChange('panel4')} style={{ marginTop: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>כמות שנתית של מזון לפי אזור</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheck(
                `/api/donations/totalAmountByFoodDistrictAndYear?description=${description}&district=${district}&year=${year}`,
                (totalAmountKG) => `בשנת ${year} התקבל ${totalAmountKG} ק"ג של ${description} מאזור ה${district}`
              )}
              disabled={loading}
            >
              בדוק
            </Button>
            {loading && <CircularProgress size={24} style={{ marginLeft: '10px' }} />}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel5'} onChange={handleAccordionChange('panel5')} style={{ marginTop: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography>כמות שנתית של מזון לפי עיר</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheck(
                `/api/donations/totalAmountByFoodCityAndYear?description=${description}&city=${city}&year=${year}`,
                (totalAmountKG) => `בשנת ${year} התקבל ${totalAmountKG} ק"ג של ${description} מהעיר ${city}`
              )}
              disabled={loading}
            >
              בדוק
            </Button>
            {loading && <CircularProgress size={24} style={{ marginLeft: '10px' }} />}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel6'} onChange={handleAccordionChange('panel6')} style={{ marginTop: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography>כמות שנתית של מזון</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCheck(
                `/api/donations/totalAmountByYear?year=${year}`,
                (totalAmountKG) => `בשנת ${year} התקבל ${totalAmountKG} ק"ג של מזון`
              )}
              disabled={loading}
            >
              בדוק
            </Button>
            {loading && <CircularProgress size={24} style={{ marginLeft: '10px' }} />}
          </AccordionDetails>
        </Accordion>

      </Container>
    </>
  );
}

export default Stats;
