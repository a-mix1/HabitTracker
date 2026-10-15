import React, { memo,useCallback,useEffect, useState } from 'react'
import HabitCard from './HabitCard.jsx'
import  '../styles/style.css';
function Habit() {

 const [storage,setStorage]=useState([
    {name:'S',
     type:'increase',
     days:['2026-10-01'],
     id:1
    },
    {name:'A',
     type:"reduce",
     days:['2026-10-31','2026-10-01'],
     id:2
    }])
 
  const[formData,setformData]=useState({
    name:"",
    type:""
  })

  const deleteHabit=useCallback((id)=>
  {
   setStorage(prev=>prev.filter(item=> item.id!=id))
   console.log('deleted',id)
  },[])

  const[showForm,setshowForm]=useState(false)
  
  const addHabit=useCallback((name,type)=>{
        setStorage( prev=>[...prev,
          {
            days:[],
            name:name,
            type:type?type:"increase",
            id:Math.random()
          }
        ]);
        setformData(   
          {name:"",
          type:""}
        )
  },[])


  const divClicked=useCallback((fullDate,id)=>{
    console.log('inside clicked')
    setStorage(prev =>
      prev.map(item=>
      item.id==id?
      {
      ...item,
      days: item.days.includes(fullDate)?
      item.days.filter(day=>day!==fullDate):
      [...item.days,fullDate]
    }:item))
  },[])

  

  

  
  return (
    <>
        <div className='habitList'>

          
          
          <btn onClick={()=>setshowForm(!showForm)}>add habit</btn>
          {showForm && (
                <form onSubmit={(e)=>{e.preventDefault();addHabit(formData.name,formData.type)}}>
                  Name
                  <input type='text'
                   value={formData.name}
                   onChange={e=>{setformData({
                    ...formData,
                    name:e.target.value}
                   )}}
                  >
                  </input>
                  <select
                   value={formData.type}
                   onChange={e=>{setformData({
                    ...formData,
                    type:e.target.value}
                   )}}
                  >  <option value="" disabled hidden>
                      I want to...
                    </option>
                     <option value="increase" >build this habit</option>
                     <option value="reduce">reduce this habit</option>
                  </select>
                  <button type="submit" >Add</button>
                </form>
            )}
            {storage.map((item) => (
              <div className='habit' key={item.id} >
                 <HabitCard habit={item} 
                  deleteHabit={deleteHabit}
                  divClicked={divClicked}
                 />
              </div>
            ))}
        </div>
    </>
    
  )
}

export default Habit;
