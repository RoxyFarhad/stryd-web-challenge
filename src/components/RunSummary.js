import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext.js"
var moment = require('moment'); // require
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);
moment().format(); 

export default function RunSummary(props) {

    const runData = props.runData
    const user = useContext(UserContext)

    function getElapsedTime() {

        var start_time = moment.unix(runData.timestamp_list[0])
        var end_time = moment.unix(runData.timestamp_list[runData.timestamp_list.length - 1])
        var duration = moment.duration(end_time.diff(start_time)).asMilliseconds()

        var output = moment.duration(duration, "milliseconds").format("hh:mm:ss");
        return(<li> Duration: {output} </li>)
    }

    function getDistance() {

        var startDist = runData.distance_list[0]
        var endDist = runData.distance_list[runData.distance_list.length - 1]
        var distM = (endDist - startDist) / 1000

        return user.unitPref === "Kilometers" ? 
            (<li> Distance Ran: {(distM).toFixed(2)} Km </li>) :
            (<li> Distance Ran: {(distM/1.609).toFixed(2)} Miles </li>)
    }

    function getAveragePace() {

        var speedArr = runData.speed_list
        var totalSpeed = 0
        for(var i = 0; i < speedArr.length; i++){
            totalSpeed += speedArr[i]
        }
        avSpeed = totalSpeed/speedArr.length
        avSpeed = (1000/60)/avSpeed
        var avSpeed = user.unitPref === "Kilometers" ? 
            (1000/60)/avSpeed : (1000/60*1.609)/avSpeed 
        
        var output = moment.duration(avSpeed, "minutes").format("hh:mm:ss", {trim: false});
        return (<li> Average Elapsed Speed: {output} </li>)
    }

    function getAveragePower() {
        var powerArr = runData.total_power_list
        var totalPower = 0
        for(var i = 0; i < powerArr.length; i++){
            totalPower += powerArr[i]
        }

        var avPower = totalPower/powerArr.length
        return (<li> Average Elapsed Power : {(avPower.toFixed(2))} Watts</li>)
    }  

    return (
        <section       
            style={{
            display: 'block',
            border: '1px solid gainsboro',
            padding: '10px'
          }}>         
            <h2 style={{marginTop: 0}}> Run Summary </h2>
            <div> Run Name : {runData.name} </div>
            <ul> 
                {getElapsedTime()}
                {getDistance()}
                {getAveragePace()}
                {getAveragePower()}
            </ul>
        </section>
    )
}
