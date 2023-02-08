import Confetti from "react-confetti";
import React from "react";


import { useState, useEffect } from "react";


export default function Conffeti(){
  const [windowDimension, setWindowDimension] = useState({width: window.innerWidth, height: window.innerHeight})

  const detectSize =()=> {
    setWindowDimension({width : window.innerWidth, height: window.innerHeight})
  }

  useEffect(()=>{
    window.addEventListener('resize', detectSize)

    return()=>{
      window.removeEventListener('resize', detectSize)
    } 
  }, [windowDimension]);
  return (
        <Confetti width={windowDimension.width} height={windowDimension.height} />

  )
}

