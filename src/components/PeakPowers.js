import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext.js"
var moment = require('moment'); // require
var momentDurationFormatSetup = require("moment-duration-format");

function getElapsedPower(runData) {

    var elapsedPower = []
    var timeData = runData.timestamp_list
    var powerData = runData.total_power_list

    var i = 1
    while(i < timeData.length){
        var start_time = moment.unix(runData.timestamp_list[i-1])
        var end_time = moment.unix(runData.timestamp_list[i])
        var duration = moment.duration(end_time.diff(start_time)).asSeconds()
        
        for(var j = 0; j < duration; j++){
            elapsedPower.push(powerData[i-1]) 
        }

        i+=1
        
    }

    return elapsedPower
}

// the interval supplied will always be in s 
function calcPeakPower(power, interval){
    /* if every element is 1ms apart in time_interval data 
     * use this to calc in O(n) time using sliding-window 
     * because we are finding the av of fixed length can just calc max_sum and then return av 
    */
   
    if(interval > power.length){
        // if the interval is longer than length of run cannot calc max power
        return -1
    }

    var res = 0, i = 0
    while(i < interval){
        res += power[i]
        i += 1
    }

    var curr_sum = res
    for(i = interval; i < power.length; i++){
        curr_sum += power[i] - power[i-interval]
        res = Math.max(res, curr_sum) 
    }

    return (res/interval).toFixed(2)
}

export default function PeakPowers(props) {

    const runData = props.runData
    const user = useContext(UserContext)

    const durations = [["10 Seconds", 10], ["3 Minutes", 3*60], ["5 Minutes", 5*60], ["10 Minutes", 10*60], ["30 Minutes", 30*60], ["60 Minutes", 60*60]]
    const updatedPower = getElapsedPower(runData)
    durations.map((elem) => {
        console.log(calcPeakPower(updatedPower, elem[1]))
    })
    return (<section 
        style={{ display: 'block', border: '1px solid gainsboro', padding: '10px'}}> 
        <h1 style={{margin: 0}}> Peak Powers </h1> 
        <ul> 
            {durations.map((elem, i) => {
                return(<li key={elem}> {elem[0]} : {calcPeakPower(updatedPower, elem[1])}</li>)
            })}

        </ul>
        </section>)
}