import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Collapse } from "reactstrap";

function OmbRejectCases({ state, handleSection, sections }) {


  const [formData, setformData] = useState({
    omdRejectEnd: "",
    omdRejectStart: "",
    omdRejectType: "",
  });
  const [download, setdownload] = useState(false);
  const { omdRejectEnd, omdRejectStart, omdRejectType } = formData;

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumit = () => {
    if (omdRejectEnd && omdRejectStart) {
      dispatch({ type: "OMB_REJECT_CASES", state: { ...formData } });
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
      if (state.ombRejectCases?.length) {
        document.getElementById("ombRejectCasesBtn")?.click();
        setdownload(false);
      }else{
        NotificationManager.error(
            "Empty List !",
            "No Record Found !",
            3000,
            null,
            null,
            "filled"
          );
      }
    }
  }, [state.ombRejectCases]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("OmbRejRep")}
        >
          Ombudsman Rejected Cases Report Section (B2C, Agent and Partner)
        </h4>
      </div>
      <div className="container shadow">
        <Collapse isOpen={sections.includes("OmbRejRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  className="form-control border-bold"
                  name="omdRejectStart"
                  type={"date"}
                  onChange={handleChange}
                  // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  className="form-control border-bold"
                  name="omdRejectEnd"
                  type={"date"}
                  onChange={handleChange}
                  // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Report Type</label>
                <select
                  className="form-control border-bold"
                  name="omdRejectType"
                  onChange={handleChange}
                >
                  <option value={""}>Select Type</option>
                  <option value="complaint">B2C</option>
                  <option value="agent">Agent</option>
                  <option value="partner">Partner</option>
                </select>
              </div>
              <div className="col-sm-3 mt-auto">
                <button className="btn btn-primary" onClick={handleSumit}>Download</button>
                <CSVLink
                  id="ombRejectCasesBtn"
                  filename="monthly-b2c"
                  data={state.ombRejectCases}
                ></CSVLink>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default OmbRejectCases;
