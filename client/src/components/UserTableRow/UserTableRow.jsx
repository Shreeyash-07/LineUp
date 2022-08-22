import React, { useState, useRef } from "react";
import { slideDown, slideUp } from "./anim";
import { UilQrcodeScan } from "@iconscout/react-unicons";

const UserTableRow = (props) => {
  const [expanded, setexpanded] = useState(false);
  const ref = useRef(false);
  function formatDate(str) {
    return str.substr(0, 10);
  }

  function capitalize(str) {
    return str
      .split(" ")
      .map((s) => {
        return s.charAt(0).toUpperCase() + s.substr(1);
      })
      .join(" ");
  }

  const toggleExpander = (e) => {
    if (e.target.type === "checkbox") return;

    if (!expanded) {
      setexpanded(true, () => {
        if (ref) {
          slideDown(ref);
        }
      });
    } else {
      slideUp(ref, {
        onComplete: () => {
          setexpanded(false);
        },
      });
    }
  };
  const { e } = props;
  return [
    <tr key="main" onClick={() => toggleExpander}>
      <td>
        <input className="uk-checkbox" type="checkbox" />
      </td>
      <td className="uk-text-nowrap">{props.index}.</td>
      <td>
        <img
          className="uk-preserve-width uk-border-circle"
          width={48}
          alt="avatar"
        />
      </td>
      <td>
        {e.time}
        <br />
        <small>Something</small>
      </td>
      <td> {e.isFull === true ? "Full" : "Not Full"}</td>
      <td>
        <UilQrcodeScan />
      </td>
    </tr>,
    expanded && (
      <tr className="expandable" key="tr-expander">
        <td className="uk-background-muted" colSpan={6}>
          <div ref={ref} className="inner uk-grid">
            <div className="uk-width-1-4 uk-text-center">
              <img
                className="uk-preserve-width uk-border-circle"
                alt="avatar"
              />
            </div>
            <div className="uk-width-3-4">
              <h3>something</h3>
              <p>
                Address:
                <br />
                <i>
                  something
                  <br />
                  something
                  <br />
                  something
                </i>
              </p>
              <p>
                E-mail:something
                <br />
                Phone: something
              </p>
              <p>Date of birth: something</p>
            </div>
          </div>
        </td>
      </tr>
    ),
  ];
};

export default UserTableRow;
