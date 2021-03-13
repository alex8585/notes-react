import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const {initialMinute = 0,initialSeconds = 0,afterEnd, className} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
        console.log('1');
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    afterEnd();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    },[minutes,seconds]);
    return (
        <span>
        { minutes === 0 && seconds === 0
            ? null
            : <span className={className}> {minutes ? minutes+':':''}{seconds < 10 ?  `0${seconds}` : seconds}</span> 
        }
        </span>
    )
}

export default Timer;