import React from 'react';
import '/src/css/page-header.css';
import Cards from '/src/components/Card.jsx'; // Adjust the path if necessary

const PageHeader = () => {
  return (
    <div>
        <div className="page-header">
            <div className='text-box'>
                <div className="page-header-content">
                לקט ישראל
                </div>
                <div className="page-header-text">
                    לקט ישראל הוא ארגון הצלת המזון הלאומי, אחראי לאיסוף
                    וקטיף עודפי מזון איכותיים ומגוונים,וחלוקתם
                    <br />באמצעות עמותות לטובת מאות אלפי 
                    נתמכים בכל הארץ.
                </div>
            </div>
        </div>

        <div className='first-pic-text-box'>
            <div className="vision-text">
                <span className='title'>החזון</span>
                <br />
                הצלת כל עודפי המזון הראויים והמזינים בישראל למען אלה הזקוקים להם.
            </div>
            <div className="page-header-vision">
            </div>
        </div>

        <div className='second-pic-text-box'>
            <div className="page-header-vision3">
            </div>
            <div className="vision-text">
                <span className='title'>המשימה</span>
                <br />
                לקט ישראל יוביל את תחום הצלת עודפי המזון האיכותיים והמזינים, 
                יפעל באופן יעיל ויאפשר נגישות גבוהה למזון זה לכל מי שזקוק לו בישראל.
                </div>
        </div>
  </div>
  );
};

export default PageHeader;
