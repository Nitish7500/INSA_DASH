import React from "react";
import { useState } from "react";
import { Button, Collapse } from "reactstrap";
import { useDispatch } from "react-redux";
import { NotificationManager } from "components/common/react-notifications";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

function ComplaintReport({ sections, handleSection, state }) {
  const [formData, setformData] = useState({
    complaintEnd: "",
    complaintStart: "",
    policyType: "",
  });
  const [download, setdownload] = useState(false);

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    if (
      formData.complaintEnd &&
      formData.complaintStart &&
      formData.policyType
    ) {
      dispatch({ type: "COMPLAINT_REPORT_DATA", state: { ...formData } });
      setdownload(true);
    } else {
      NotificationManager.error(
        "Please Select date and Policy !",
        "Field cannot be empty",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  const handleClear = () => {
    setformData({
      complaintEnd: "",
      complaintStart: "",
      policyType: "",
    });
  };

  useEffect(() => {
    if (formData.policyType) {
      dispatch({
        type: "REPORT_GET_INSURANCE_COMPANIES",
        policyType: formData.policyType,
      });
      dispatch({
        type: "REPORT_GET_COMPLAINT_TYPE",
        policyType: formData.policyType,
      });
    }
  }, [formData.policyType]);

  useEffect(() => {
    if (download) {
      if (state.compData?.length) {
        setdownload(false);
        document.getElementById("complaintRepDownBtn").click();
      } else {
        NotificationManager.error(
          "Empty List !",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    }
  }, [state.compData]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("ComRep")}
          id="comRepDrpDown"
        >
          Complaint Report Section
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
        <Collapse isOpen={sections.includes("ComRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="comRepStDt"
                  className="form-control border-bold"
                  name="complaintStart"
                  type={"date"}
                  onChange={handleChange}
                  value={formData.complaintStart}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="comRepEndDt"
                  max={(new Date()).toISOString()?.split("T")[0]}
                  className="form-control border-bold"
                  name="complaintEnd"
                  type={"date"}
                  onChange={handleChange}
                  value={formData.complaintEnd}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Policy Type</label>
                <select
                  id="comRepPolicyTy"
                  className="form-control border-bold"
                  name="policyType"
                  onChange={handleChange}
                  value={formData.policyType}
                  //   onChange={(e) => {
                  //     setcomRepForm({
                  //       ...comRepForm,
                  //       [e.target.name]: e.target.value,
                  //     });
                  //   }}
                >
                  <option key={"policyType"} value={""}>
                    Select Policy Type
                  </option>
                  {state.policyTypes.length &&
                    state.policyTypes?.map((res) => {
                      return (
                        <option key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-sm-3">
                <label>Select Company Name</label>
                <select
                  className="form-control border-bold"
                  name="company"
                  onChange={handleChange}
                  id="comRepSlcCom"
                >
                  <option key={"com"} value={""}>
                    Select Company
                  </option>
                  {state.insuranceCom.length &&
                    state.insuranceCom?.map((res) => {
                      return (
                        <option key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-3">
                <label>Select Complaint Type</label>
                <select
                  id="comRepComType"
                  className="form-control border-bold"
                  name="complaintType"
                  onChange={handleChange}
                >
                  <option key={"ComType"} value={""}>
                    Select Complaint Type
                  </option>
                  {state.comTypes.length &&
                    state.comTypes?.map((res) => {
                      return (
                        <option key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-sm-3">
                <label>Select Status</label>
                <select
                  id="comRepSelectStatus"
                  className="form-control border-bold"
                  name="selectStatus"
                  onChange={handleChange}
                >
                  <option key={"st"} value={""}>
                    Select Status
                  </option>
                  {state.status.length &&
                    state.status?.map((res) => {
                      return (
                        <option key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-sm-2 mt-auto">
                <div className="d-flex">
                  <button
                    id="comRepDwnBtn"
                    className="btn btn-primary mr-2"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                  <CSVLink
                    id="complaintRepDownBtn"
                    filename="ComplaintReport"
                    data={state.compData}
                  ></CSVLink>
                  <button className="btn btn-warning" onClick={handleClear}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default ComplaintReport;
