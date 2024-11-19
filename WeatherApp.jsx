import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import './responsive.css'
import rain from './Gifs/rain.gif'
import loader from './Gifs/loading.gif'

import { imageArray } from './imageObj'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function WeatherApp() {




useGSAP(
()=>{
    gsap.to('.container',{
        opacity:1,
        duration:1.5,
        delay:0.6,
        ease:'none'
    
    })
    gsap.from('.secondDiv',{
        position:'relative',
     left:'-50%',
        duration:1.5,
        zIndex:'3',
     ease:'none'

    });
    gsap.from('.firstDiv',{
        position:'relative',
         x:'50%',
         duration:1.5,
         ease:'none'
         
     })
}
)









const[changeImage,imageFun] = useState(imageArray[0])




const[loading,loadingFun] = useState(false)
    const[curCity,cityFun] = useState('')
    const[weather,weatherFun] = useState(null)

let sumbit = ()=>{
    loadingFun(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curCity}&appid=70e14627333ee2912dc8fa893d0c6d1b`).then(res=>res.json()).then((result)=>{
        if(result.cod=="404"){

        }
        else{
weatherFun(result)
   } 
  })
    loadingFun(false)
}

    const[time,timeFun] = useState(null)
    let myDate = new Date().toDateString() 
    let updateTime = ()=>{
        let dateObj = new Date()
    let time = dateObj.getHours()
    let minutes = dateObj.getMinutes()
    let second = dateObj.getSeconds()
timeFun(`${time}:${minutes}:${second}`)


    }
    setInterval(updateTime,1000)
   
   
  return (
    <div className='container'>
     <div className='bgImage'  ></div>
    <div className='weatherDiv'>

<div className='firstDiv'><div className='leftBgImage'></div>
<div className='leftContent'>
    <div className='topLeft'>{weather==null?'':weather.name}<br/>{weather==null?'':weather.sys.country} </div>
    <div className='bottom'>
        <div className='time'><span> 
    {time}
        </span>{myDate} </div>  <div className='temperature'>{weather==null?'':`${((weather.main.temp)-273.15).toFixed(0)}°C`}</div></div>
       
        

    </div></div>
<div className='secondDiv'>

    <div className='details'>
        <ul>
            <li className='gifDiv'><img src={loading?loader:rain} alt="loading" className='gifImage'/></li>
            <li><h1>{weather==null?'Weather':weather.weather[0].main}</h1></li>
            <li>
                <form onSubmit={(event)=>{event.preventDefault()}}>
                <input type='text' placeholder='search any city' value={curCity} onChange={(e)=>{cityFun(e.target.value)}}/><button onClick={sumbit}>search</button></form></li>
            <li>{weather==null?'':weather.name} {weather==null?'':`,${weather.sys.country}`} </li>
            <li>Temperature <span>{weather==null?'':`${((weather.main.temp)-273.15).toFixed(2)}°C`}</span></li>
            <li>Humidity <span>{weather==null?'':weather.main.humidity}</span></li>
            <li>Visibility <span>{weather==null?'':weather.visibility}</span></li>
            <li>Wind Speed <span>{weather==null?'':weather.wind.speed}</span></li>
            <li>Description <span>{weather==null?'':weather.weather[0].description}</span></li>
        </ul>
    </div>
</div>

    </div>


    </div>
  )
}
