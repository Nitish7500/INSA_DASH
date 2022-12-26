import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Button, Collapse } from "reactstrap";

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
      } else {
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
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("OmbRejRep")}
          id="OmbRejSecDrpDwn"
        >
          Ombudsman Rejected Cases Report Section (B2C, Agent and Partner)
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
        <Collapse isOpen={sections.includes("OmbRejRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="ombRejStDt"
                  className="form-control border-bold"
                  name="omdRejectStart"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="ombRejEndDt"
                  className="form-control border-bold"
                  name="omdRejectEnd"
                  max={(new Date()).toISOString()?.split("T")[0]}
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Report Type</label>
                <select
                  id="ombRejReportType"
                  className="form-control border-bold"
                  name="omdRejectType"
                  onChange={handleChange}
                >
                  <option key={"select"} value={""}>
                    Select Type
                  </option>
                  <option key={"b2c"} value="complaint">
                    B2C
                  </option>
                  <option key={"agent"} value="agent">
                    Agent
                  </option>
                  <option key={"partner"} value="partner">
                    Partner
                  </option>
                </select>
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  className="btn btn-primary"
                  onClick={handleSumit}
                  id="ombRejDwnBtn"
                >
                  Download
                </button>
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
