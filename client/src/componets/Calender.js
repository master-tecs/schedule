import * as mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import './Calender.css'

mobiscroll.setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const Datepicker = mobiscroll.Datepicker;

export default function Calender({dark}) {
    const mode = dark ? "dark" : "light";
    
    return (
        <div className="calender">
            
            <Datepicker
                controls={['calendar']}
                display="inline"
                calendarType="week"
                weeks={2}
                themeVariant={mode}
            />
            
        </div>
    ); 
}




// import React, { useState } from 'react'
// // import './Calender.css'
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function Calender() {
//     const [value, onChange] = useState(new Date());
    
//     return (
//         <div className="calender">
//             <Calendar
//                 onChange={onChange}
//                 value={value}
//             />
//         </div>
//     )
// }

// export default Calender
