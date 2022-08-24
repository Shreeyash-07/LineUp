import React, { useState, useEffect } from "react";

const Datatable2 = () => {
  const [Data, setData] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSlots = async () => {
    const res = await fetch("/admin");
    const data = await res.json();
    setData(data);
    console.log(Data);
  };
  useEffect(() => {
    fetchSlots();
    console.log(Data);
  }, []);

  function renderData() {
    return (
      <table>
        <thead>
          <th>Time</th>
        </thead>
        <tbody>
          {Data.map((user, index) => (
            <tr key={index}>
              <td>{user.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return;
  <>
    <div>Admin</div>
    {renderData()}
  </>;
};

export default Datatable2;
