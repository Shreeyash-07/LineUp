import React, { useState, useEffect } from "react";
import UserTableRow from "../UserTableRow/UserTableRow";
import useFetch from "../../Hooks/useFetch";
const DataTable = () => {
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSlots = async () => {
    const res = await fetch("/admin");
    const data = await res.json();
    setSlots(data);
  };
  useEffect(() => {
    fetchSlots();
  }, []);
  return (
    <main>
      <div className="table-container">
        <div className="uk-overflow-auto">
          <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
            <thead>
              <tr>
                <th className="uk-table-shrink" />
                <th className="uk-table-shrink" />
                <th className="uk-table-shrink">Avatar</th>
                <th>Slot Time</th>
                <th>Status</th>
                <th>QRCode</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="uk-text-center">
                    <em className="uk-text-muted">Loading...</em>
                  </td>
                </tr>
              ) : (
                slots.map((e, index) => (
                  <UserTableRow key={index} index={index + 1} e={e} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default DataTable;

// users.map((user, index) => (
//   <UserTableRow key={index} index={index + 1} user={user} />
// ));
