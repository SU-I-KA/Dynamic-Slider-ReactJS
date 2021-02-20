import React, {useState, useEffect} from 'react';
import './App.css';
import {FaQuoteRight} from 'react-icons/fa';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    const lastPerson = people.length - 1;
    if(index < 0){
      setIndex(lastPerson);
    }
    if(index > lastPerson){
      setIndex(0);
    }
  },[index, people])

  useEffect(()=>{
    let slide = setInterval(()=>{setIndex(index + 1);}, 3000);
    return ()=>clearInterval(slide);
  },[index])

  return (
    <div className='container'>
      <div className='title'>
        <h1><span>/</span>reviews</h1>
      </div>
      <div className='slider-container'>
        {
          people.map((person, personIndex)=>{
            const {id, image, name, title, quote} = person;
            let position = 'next-slide';
            if(index === personIndex){
              position='active-slide';
            }
            if((personIndex === index - 1) || (index === 0 && personIndex === people.length - 1)){
              position='last-slide';
            }
            return(
              <div className={`slider-body ${position}`} key={id}>
                <img className='image' src={image} alt={name} />
                <div className='name'>{name}</div>
                <div className='job'>{title}</div>
                <div className='text'>{quote}</div>
                <FaQuoteRight className='quote' />
              </div>
            )
          })
        }
        <button className='prev-btn' onClick={()=>setIndex(index-1)}>
          <FiChevronLeft />
        </button>
        <button className='next-btn' onClick={()=>setIndex(index+1)}>
          <FiChevronRight />
        </button>
      </div>
      
    </div>
  );
}

export default App;
