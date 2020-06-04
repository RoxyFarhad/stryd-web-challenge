import React, {useContext } from "react";
import { UserContext } from "./UserContext.js"
import "./LapsTable.scss"
var moment = require('moment'); // require
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
moment().format(); 

function findTimeStampIndex(lappedTime, timestamps){

    var indices = [0] // pos 0 will always be there because the first value will start from 0 

    // optimise -- always know that the lappedTime[i] will be <  = timestamps[i]
    var start = 0
    for(var i = 0; i < lappedTime.length; i++){

        var j = start
        while(lappedTime[i] !== timestamps[j]){j++}
        if(lappedTime[i] === timestamps[j]){indices.push(j)}
        start = j

    }

    // assume we want from the last lap to the end
    if(indices[indices.length - 1] !== timestamps.length - 1){indices.push(timestamps.length - 1)}

    return indices
}   

// mode = 0 = km, mode = 1 represents = miles
function findDistanceIndex(distance_list, mode){

    var indices = [0]

    // finding based on km values
    if(mode === "Kilometers") {
        var i = 0, curr = 1000
        while(i < distance_list.length - 1){
            // find the closest value above x000 e.g. 1000 / 2000
            var j = i
            while(j < distance_list.length-1 && distance_list[j] < curr){j++}
            // at this point at the first value above x000
            indices.push(j)
            i = j
            curr += 1000
        }
    }
    
    if(mode === "Miles"){
        var i = 0, curr = 1
        while(i < distance_list.length - 1){
            var j = i
            while(j < distance_list.length-1 && distance_list[j]/1609 < curr){j++}
            indices.push(j)
            i = j
            curr += 1
        }

    }
    
    // add the last index if the person wants to know the laps between last km and the end 

    return indices

}

function getElapsedTime(runData, prev, curr) {

    var start_time = moment.unix(runData.timestamp_list[prev])
    var end_time = moment.unix(runData.timestamp_list[curr])
    var duration = moment.duration(end_time.diff(start_time)).asMilliseconds()

    var output = moment.duration(duration, "milliseconds").format("hh:mm:ss", {trim: false});
    return output
}

function getElapsedDist(user, runData, start, end) {
    var startDist = runData.distance_list[start]
    var endDist = runData.distance_list[end]
    var distM = (user.unitPref === "Kilometers") ? 
        ((endDist - startDist) / 1000).toFixed(2) : ((endDist - startDist) / 1000).toFixed(2)

    return user.lapsPref === "Distance" ? Math.floor(distM) : distM

}

function getAveragePace(user, runData, start, end) {

        var speedArr = runData.speed_list
        var totalSpeed = 0
        for(var i = start; i <= end; i++){
            totalSpeed += speedArr[i]
        }

        totalSpeed = totalSpeed/(end - start) * 60

        var avSpeed = user.unitPref === "Kilometers" ? 
            totalSpeed : totalSpeed * 1.609

        var output = moment.duration(avSpeed, "seconds").format("hh:mm:ss", {trim: false});
        return output
}

function getAveragePower(runData, start, end) {

    var powerArr = runData.total_power_list
    var totalPower = 0
    for(var i = start; i <= end; i++){
        totalPower += powerArr[end]
    }

    return (totalPower/(end - start)).toFixed(2)
} 

function populateTable(user, runData, indices) {

    var data = []

    // populating the table 
    for(var i = 1; i < indices.length; i++){
        var temp = {}

        // rendering the lap number 
        temp['lap_num'] = i

        // rendering lapped time duration
        var prevI = indices[i-1]
        var currI = indices[i]

        temp['elapsed_time'] = getElapsedTime(runData, prevI, currI)
        temp['distance_ran'] = getElapsedDist(user, runData, prevI, currI)
        temp['av_speed'] = getAveragePace(user, runData, prevI, currI)
        temp['av_power'] = getAveragePower(runData, prevI, currI)

        data.push(temp)
    }
    return data
}

function renderTableData(objData) {
    return objData.map((row, j) => {
        const {lap_num, elapsed_time, distance_ran, av_speed, av_power} = row
        return (
            <tr key={lap_num}> 
                <td>{lap_num}</td>
                <td>{elapsed_time}</td>
                <td>{distance_ran}</td>
                <td>{av_speed}</td>
                <td>{av_power}</td>
            </tr>
        )
    })
}

function renderTableHeader(user, objData) {
    var units = (user.unitPref === "Kilometers") ? "km" : "mile" 
    let header = ['LAP NUMBER', 'ELAPSED LAP TIME (hh:mm:ss) ', `ELAPSED DISTANCE (${units})`, `AVERAGE LAP SPEED (min / ${units})`, 'AVERAGE POWER (WATTS)']
    return header.map((key, i) => {
        return <th key={i}>{key.toUpperCase()}</th>
    })
}   

export default function LapsTable(props) {

    const runData = props.runData
    const user = useContext(UserContext)
    const lapped_list = runData.lap_timestamp_list, timestamps = runData.timestamp_list
    const dist_list = runData.distance_list
    // rendering the data 
    var indices = [] 

    if(user.lapsPref === "Manual"){
        indices = findTimeStampIndex(lapped_list, timestamps)  
    } 
    else if(user.lapsPref === "Distance"){
        indices = findDistanceIndex(dist_list, user.unitPref)
    }

    console.log(indices)

    var data = populateTable(user, runData, indices)

    return (
        <section 
            style={{ display: 'block', border: '1px solid gainsboro', padding: '10px'}}> 
            <h1 style={{marginTop: 0}}> Laps Table </h1> 
            <table className="table"> 
                <tbody> 
                    <tr>{renderTableHeader(user, data)}</tr>
                    {renderTableData(data)}
                </tbody>
            </table>
        </section>)


}