import React from "react";
import { Button, Collapse } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from "components/common/react-notifications";

function CaseReport({ state, sections, handleSection }) {
  let dispatch = useDispatch();

  const [caseForm, setcaseForm] = useState({});
  const [caseCount, setcaseCount] = useState({});
  const [caseData, setcaseData] = useState([]);

  const handleChange = (e) => {
    setcaseForm({ ...caseForm, [e.target.name]: e.target.value });
  };

  const handleCaseRepSubmit = () => {
    // handle Submit
    console.log(caseForm);
    dispatch({ type: "REPORT_CASE_REPORT_DATA", state: { ...caseForm } });
  };

  const handleStatusChange = (e) => {
    dispatch({
      type: "REPORT_CASE_REPORT_STATUS_DATA",
      state: { caseStatus: e.target.value },
    });
  };

  const handleAgentChange = (e) => {
    dispatch({
      type: "REPORT_CASE_REPORT_AGENT_DATA",
      state: { user_id: e.target.value },
    });
  };

  const handleCountChange = (e) => {
    setcaseCount({ ...caseCount, [e.target.name]: e.target.value });
  };

  const handleCaseCount = () => {
    if (caseCount.startdate && caseCount.enddate && caseCount.assign_id) {
      dispatch({
        type: "REPORT_CASE_REPORT_COUNT_DATA",
        state: { ...caseCount },
      });
    } else {
      NotificationManager.error(
        "Fields cannot be empty",
        "Please select date and User",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("CaseRep")}
          id="caseReportSecOpen"
        >
          Case Report Section
          <div
            className={
              sections.includes("CaseRep") ? "dropup btn-group m-0 p-0" : ""
            }
          >
            <Button
              style={{ height: "20px" }}
              color="primary"
              className={`m-0 p-0 ${sections.includes("CaseRep") ? "mt-n1" : "mt-n3"}  dropdown-toggle-split dropdown-toggle btn table-expand`}
            ></Button>
          </div>
        </h4>
      </div>
      <div className="container shadow">
        <Collapse className="py-2 pb-4" isOpen={sections.includes("CaseRep")}>
          <div className="container mt-5">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  className="form-control border-bold"
                  type={"date"}
                  name="startDate"
                  onChange={handleChange}
                  id="caseRepStaDt"
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  className="form-control border-bold"
                  type={"date"}
                  name="endDate"
                  max={(new Date()).toISOString()?.split("T")[0]}
                  onChange={handleChange}
                  id="caseRepEndDt"
                />
              </div>
              <div className="col-sm-3">
                <label>Select Status</label>
                <select
                  className="form-control border-bold"
                  name="caseStatus"
                  onChange={handleStatusChange}
                  id="caseStatusDrpDwn"
                >
                  <option key={1} value={""}>
                    Select Status
                  </option>
                  {state.status?.length &&
                    state.status?.map((res, i) => {
                      return (
                        <option key={i} value={res.name}>
                          {res.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-sm-3">
                <label>Search Agent</label>
                <input
                  id="caseRepSelAgn"
                  className="form-control border-bold"
                  type={"text"}
                  name="user_id"
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <button
                className="btn rounded btn-primary"
                onClick={handleCaseRepSubmit}
                id="caseRepSearchBtn"
              >
                Search
              </button>
            </div>
          </div>
          <div className="container mt-3">
            <h4>Case Court</h4>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="caseRepStaSecDt"
                  className="form-control border-bold"
                  type={"date"}
                  name="startdate"
                  onChange={handleCountChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="caseRepSecEndDt"
                  className="form-control border-bold"
                  type={"date"}
                  max={(new Date()).toISOString()?.split("T")[0]}
                  name="enddate"
                  onChange={handleCountChange}
                />
              </div>
              <div className="col-sm-3">
                <label>Select User Name</label>
                <select
                  id="caseRepDrpDwnUser"
                  className="form-control border-bold"
                  onChange={handleCountChange}
                  name="assign_id"
                >
                  <option key={1} value={""}>
                    Select User
                  </option>
                  {state.userAgent.length &&
                    state.userAgent.map((res, i) => {
                      return (
                        <option key={i} value={res.user_id}>
                          {res.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-sm-3">
                <label>Case Count Result</label>
                <input
                  id="caseCountResult"
                  value={state.caseRepCount}
                  className="form-control border-bold"
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <button
                id="caseCountBtn"
                className="btn btn-primary rounded"
                onClick={handleCaseCount}
              >
                Case Count
              </button>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12 table-responsive">
                <table className="table table-responsive-sm">
                  <thead>
                    <tr key={Math.random()}>
                      <th>Agent</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Policy number</th>
                      <th>Company Name</th>
                      <th>Policy Type</th>
                      <th>Mobile</th>
                      <th>Current Status</th>
                      <th>Assign To</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.caseRep?.map((res, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {res.agentInfo ? res.agentInfo.agentName : "--"}
                          </td>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.policy_number}</td>
                          <td>{res.inc_comp_name}</td>
                          <td>{res.policy_type}</td>
                          <td>{res.mobile}</td>
                          <td>{res.caseStatus}</td>
                          <td>{res.assign_to}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faEye}
                              id={"caseRepView" + i}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default CaseReport;
