import React from "react";
import { Collapse } from "reactstrap";
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
    console.log("Clicked");
  }, [state.leadRepData]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("LeadRep")}
        >
          Lead Section
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
                  className="form-control border-bold"
                  type={"date"}
                  name="startdate"
                  onChange={handleCountChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  className="form-control border-bold"
                  type={"date"}
                  name="enddate"
                  onChange={handleCountChange}
                />
              </div>
              <div className="col-sm-3">
                <label>Select User Name</label>
                <select
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
                <button className="btn btn-primary px-2" onClick={handleCount}>
                  Search
                </button>
              </div>
              <div className="col-sm-2">
                <label>Lead Count Result</label>
                <input
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
                    className="btn btn-primary"
                    onClick={handleTodayLeadCount}
                  >
                    Search
                  </button>
                </div>
                <div className="col-sm-3">
                  <label>Follow Lead Count</label>
                  <input
                    value={state.todayLeadCount?.follow_count}
                    className="form-control border-bold"
                    disabled
                  />
                </div>
                <div className="col-sm-3">
                  <label>Communication Count</label>
                  <input
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
                    className="form-control border-bold"
                    name="leadStart"
                    type={"date"}
                    onChange={handleCountChange}
                  />
                </div>
                <div className="col-sm-3">
                  <label>End Date</label>
                  <input
                    className="form-control border-bold"
                    name="leadEnd"
                    type={"date"}
                    onChange={handleCountChange}
                  />
                </div>
                <div class="col-sm-3">
                  <label> Select Status</label>
                  <select
                    class="form-control border-bold"
                    name="leadStatus"
                    onChange={handleCountChange}
                  >
                    <option value={""}>Select Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="REPEATED">REPEATED</option>
                    <option value="OPEN">OPEN</option>
                    <option value="WRONG">WRONG NUMBER</option>
                    <option value="QUERY">ONLY QUERY</option>
                    <option value="NOINSURANCE">NO INSURANCE QUERY</option>
                    <option value="NONCONTACTABLE">NON CONTACTABLE</option>
                    <option value="DOCUMENT_PENDING">DOCUMENT PENDING</option>
                    <option value="FOLLOWUP">FOLLOW UP</option>
                    <option value="REGISTERED">REGISTERED LEAD</option>
                    <option value="EXPERT">EXPERT LEAD</option>
                    <option value="THIRD_PARTY_ACCEPTED">
                      THIRD PARTY ACCEPTED LEAD
                    </option>
                    <option value="CUSTOMER_NOT_RESPONDING">
                      CUSTOMER NOT RESPONDING LEAD
                    </option>
                    <option value="AUTOFOLLOWUP">AUTO FOLLOWUP LEAD</option>
                    <option value="ALL">ALL LEAD</option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <label>Select Executive</label>
                  <select
                    className="form-control border-bold"
                    name="leadUser_id"
                    onChange={handleCountChange}
                  >
                    <option value={""}>Select User</option>
                    {state.allUsers?.length &&
                      state.allUsers?.map((res) => {
                        return <option value={res.user_id}>{res.name}</option>;
                      })}
                  </select>
                </div>
              </div>
              <div className="d-flex mt-3">
                <button className="btn btn-primary" onClick={handleLeadRep}>
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
