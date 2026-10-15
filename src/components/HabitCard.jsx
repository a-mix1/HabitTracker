import React, { memo,useEffect, useState } from 'react';
import dayjs from 'dayjs';
import  '../styles/style.css';

function HabitCard({habit,deleteHabit,divClicked}) {
  const today = dayjs().format('YYYY-MM-DD');

  
  


  const [MonthArray, setMonthArray] = useState([]);
  const [CurrentMonthNumber, setCurrentMonthNumber] = useState(dayjs());
  
  useEffect(() => {
    console.log('component rendered')
    generateMonth();
  }, [CurrentMonthNumber,habit]);

  

  const nextMonth = () => {
    setCurrentMonthNumber(CurrentMonthNumber.add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentMonthNumber(CurrentMonthNumber.subtract(1, 'month'));
  };

  const generateMonth = () => {
    const daysInMonth = CurrentMonthNumber.daysInMonth();
    const finalArray = [];

    for (let i = 1; i <= daysInMonth; i++) 
    {
        const date = CurrentMonthNumber.date(i);
       
        const fullDate = date.format('YYYY-MM-DD');

        let className;

        if (fullDate === today && habit.days.includes(fullDate) && habit.type==='increase') {
            className = 'monthlyArrayMarked today increase';
        }

        else if (fullDate === today && habit.days.includes(fullDate) && habit.type==='reduce') {
            className = 'monthlyArrayMarked today reduce';
        }
        else if (fullDate === today) {
            className = 'monthlyArrayClassUnmarked today';
        }
        else if (habit.days.includes(fullDate) && habit.type==='increase') {
            className = 'monthlyArrayMarked  increase';
        }
         else if (habit.days.includes(fullDate) && habit.type==='reduce') {
            className = 'monthlyArrayMarked  reduce';
        }
        else {
            className = 'monthlyArrayClassUnmarked';
        }

        finalArray.push(
            <div
                className={className}
                onClick={()=>divClicked(fullDate,habit.id)}
                id={fullDate}
                key={fullDate}
            ></div>
        );
    }
      setMonthArray(finalArray);
  };

  return (
    <>
      <h2>{habit.name}</h2>
      <h3>{CurrentMonthNumber.format('MMMM,YYYY')}</h3>
      <btn onClick={()=>deleteHabit(habit.id)}>delete</btn>
      <div className='monthHabitBox'>
      {MonthArray}
       </div>
      

      <btn onClick={prevMonth}>back</btn>
      <btn onClick={nextMonth}>Next</btn>

    </>
   
  );
}

export default memo(HabitCard);

