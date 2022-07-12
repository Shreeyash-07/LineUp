import React from "react";
import useFetch from "../../Hooks/useFetch";
const Slots = () => {
  const slotBook = (e) => {
    e.preventDefault();
    console.log(e.target.getAttribute("value"));
  };

  const { data, loading, error } = useFetch("/getslots");
  return (
    <div>
      <ul>
        {data.map((element, index) => (
          <li
            key={index}
            value={element}
            onClick={slotBook}
            style={{ cursor: "pointer" }}
            h1
          >
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slots;
