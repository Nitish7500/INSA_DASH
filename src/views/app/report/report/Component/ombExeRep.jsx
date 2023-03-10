import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { Button, Collapse } from "reactstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

function OmbExeRep({ sections, handleSection, state }) {
  const [formData, setformData] = useState({
    repEnd: "",
    repStart: "",
    reportType: "",
  });
  const [download, setdownload] = useState(false);

  let dispatch = useDispatch();

  const { reportType, repEnd, repStart } = formData;

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!repStart) {
      NotificationManager.error(
        "Field cannot be Empty !",
        "Please Select Start Date",
        3000,
        null,
        null,
        "filled"
      );
    } else if (!repEnd) {
      NotificationManager.error(
        "Field cannot be Empty !",
        "Please Select End Date",
        3000,
        null,
        null,
        "filled"
      );
    } else if (!reportType) {
      NotificationManager.error(
        "Field cannot be Empty !",
        "Please Select Report Type",
        3000,
        null,
        null,
        "filled"
      );
    } else {
      dispatch({ type: "OMBUDSMAN_EXECUTIVE_REPORT", state: { ...formData } });
      setdownload(true);
    }
  };

  useEffect(() => {
    if (download) {
      if (state.ombData?.length) {
        document.getElementById("ombudsmanDownloadBtn").click();
        setdownload(false);
      }
    }
  }, [state.ombData]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("OmbRep")}
          id="ombExeDrpDwn"
        >
          Ombudsman and Ops Executive Report Section
          <div
            className={
              sections.includes("OmbRep") ? "dropup btn-group m-0 p-0" : ""
            }
          >
            <Button
              style={{ height: "20px" }}
              color="primary"
              className={`m-0 p-0 ${sections.includes("OmbRep") ? "mt-n1" : "mt-n3"}  dropdown-toggle-split dropdown-toggle btn table-expand`}
            ></Button>
          </div>
        </h4>
      </div>
      <div className="container shadow">
        <Collapse isOpen={sections.includes("OmbRep")}>
          <div className="conatiner py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="ombExeStDt"
                  className="form-control border-bold"
                  name="repStart"
                  type={"date"}
                  value={repStart}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="ombExeEndDt"
                  className="form-control border-bold"
                  name="repEnd"
                  max={(new Date()).toISOString()?.split("T")[0]}
                  type={"date"}
                  value={repEnd}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Report Type</label>
                <select
                  id="ombExeReportType"
                  className="form-control border-bold"
                  name="reportType"
                  value={reportType}
                  onChange={handleChange}
                >
                  <option key={"select"} value={""}>
                    Select Report Type
                  </option>
                  <option key={"omb"} value="Ombudsman">
                    Ombudsman
                  </option>
                  <option key={"opsExe"} value="Ops">
                    Ops Executive
                  </option>
                </select>
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  id="ombExeDwnBtn"
                  className="
                  btn btn-primary"
                  onClick={handleSubmit}
                >
                  Download
                </button>

                <CSVLink
                  id="ombudsmanDownloadBtn"
                  filename="ComplaintReport"
                  data={state.ombData}
                ></CSVLink>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default OmbExeRep;
