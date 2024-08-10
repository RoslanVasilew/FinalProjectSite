import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function MultiActionAreaCard() {
  return (
    <div className='Cards-section'>
        <Card sx={{ maxWidth: 345, margin: 1}}>
            <CardMedia
            component="img"
            height="140"
            image="/src/assets/bg1.jpg"
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            מדוע הוקם הארגון?
            </Typography>
            <Typography variant="body2" color="text.secondary">
            ג'וזף גיטלר עלה לישראל מניו 
            יורק בשנת 2000 ועד מהרה התוודע לסטטיסטיקה של העוני במדינת ישראל. העוני אינו רק מנת חלקן של אותן
            "אוכלוסיות מיוחדות" עליהן כולם מדברים. הוא גם מנת חלקם של אלפי ישראלים, אנשים חרוצים 
            העובדים למחייתם ונאבקים יומיום בכדי לשרוד, אך נותרים מתחת לקו העוני.בשנת 2003 
            הוקם הארגון הראשון "משולחן לשולחן" במטרה להציל מזון מאובדן, למנוע בזבוז ולמגר את בעיית חוסר 
            הבטחון התזונתי. במהרה הפך הארגון ל"לקט ישראל" – בנק המזון ורשת הצלת המזון הגדולה בארץ.
            </Typography>
            </CardContent>
        
        </Card>
        <Card sx={{ maxWidth: 345, margin: 1}}>
        <CardMedia
          component="img"
          height="140"
          image="/src/assets/bg4.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          מה הארגון עושה?          </Typography>
          <Typography variant="body2" color="text.secondary">
          הארגון עוסק בקטיף עודפי תוצרת חקלאית ואיסוף
           ארוחות מבושלות, מיונם וחלוקתם לנתמכים ברחבי הארץ. כמו כן, מתקיימת בקרה על איכות
           המזון המוצל תוך ווידוא שהינו בעל ערך תזונתי גבוה, וכי הוא נשמר בתנאים מיטביים.
           מומחים מטעם הארגון מעבירים סדנאות תזונה לאוכלוסיות היעד שמטרתן העלאת מודעות לתזונה נכונה.
          </Typography>
        </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345, margin: 1}}>
        <CardMedia
          component="img"
          height="140"
          image="/src/assets/bg3.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          ארגון לקט ישראל במספרים
          </Typography>
          <Typography variant="body2" color="text.secondary">
            נכון לשנת 2023, בארגון:<br/>
            160 עובדים<br/>
            70,000 מתנדבים<br/>
            מרכז לוגיסטי:<br/>
            שטח אחסון של כ-6,000 מ"ר<br/>
            נפח קירור של כ-10,000 מ"ק<br/>
            67 כלי רכב לתפעול והובלת מזון<br/>
            33,595 טונות של מזון סופק לנזקקים<br/>
            100% מזון בריא<br/>
            296 עמותות ובתי תמחוי אשר מקבלות מאיתנו את המזון ומעבירות אותו לכ-333,000 נתמכים<br/>
            325 סדנאות תזונה בריאה לאוכלוסיות בסיכון<br/>
            </Typography>
        </CardContent>
    </Card>
    </div>
  );
}