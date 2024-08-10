import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Swal from 'sweetalert2';
import axios from 'axios';
import { SITE_URL } from '../main';
import dayjs from 'dayjs';

const seasons = {
  'Summer': 'קיץ',
  'winter': 'חורף',
  'Fall': 'סתיו',
  'Spring': 'אביב'
};


const regions = {
  'North': 'מרכז',
  'HaSharon': 'שרון',
  'Center': 'מרכז',
  'South': 'דרום'
};

const uniqueDescValuesDict = {
  'Peppers': 'פלפלים',
  'Grapefruits': 'אשכוליות',
  'Carrots': 'גזרים',
  'Cabbage': 'כרוב',
  'Tomatoes': 'עגבניות',
  'Kohlrabi': 'קולורבי',
  'Hot Peppers': 'פלפלים חריפים',
  'Eggplants': 'חצילים',
  'Cauliflower': 'כרובית',
  'Pomelo': 'פומלה',
  'Oranges': 'תפוזים',
  'Clementines': 'קלמנטינות',
  'Strawberries': 'תותים',
  'Lettuce': 'חסה',
  'Fennel': 'שומר',
  'Green Onions': 'בצל ירוק',
  'Cucumbers': 'מלפפונים',
  'Corn': 'תירס',
  'Celery': 'סלרי',
  'Artichokes': 'ארטישוקים',
  'Onions': 'בצל',
  'Nectarines': 'נקטרינות',
  'Peaches': 'אפרסקים',
  'Beets': 'סלק',
  'Radishes': 'צנוניות',
  'Cherry Tomatoes': 'עגבניות שרי',
  'Apples': 'תפוחים',
  'Leek': 'כרישה',
  'Watermelons': 'אבטיחים',
  'Melons': 'מלונים',
  'Persimmons': 'אפרסמונים',
  'Sweet Potatoes': 'בטטות',
  'Bananas': 'בננות',
  'Broccoli': 'ברוקולי',
  'Lemons': 'לימונים',
  'Grapes': 'ענבים',
  'Zucchini': 'קישואים',
  'Pomegranates': 'רימונים',
  'Dates': 'תמרים',
  'Potatoes': 'תפוחי אדמה',
  'Mushrooms': 'פטריות',
  'Pumpkin': 'דלורית',
  'Pears': 'אגסים',
  'Mandarins': 'קלמנטינות',
  'Beans': 'שעועית',
  'Garlic': 'שום',
  'Plums': 'שזיפים',
  'Mangoes': 'מנגו',
  'Avocados': 'אבוקדו',
  'Kumquats': 'קומקוואט',
  'Cilantro': 'כוסברה',
  'Beet Greens': 'עלי סלק',
  'Radish': 'צנון',
  'Sweet Potato': 'בטטה',
  'Parsley': 'פטרוזיליה',
  'Red Cabbage': 'כרוב אדום',
  'Turnip': 'לפת',
  'Apricots': 'משמשים',
  'Butternut Squash': 'דלעת',
  'Kiwi': 'קיווי',
  'Figs': 'תאנים',
  'Loquats': 'שסק',
  'Basil': 'בזיליקום',
  'Chickpeas': 'חומוס',
  'Dill': 'שמיר',
  'Mint': 'נענע',
  'Carambola (Starfruit)': 'כוכב פרי',
  'Peeled Garlic': 'שום קלוף',
  'Teff Grains': 'דגן טף'
};

function Donations({ isOpen, onClose, user }) {
  const [city, setCity] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [region, setRegion] = useState('');
  const [Crop, setCrop] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const donationData = {
        description: Crop,
        city: city,
        district: region,
        amountKG: amount,
        way: method,
        farmerNum: user.id, // Assuming user.id is the farmer's ID
      };

      const response = await axios.post(SITE_URL + '/api/Donations/add', donationData);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'התרומה נרשמה בהצלחה!',
          showConfirmButton: false,
          timer: 1500
        });
        onClose(); // Close the modal after a successful submission
      } else {
        throw new Error('Failed to add donation');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'תקלה בשליחת התרומה',
        text: error.message
      });
    }
  };

  const handlePredictionSubmit = async (event) => {
    event.preventDefault();

    try {
      const predictionData = {
        date: selectedDate ? dayjs(selectedDate).format('DD-MM-YYYY') : '',
        crop: Crop,
        region: region,
      };

      // Make an API call to get the prediction
      const response = await axios.post('https://crops-wrxx.onrender.com/predict', predictionData);

      if (response.status === 200) {
        let season = response.data['predictions']['season'];
        let crop = response.data['predictions']['crop'];
        let region = response.data['predictions']['region'];
        let amount = response.data['predictions']['amount']
        Swal.fire({
          icon: 'success',
          text: `בעונת ה${seasons[season]} באזור ה${regions[region]} צפויים להתקבל ${Math.floor(amount)} ק"ג של ${uniqueDescValuesDict[crop]}`,
          title: `ניבוי`, // Display the prediction result
          showConfirmButton: true,
        });
        onClose(); // Close the modal after a successful submission
      } else {
        throw new Error('Failed to get prediction');
      }
    } catch (error) {
      onClose();
      Swal.fire({
        icon: 'error',
        title: 'אין מספיק נתונים כדי לנבא'
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{user?.type === 0 ? 'שלח תרומה' : 'קבלת ניבוי'}</DialogTitle>
      <DialogContent>
        {user?.type === 0 && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="עיר"
              variant="outlined"
              margin="normal"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <TextField
              select
              label="מחוז"
              variant="outlined"
              margin="normal"
              fullWidth
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              SelectProps={{
                native: true,
              }}
              required
            >
              <option value="הצפון">הצפון</option>
              <option value="השרון">השרון</option>
              <option value="המרכז">המרכז</option>
              <option value="הדרום">הדרום</option>
            </TextField>
            <TextField
              label='כמות בק"ג'
              variant="outlined"
              margin="normal"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <TextField
              select
              label="דרך התרומה"
              variant="outlined"
              margin="normal"
              fullWidth
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              SelectProps={{
                native: true,
              }}
              required
            >
              <option value="לקט">לקט</option>
              <option value="איסוף">איסוף</option>
            </TextField>
            <TextField
              select
              label="סוג התבואה"
              variant="outlined"
              margin="normal"
              fullWidth
              value={Crop}
              onChange={(e) => setCrop(e.target.value)}
              SelectProps={{
                native: true,
              }}
              required
            >
              <option value="">בחר את סוג המזון לתרומה</option>
              {Object.entries(uniqueDescValuesDict).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </TextField>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                בטל
              </Button>
              <Button type="submit" color="primary">
                אשר תרומה
              </Button>
            </DialogActions>
          </form>
        )}
        {user?.type === 1 && (
          <form onSubmit={handlePredictionSubmit} sx={{width:"300px"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                inputFormat="DD-MM-YYYY"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
              />
            </LocalizationProvider>
            <TextField
              select
              label="אזור"
              variant="outlined"
              margin="normal"
              fullWidth
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              SelectProps={{
                native: true,
              }}
              required
            >
              <option value=""></option>
              <option value="North">צפון</option>
              <option value="HaSharon">השרון</option>
              <option value="Center">המרכז</option>
              <option value="South">הדרום</option>
            </TextField>
            <TextField
              select
              label="סוג התבואה"
              variant="outlined"
              margin="normal"
              fullWidth
              value={Crop}
              onChange={(e) => setCrop(e.target.value)}
              SelectProps={{
                native: true,
              }}
              required
            >
              <option value=""></option>
              <option value="Potatoes">תפוחי אדמה</option>
              <option value="Cucumbers">מלפפונים</option>
              <option value="Peppers">פלפלים</option>
              <option value="Tomatoes">עגבניות</option>
              <option value="Clementines">קלמנטינות</option>

            </TextField>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                בטל
              </Button>
              <Button type="submit" color="primary">
                בדוק ניבוי
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Donations;
