import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Collapse } from "reactstrap";

function MonthlyResB2c({ sections, handleSection, state }) {
  const [formData, setformData] = useState({
    resolveEnd: "",
    resolveStart: "",
    resolveReportType: "",
  });
  const [download, setdownload] = useState(false);
  const { resolveEnd, resolveStart, resolveReportType } = formData;

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumit = () => {
    if (resolveEnd && resolveStart && resolveReportType) {
      dispatch({ type: "MONTHLY_RESOLVED_B2C", state: { ...formData } });
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
      if (state.monthlyB2C) {
        document.getElementById("monthlyB2cBtn")?.click();
        setdownload(false);
      }
    }
  }, [state.monthlyB2C]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("MonResRep")}
          id="monRepB2c"
        >
          Monthly Resolved Report Section(B2C, Agent and Partner)
        </h4>
      </div>
      <div className="container shadow">
        <Collapse isOpen={sections.includes("MonResRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="monRepB2cStDt"
                  className="form-control border-bold"
                  name="resolveStart"
                  value={resolveStart}
                  type={"date"}
                  onChange={handleChange}
                  // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="monRepB2cEndDt"
                  className="form-control border-bold"
                  name="resolveEnd"
                  value={resolveEnd}
                  type={"date"}
                  onChange={handleChange}
                  // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Report Type</label>
                <select
                  id="monRepB2cRepType"
                  className="form-control border-bold"
                  name="resolveReportType"
                  value={resolveReportType}
                  onChange={handleChange}
                >
                  <option value={""}>Select Type</option>
                  <option value="complaint">B2C</option>
                  <option value="agent">Agent</option>
                  <option value="partner">Partner</option>
                </select>
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  className="btn btn-primary"
                  onClick={handleSumit}
                  id="monRepB2cDwnBtn"
                >
                  Download
                </button>
                <CSVLink
                  id="monthlyB2cBtn"
                  filename="monthly-b2c"
                  data={state.monthlyB2C}
                ></CSVLink>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default MonthlyResB2c;
