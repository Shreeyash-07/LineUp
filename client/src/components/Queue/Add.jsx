import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Add = () => {
  console.log("in add");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const PostData = async (e) => {
    e.preventDefault();
    setError(false);
    console.log("in postdata");

    const res = await fetch("/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        time,
      }),
    });

    const data = await res.json();
    console.log({ data });
    if (data.success === false || !data) {
      setError(true);
      return;
    } else {
      navigate("/admin");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/getslots");
      const mainData = await res.json();
      console.log(mainData);
      setSlots(mainData.newSlots);
      console.log(mainData.newSlots);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div>
          <form>
            <div className="row mb-3">
              <label
                htmlFor="name"
                className="col-sm-3 col-form-label"
                style={{ fontSize: "15px", fontWeight: "800" }}
              >
                Name:
              </label>
              <div className="col-sm-9">
                <input
                  type="test"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  style={{ fontFamily: "inherit", border: "none" }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="phone"
                className="col-sm-3 col-form-label"
                style={{ fontSize: "15px", fontWeight: "800" }}
              >
                Phone:
              </label>
              <div className="col-sm-9">
                <input
                  type="phone"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  style={{
                    fontFamily: "inherit",
                    border: "none",
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="phone"
                className="col-sm-3 col-form-label"
                style={{ fontSize: "15px", fontWeight: "800" }}
              >
                Slot:
              </label>
              <div className="col-sm-9">
                {/* <Select options={slots}></Select> */}
                <select
                  className="form-select"
                  id="selectvalue"
                  onChange={(e) => setTime(e.target.value)}
                >
                  {slots.map((element, index) => (
                    <option key={index} value={element.time}>
                      {element.time}
                      {/* {time} */}
                    </option>
                  ))}
                  ;
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary m-3"
                name="login"
                id="login"
                value="submit"
                onClick={PostData}
                style={{ fontFamily: "inherit" }}
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
