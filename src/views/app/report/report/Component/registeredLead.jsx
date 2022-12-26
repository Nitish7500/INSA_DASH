import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Button, Collapse } from "reactstrap";

function RegisteredLead({ state, sections, handleSection }) {
  const [formData, setformData] = useState({
    allRegisteredEnd: "",
    allRegisteredStart: "",
    allRegisteredType: "",
  });
  const [download, setdownload] = useState(false);
  const { allRegisteredStart, allRegisteredEnd, allRegisteredType } = formData;

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumit = () => {
    if (allRegisteredEnd && allRegisteredStart && allRegisteredType) {
      dispatch({ type: "REGISTERED_LEAD_REPORT", state: { ...formData } });
      setdownload(true);
    } else {
      NotificationManager.error(
        "Please enter Fileds !",
        "Fields cannot be empty !",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  useEffect(() => {
    if (download) {
      if (state.regLead) {
        document.getElementById("registeredLead")?.click();
        setdownload(false);
      }
    }
  }, [state.regLead]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("RegLeadRep")}
          id="monRegLeadRepDrpDwn"
        >
          Monthly Registered Lead Report Section
          <div
            className={
              sections.includes("AgentMonRep") ? "dropup btn-group m-0 p-0" : ""
            }
          >
            <Button
              style={{ height: "20px" }}
              color="primary"
              className="m-0 p-0 mt-n3 dropdown-toggle-split dropdown-toggle btn table-expand"
            ></Button>
          </div>
        </h4>
      </div>
      <div className="container shadow">
        <Collapse isOpen={sections.includes("RegLeadRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="regLeadStDt"
                  className="form-control border-bold"
                  name="allRegisteredStart"
                  type={"date"}
                  value={allRegisteredStart}
                  onChange={handleChange}
                  // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="regLeadEndDt"
                  className="form-control border-bold"
                  name="allRegisteredEnd"
                  max={(new Date()).toISOString()?.split("T")[0]}
                  type={"date"}
                  value={allRegisteredEnd}
                  onChange={handleChange}
                  // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Report Type</label>
                <select
                  id="regLeadRepType"
                  className="form-control border-bold"
                  name="allRegisteredType"
                  onChange={handleChange}
                  value={allRegisteredType}
                >
                  <option key={"select"} value={""}>
                    Select Type
                  </option>
                  <option key={"leadCreation"} value="leadCreation">
                    Lead Creation
                  </option>
                  <option key={"leadMovement"} value="leadMovement">
                    Lead Movement
                  </option>
                </select>
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  className="btn btn-primary"
                  onClick={handleSumit}
                  id="regLeadSDwnBtn"
                >
                  Download
                </button>
                <CSVLink
                  id="registeredLead"
                  filename="Registered-lead"
                  data={state.regLead}
                ></CSVLink>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default RegisteredLead;
