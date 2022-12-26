import React from "react";
import { Button, Collapse } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NotificationManager } from "components/common/react-notifications";
import { CSVLink, CSVDownload } from "react-csv";
import { useEffect } from "react";

function LeadReport({ handleSection, sections, state }) {
  let dispatch = useDispatch();

  const [leadCountForm, setleadCountForm] = useState({});
  const [leadRepForm, setleadRepForm] = useState({});

  const handleCountChange = (e) => {
    setleadCountForm({ ...leadCountForm, [e.target.name]: e.target.value });
  };

  const handleCount = () => {
    const { startdate, enddate, assign_id } = lea;
    if (startdate && enddate && assign_id) {
      dispatch({
        type: "LEAD_REPORT_COUNT_DATA",
        state: { startdate, enddate, assign_id },
      });
      NotificationManager.success(
        "Total Lead Count !",
        "",
        3000,
        null,
        null,
        "filled"
      );
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

  const handleTodayLeadCount = () => {
    dispatch({ type: "TODAY_LEAD_COUNT_DATA", user_id: leadCountForm.user_id });
  };

  const handleLeadRep = () => {
    const {
      leadStart,
      leadEnd,
      leadStatus: status,
      leadUser_id: user_id,
    } = leadCountForm;
    if (leadStart && leadEnd && status && user_id) {
      dispatch({
        type: "LEAD_REPORT_DATA",
        state: { leadEnd, leadStart, status, user_id },
      });
      NotificationManager.success(
        "Lead Fetched Successfully !",
        "",
        3000,
        null,
        null,
        "filled"
      );
      setleadCountForm({ ...leadCountForm, downloadLeadRep: true });
    } else {
      NotificationManager.error(
        "Fields cannot be empty",
        "Please select date, Executive and Status !",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  useEffect(() => {
    if (leadCountForm.downloadLeadRep) {
      document.getElementById("executiveLeadDownload")?.click();
      setleadCountForm({ ...leadCountForm, downloadLeadRep: false });
    }
  }, [state.leadRepData]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("LeadRep")}
          id="leadSecDrpDwn"
        >
          Lead Section
          <div
            className={
              sections.includes("LeadRep") ? "dropup btn-group m-0 p-0" : ""
            }
          >
            <Button
              style={{ height: "20px" }}
              color="primary"
              className={`m-0 p-0 ${sections.includes("LeadRep") ? "mt-n1" : "mt-n3"}  dropdown-toggle-split dropdown-toggle btn table-expand`}
            ></Button>
          </div>
        </h4>
      </div>
      <div>
        <Collapse isOpen={sections.includes("LeadRep")}>
          <div className="container shadow py-3  rounded-lg">
            <div className="container my-3 ">
              <span className="h5">Lead Count</span>
            </div>
            <div className="row ml-2">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="leadRepStaDt"
                  className="form-control border-bold"
                  type={"date"}
                  name="startdate"
                  onChange={handleCountChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="leadRepEndDt"
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
                  id="leadRepUserSelect"
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
              <div className="col-sm-1 mt-auto">
                <button
                  className="btn btn-primary px-2"
                  onClick={handleCount}
                  id="leadRepSearch"
                >
                  Search
                </button>
              </div>
              <div className="col-sm-2">
                <label>Lead Count Result</label>
                <input
                  id="leadRepLeadCount"
                  className="form-control border-bold"
                  disabled
                  value={state.leadRepCount}
                />
              </div>
            </div>
            <div className="container mt-4">
              <h4 className="mb-4">Today Follow Date Lead Count</h4>
              <div className="row">
                <div className="col-sm-3">
                  <label>Select User Name</label>
                  <select
                    id="leadRepSlcUserDrpDwn"
                    className="form-control border-bold"
                    onChange={handleCountChange}
                    name="user_id"
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
                <div className="col-sm-3 mt-4">
                  <button
                    id="leadRepSearchFollow"
                    className="btn btn-primary"
                    onClick={handleTodayLeadCount}
                  >
                    Search
                  </button>
                </div>
                <div className="col-sm-3">
                  <label>Follow Lead Count</label>
                  <input
                    id="leadRepFollowCntInp"
                    value={state.todayLeadCount?.follow_count}
                    className="form-control border-bold"
                    disabled
                  />
                </div>
                <div className="col-sm-3">
                  <label>Communication Count</label>
                  <input
                    id="leadRepCommCount"
                    className="form-control border-bold"
                    value={state.todayLeadCount?.communication_count}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="container mt-4">
              <h4>Lead Report</h4>
              <div className="row">
                <div className="col-sm-3">
                  <label>Start Date</label>
                  <input
                    id="leadRepScStDt"
                    className="form-control border-bold"
                    name="leadStart"
                    type={"date"}
                    onChange={handleCountChange}
                  />
                </div>
                <div className="col-sm-3">
                  <label>End Date</label>
                  <input
                    id="leadRepScEndDt"
                    className="form-control border-bold"
                    name="leadEnd"
                    max={(new Date()).toISOString()?.split("T")[0]}
                    type={"date"}
                    onChange={handleCountChange}
                  />
                </div>
                <div className="col-sm-3">
                  <label> Select Status</label>
                  <select
                    id="leadRepScStatus"
                    className="form-control border-bold"
                    name="leadStatus"
                    onChange={handleCountChange}
                  >
                    <option key={"null"} value={""}>
                      Select Status
                    </option>
                    <option key={"2"} value="PENDING">
                      PENDING
                    </option>
                    <option key={"3"} value="ACCEPTED">
                      ACCEPTED
                    </option>
                    <option key={"4"} value="REJECTED">
                      REJECTED
                    </option>
                    <option key={"5"} value="REPEATED">
                      REPEATED
                    </option>
                    <option key={"6"} value="OPEN">
                      OPEN
                    </option>
                    <option key={"7"} value="WRONG">
                      WRONG NUMBER
                    </option>
                    <option key={"8"} value="QUERY">
                      ONLY QUERY
                    </option>
                    <option key={"9"} value="NOINSURANCE">
                      NO INSURANCE QUERY
                    </option>
                    <option key={"10"} value="NONCONTACTABLE">
                      NON CONTACTABLE
                    </option>
                    <option key={"11"} value="DOCUMENT_PENDING">
                      DOCUMENT PENDING
                    </option>
                    <option key={"12"} value="FOLLOWUP">
                      FOLLOW UP
                    </option>
                    <option key={"13"} value="REGISTERED">
                      REGISTERED LEAD
                    </option>
                    <option key={"14"} value="EXPERT">
                      EXPERT LEAD
                    </option>
                    <option key={"15"} value="THIRD_PARTY_ACCEPTED">
                      THIRD PARTY ACCEPTED LEAD
                    </option>
                    <option key={"16"} value="CUSTOMER_NOT_RESPONDING">
                      CUSTOMER NOT RESPONDING LEAD
                    </option>
                    <option key={"17"} value="AUTOFOLLOWUP">
                      AUTO FOLLOWUP LEAD
                    </option>
                    <option key={"18"} value="ALL">
                      ALL LEAD
                    </option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <label>Select Executive</label>
                  <select
                    id="leadRepScSelectExe"
                    className="form-control border-bold"
                    name="leadUser_id"
                    onChange={handleCountChange}
                  >
                    <option key={"user"} value={""}>
                      Select User
                    </option>
                    {state.allUsers?.length &&
                      state.allUsers?.map((res) => {
                        return (
                          <option key={res.user_id} value={res.user_id}>
                            {res.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3">
                <button
                  className="btn btn-primary"
                  onClick={handleLeadRep}
                  id="leadRepScDwnBnt"
                >
                  Download
                </button>
              </div>
              <div className="col-sm-3">
                <CSVLink
                  filename="ExecutiveLead"
                  id="executiveLeadDownload"
                  data={state.leadRepData}
                ></CSVLink>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default LeadReport;
