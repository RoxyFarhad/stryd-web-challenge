import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; 
import "./components/App.scss"
import {activityApi, userToken} from "./api.js"; 
import UserPreferences from "./components/UserPreferences";
import RunSummary from "./components/RunSummary.js"
import {UserProvider} from "./components/UserContext.js"
import LapsTable from "./components/LapsTable.js";
import PeakPowers from "./components/PeakPowers.js"

const App = () => {

  const [runData, setRunData] = useState("")

  useEffect(() => {
      const getRun = async () => {
          var res = await axios.get(activityApi, {
              headers: {
                  'Authorization': `Bearer ${userToken}`
              }
          })
          if (res.status === 200) {setRunData(res.data);}
      }; 
      getRun(); 
  }, [])   

  return runData.length !== 0 ? (
    <main className="main">
      <UserProvider> 
        <UserPreferences />
        <hr />
        <RunSummary runData={runData}/>
        <hr />
        <PeakPowers runData={runData}/>
        <hr />
        <LapsTable runData={runData} />
      </UserProvider>
    </main>
  ) : 
  (<div className="main"> Loading Data </div>);
};

export default App;
