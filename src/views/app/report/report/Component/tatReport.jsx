import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Collapse } from "reactstrap";

function TatReport({ sections, handleSection, state }) {
  const [formData, setformData] = useState({
    tatReportEndDate: "",
    tatReportStartDate: "",
    tatStatus1: "",
    tatStatus2: "",
  });
  const [download, setdownload] = useState(false);
  const { tatReportEndDate, tatReportStartDate, tatStatus1, tatStatus2 } =
    formData;

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumit = () => {
    if (tatReportEndDate && tatReportStartDate && tatStatus1 && tatStatus2) {
      if (tatStatus1 === tatStatus2) {
        NotificationManager.error(
          "Please Select Different Status !",
          "Both status are Same !",
          3000,
          null,
          null,
          "filled"
        );
      } else {
        dispatch({ type: "TAT_REPORT_DATA", state: { ...formData } });
        setdownload(true);
      }
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
      if (state.tatData?.length) {
        document.getElementById("tatDataBtn")?.click();
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
  }, [state.tatData]);

  return (
    <div>
      <div>
        <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => handleSection("OmbRejRep")}
            id="tatReportDrpDwn"
          >
            TAT Report
          </h4>
        </div>
        <div className="container shadow">
          <Collapse isOpen={sections.includes("OmbRejRep")}>
            <div className="container py-4">
              <div className="row">
                <div className="col-sm-3">
                  <label>Start Date</label>
                  <input
                    id="tatRepStDt"
                    className="form-control border-bold"
                    name="tatReportStartDate"
                    type={"date"}
                    value={tatReportStartDate}
                    onChange={handleChange}
                    // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                  />
                </div>
                <div className="col-sm-3">
                  <label>End Date</label>
                  <input
                    id="tatRepEndDt"
                    className="form-control border-bold"
                    name="tatReportEndDate"
                    type={"date"}
                    value={tatReportEndDate}
                    onChange={handleChange}
                    // onChange={(e) => {setpayDoneRepForm({...payDoneRepForm,[e.target.name]:e.target.value})}}
                  />
                </div>
                <div className="col-sm-3">
                  <label>Select Report Type</label>
                  <select
                    id="tatRepRepType"
                    className="form-control border-bold"
                    name="tatStatus1"
                    value={tatStatus1}
                    onChange={handleChange}
                  >
                    <option value={""}>Select Status</option>
                    {state.status?.map((res) => {
                      return <option>{res.name}</option>;
                    })}
                    <option value="complaint">B2C</option>
                    <option value="agent">Agent</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <label>Select Report Type</label>
                  <select
                    id="tatRepRepType2"
                    className="form-control border-bold"
                    name="tatStatus2"
                    onChange={handleChange}
                    value={tatStatus2}
                  >
                    <option value={""}>Select Status</option>
                    {state.status?.map((res) => {
                      return <option>{res.name}</option>;
                    })}
                    <option value="complaint">B2C</option>
                    <option value="agent">Agent</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
                <div className="col-sm-3 mt-auto">
                  <button
                    className="btn btn-primary"
                    onClick={handleSumit}
                    id="tatRepDwnBtn"
                  >
                    Download
                  </button>
                  <CSVLink
                    id="tatDataBtn"
                    filename="tat-report"
                    data={state.tatData}
                  ></CSVLink>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default TatReport;
