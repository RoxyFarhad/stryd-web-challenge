import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext.js"

const UserPreferences = props => {

  const user = useContext(UserContext)
  
  return (
    <section
      style={{
        display: 'block',
        border: '1px solid gainsboro',
        padding: '10px'
      }}
    >
      <h2 style={{ marginTop: 0 }}>User Settings</h2>
      <div style={{ display: 'block', marginTop: '25px' }}>
        <p style={{ margin: '0px' }}>Unit Preference:</p>
        <div style={{ display: 'block' }}>
          
          <select
            id={'unit-selector'}
            onChange={event => {
              user.setUnitPref(event.target.value);
            }}
            value={user.unitPref}
          >
            <option>Kilometers</option>
            <option>Miles</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'block', marginTop: '25px' }}>
        <p style={{ margin: '0px' }}>Laps Preference:</p>
        <div style={{ display: 'block' }}>
            <select
            id={'lap-type-selector'}
            onChange={event => {
              user.setLapsPref(event.target.value);
            }}
            value={user.lapsPref}
            >  
              <option>Manual</option>
              <option>Distance</option>
            </select>       
        </div>
      </div>
    </section>
  );
};

export default UserPreferences;
