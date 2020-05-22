import React, { useState } from 'react';

const UserPreferences = props => {
  const [unitPref, setUnitPref] = useState('Kilometers');
  const [lapsPref, setLapsPref] = useState('Manual');

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
              setUnitPref(event.target.value);
            }}
            value={unitPref}
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
              setLapsPref(event.target.value);
            }}
            value={lapsPref}
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
