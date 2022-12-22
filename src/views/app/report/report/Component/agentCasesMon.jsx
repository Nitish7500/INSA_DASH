import React from "react";
import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NotificationManager } from "components/common/react-notifications";
import { CSVLink } from "react-csv";

function AgentCasesMon({ sections, handleSection, state }) {
  const [formData, setformData] = useState({});
  const [download, setdownload] = useState(false);
  const [downloadCon, setdownloadCon] = useState(false);

  let dispatch = useDispatch();
  const handleChnage = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    console.log(formData);
    const { agentCaseStatus, agentEnd, agentStart, userId } = formData;
    if (agentCaseStatus && agentEnd && agentStart && userId) {
      dispatch({
        type: "AGENT_CASES_MONTHLY_REPORT",
        state: { agentCaseStatus, agentEnd, agentStart, userId },
      });
      setdownload(true);
    } else {
      NotificationManager.error(
        "Fields cannot be empty !",
        "Please select Date !",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  const handleDownloadContract = () => {
    const { fromDate, toDate } = formData;
    if (fromDate && toDate) {
      dispatch({ type: "AGENT_CASES_CONTRACT_MONTHLY_REPORT", state: {fromDate,toDate} });
      setdownloadCon(true);
    } else {
      NotificationManager.error(
        "Fields cannot be empty !",
        "Please select Date !",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  useEffect(() => {
    if (downloadCon) {
      if (state.agentCasesCon.length) {
        document.getElementById("agentReportConDwnBtn").click();
        setdownloadCon(false);
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
  }, [state.agentCasesCon]);

  useEffect(() => {
    if (download) {
      if (state.agentCases.length) {
        document.getElementById("agentReportDwnBtn").click();
        setdownload(false);
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
  }, [state.agentCases]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className=""
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("AgentMonRep")}
        >
          Agent Cases Monthly Report Section
        </h4>
      </div>
      <div className="container shadow">
        <Collapse
          className="py-2 pb-4"
          isOpen={sections.includes("AgentMonRep")}
        >
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  className="form-control border-bold"
                  name="agentStart"
                  type={"date"}
                  onChange={handleChnage}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  className="form-control border-bold"
                  name="agentEnd"
                  type={"date"}
                  onChange={handleChnage}
                />
              </div>
              <div class="col-sm-3">
                <label> Select Status</label>
                <select
                  class="form-control border-bold"
                  name="agentCaseStatus"
                  onChange={handleChnage}
                >
                  <option value={""}>Select Status</option>
                  <option value="IGMS">IGMS</option>
                  <option value="ComplaintDate">Complaint Date</option>
                  <option value="ombudsmanCreated">
                    Ombudsman Created Date
                  </option>
                  <option value="VIAFormSubmitted">
                    Form VI Submitted Date
                  </option>
                  <option value="ombudsmanHearing">
                    Ombudsman Hearing Date
                  </option>
                  <option value="escalationDate">Escalation Date</option>
                  <option value="legalNotice">Legal Notice Date</option>
                  <option value="Ombudsman Pending">
                    Ombudsman Pending Date
                  </option>
                </select>
              </div>
              <div className="col-sm-3">
                <label>Select Executive</label>
                <select
                  className="form-control border-bold"
                  name="userId"
                  onChange={handleChnage}
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
              <button className="btn btn-primary" onClick={handleDownload}>
                Download
              </button>
              <CSVLink
                id="agentReportDwnBtn"
                filename="complaintReport"
                data={state.agentCases}
              ></CSVLink>
            </div>
          </div>
          <div className="container">
            <h4 className="pb-2">Contract</h4>
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  className="form-control border-bold"
                  name="fromDate"
                  type={"date"}
                  onChange={handleChnage}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  className="form-control border-bold"
                  name="toDate"
                  type={"date"}
                  onChange={handleChnage}
                />
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  className="btn btn-primary"
                  onClick={handleDownloadContract}
                >
                  Download
                </button>
                <CSVLink
                  id="agentReportConDwnBtn"
                  filename="complaintReport"
                  data={state.agentCasesCon}
                ></CSVLink>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default AgentCasesMon;
