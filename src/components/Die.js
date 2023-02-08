import React from "react";
import "../index.css";

export default function Die(props){
    const style = {

        backgroundColor: props.isHeld ? "#59E391": "white",
        borderRadius: "10px"
    }

    return(
        <div >
            
            {props.value === 1 && 
                <div style={style} onClick={props.holdDice} className="dice-face first-face">
                    <span className="dot"> </span>
                </div>
            }

            {props.value === 2 && 
                <div style={style} onClick={props.holdDice} className="dice-face second-face">
                    <span className="dot"> </span>
                    <span className="dot"> </span>
                </div>
            }
            {props.value === 3 && 
                <div style={style} onClick={props.holdDice} className="dice-face third-face">
                    <span className="dot"> </span>
                    <span className="dot"> </span>
                    <span className="dot"> </span>
                </div>
            }
            
            {props.value === 4 && 
                <div style={style} onClick={props.holdDice} className="dice-face fourth-face">
                    
                    <div className="column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    
                </div>
            }
            {props.value === 5 &&
                <div style={style} onClick={props.holdDice} className="dice-face fifth-face">
                    <div className="column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    
                    <div className="column">
                        <span className="dot"></span>
                    </div>
                    
                    <div className="column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
              </div>
            }
            {props.value === 6 && 
                <div style={style} onClick={props.holdDice} className="dice-face sixth-face">
                    <div className="column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            }
            
            
        </div>
    )
}