import React, { useState } from "react";

const UserPreferences = props => {
  const [unitPref, setUnitPref] = useState("Kilometers");
  const [durationPref, setDurationPref] = useState("Moving");

  return (
    <section
      style={{
        display: "block",
        border: "1px solid gainsboro",
        padding: "10px"
      }}
    >
      <h2 style={{ marginTop: 0 }}>User Settings</h2>
      <div style={{ display: "block", marginTop: "25px" }}>
        <p style={{ margin: "0px" }}>Unit Preference:</p>
        <div style={{ display: "block" }}>
          <select
            id={"unit-selector"}
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
      <div style={{ display: "block", marginTop: "25px" }}>
        <p style={{ margin: "0px" }}>Duration Preference:</p>
        <div style={{ display: "block" }}>
          <select
            id={"duration-type-selector"}
            onChange={event => {
              setDurationPref(event.target.value);
            }}
            value={durationPref}
          >
            <option>Moving</option>
            <option>Elapsed</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default UserPreferences;
