import React from "react";
import { useState } from "react";
import { Button, Collapse } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import LeadReport from "./leadReport";
import { NotificationManager } from "components/common/react-notifications";
import UserSec from "./UserSec";
import CaseReport from "./caseReport";
import PaymentRep from "./paymentRep";
import MonthlyReport from "./monthlyReport";
import ComplaintMonRep from "./complaintMonRep";
import AgentCasesMon from "./agentCasesMon";
import ComplaintReport from "./complaintReport";
import OmbExeRep from "./ombExeRep";
import MonthlyResolved from "./monthlyResolved";
import RegisteredLead from "./registeredLead";
import MonthlyResB2c from "./monthlyResB2c";
import OmbRejectCases from "./ombRejectCases";
import TatReport from "./tatReport";
import BotReport from "./botReport";
// import BotReport from "./botReport";

function UserReport() {
  const [sections, setsections] = useState([]);
  const [addLeadForm, setaddLeadForm] = useState({});

  let dispatch = useDispatch();
  let state = useSelector((state) => {
    return state.report;
  });
  // console.log(state);

  useEffect(() => {
    dispatch({
      type: "REPORT_GET_ACTIVE_STATUS",
    });
    dispatch({
      type: "REPORT_GET_USER_AGENT_DATA",
    });
    dispatch({ type: "REPORT_GET_ALL_USER_LIST" });
    dispatch({ type: "REPORT_GET_INSURANCE_TYPE" });
  }, []);

  const handleSection = (sec) => {
    if (sections.includes(sec)) {
      let temp = sections.filter((res) => res !== sec);
      setsections(temp);
    } else {
      setsections([...sections, sec]);
    }
  };

  const handleAddLeadChange = (e) => {
    setaddLeadForm({ ...addLeadForm, [e.target.name]: e.target.files[0] });
    let form = new FormData();
    form.set(e.target.name, e.target.files[0]);
    dispatch({ type: "REPORT_UPLOAD_DOC", state: form });
  };

  const handleAddLead = (name) => {
    if (name === "lead") {
      if (addLeadForm.lead) {
        dispatch({
          type: "REPORT_UPLOAD_TO_SERVER",
          state: { type: "Whitegrape" },
        });
      } else {
        alert("Upload Lead !");
      }
    } else if (name === "missedCall") {
      if (addLeadForm.missedCall) {
        dispatch({
          type: "REPORT_UPLOAD_TO_SERVER",
          state: { type: "Missed" },
        });
      } else {
        alert("please upload missedCall File !");
      }
    }
  };

  return (
    <div className="bg-inherit pt-5">
      <div className="w-95 d-flex justify-content-center">
        <div
          className=" text-white b-2 h-20 pl-4 pt-2"
          style={{
            background: "linear-gradient(60deg, #2B009F, #100052)",
            borderRadius: "5px",
            width: "97%",
            marginTop: "-25px",
            marginBottom: "-25px",
            paddingBottom: "-17px",
          }}
        >
          <span className="h5">Report</span>
          <h5 className="mt-2">All Reposts</h5>
        </div>
      </div>
      <div
        className="bg-white shadow p-3 mb-5 bg-white pt-5"
        style={{ borderRadius: "5px" }}
      >
        <UserSec sections={sections} handleSection={handleSection} />
        <CaseReport
          handleSection={handleSection}
          sections={sections}
          state={state}
        />
        <LeadReport
          handleSection={handleSection}
          sections={sections}
          state={state}
        />
        <PaymentRep
          handleSection={handleSection}
          sections={sections}
          state={state}
        />
        <MonthlyReport
          handleSection={handleSection}
          sections={sections}
          state={state}
        />
        <ComplaintMonRep
          handleSection={handleSection}
          sections={sections}
          state={state}
        />

        <div>
          <AgentCasesMon
            sections={sections}
            handleSection={handleSection}
            state={state}
          />
        </div>

        <ComplaintReport
          sections={sections}
          handleSection={handleSection}
          state={state}
        />

        <OmbExeRep
          state={state}
          handleSection={handleSection}
          sections={sections}
        />
        <div>
          <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
            <h4
              className="d-flex"
              style={{ cursor: "pointer" }}
              onClick={() => handleSection("AddLeadR")}
              id="addLeadDrpDwn"
            >
              Add More Leads
              <div
                className={
                  sections.includes("AddLeadR")
                    ? "dropup btn-group m-0 p-0"
                    : ""
                }
              >
                <Button
                  style={{ height: "20px" }}
                  color="primary"
                  className={`m-0 p-0 ${sections.includes("AddLeadR") ? "mt-n1" : "mt-n3"}  dropdown-toggle-split dropdown-toggle btn table-expand`}
                  ></Button>
              </div>
            </h4>
          </div>
          <div className="container shadow">
            <Collapse isOpen={sections.includes("AddLeadR")}>
              <div className="container py-4">
                <div className="row">
                  <div className="col-sm-3">
                    <label>Lead CSV File</label>
                    <input
                      id="leadCsvFile"
                      className="form-control border-bold"
                      type={"file"}
                      name="lead"
                      onChange={handleAddLeadChange}
                    />
                  </div>
                  <div className="col-sm-3 mt-auto">
                    <button
                      id="uploadBtn"
                      className="btn btn-primary"
                      onClick={() => handleAddLead("lead")}
                    >
                      Upload
                    </button>
                  </div>
                  <div className="col-sm-3">
                    <label>Missed Call CSV File</label>
                    <input
                      id="missedCallCsv"
                      className="form-control border-bold"
                      type={"file"}
                      name="missedCall"
                      onChange={handleAddLeadChange}
                    />
                  </div>
                  <div className="col-sm-3 mt-auto">
                    <button
                      id="uploadBtn2"
                      className="btn btn-primary"
                      onClick={() => handleAddLead("missedCall")}
                    >
                      Upload Missed Call CSV
                    </button>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
          <MonthlyResolved
            state={state}
            handleSection={handleSection}
            sections={sections}
          />

          <RegisteredLead
            sections={sections}
            handleSection={handleSection}
            state={state}
          />

          <MonthlyResB2c
            sections={sections}
            handleSection={handleSection}
            state={state}
          />

          <OmbRejectCases
            state={state}
            handleSection={handleSection}
            sections={sections}
          />

          <TatReport
            state={state}
            handleSection={handleSection}
            sections={sections}
          />
          <BotReport
            sections={sections}
            state={state}
            handleSection={handleSection} 
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default UserReport;
