import React from "react";
import { Collapse } from "reactstrap";
import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from "components/common/react-notifications";

function CaseReport({state, sections, handleSection}) {

    let dispatch = useDispatch()

    const [caseForm, setcaseForm] = useState({})
    const [caseCount, setcaseCount] = useState({})
    const [caseData, setcaseData] = useState([])

    const handleChange = (e) => {
        setcaseForm({...caseForm, [e.target.name]:e.target.value})
    }

    const handleCaseRepSubmit = () => {
        // handle Submit
        console.log(caseForm)
        dispatch({type:"REPORT_CASE_REPORT_DATA", state:{...caseForm}})
    }

    const handleStatusChange = (e) => {
        dispatch({type:"REPORT_CASE_REPORT_STATUS_DATA", state:{caseStatus:e.target.value}})
    }

    const handleAgentChange = (e) => {
        dispatch({type:"REPORT_CASE_REPORT_AGENT_DATA",state:{user_id:e.target.value}})
    }

    const handleCountChange = (e) => {
        setcaseCount({...caseCount, [e.target.name]:e.target.value})
    }

    const handleCaseCount = () => {
        if(caseCount.startdate && caseCount.enddate && caseCount.assign_id){
            dispatch({type:"REPORT_CASE_REPORT_COUNT_DATA",state:{...caseCount}})
        }else{
            NotificationManager.error(
                "Fields cannot be empty",
                "Please select date and User",
                3000,
                null,
                null,
                "filled"
            )
        }
    }

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("CaseRep")}
        >
          Case Report Section
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
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  className="form-control border-bold"
                  type={"date"}
                  name="endDate"
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Status</label>
                <select className="form-control border-bold" name="caseStatus" onChange={handleStatusChange}>
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
                  className="form-control border-bold"
                  type={"text"}
                  name="user_id"
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <button className="btn rounded btn-primary" onClick={handleCaseRepSubmit}>Search</button>
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
                <select className="form-control border-bold"
                  onChange={handleCountChange} name="assign_id">
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
                <input value={state.caseRepCount} className="form-control border-bold" disabled />
              </div>
            </div>
            <div className="d-flex mt-3">
              <button className="btn btn-primary rounded" onClick={handleCaseCount}>Case Count</button>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12 table-responsive">
                <table className="table table-responsive-sm">
                  <thead>
                    <tr key={1}>
                      <th scope="col">Agent</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Policy number</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Policy Type</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Current Status</th>
                      <th scope="col">Assign To</th>
                      <th scop="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        state.caseRep?.map((res,i) => {
                            return <tr key={i}>
                            <td>{ res.agentInfo ? res.agentInfo.agentName : '--' }</td>
                            <td>{ res.name }</td>
                            <td>{ res.email }</td>
                            <td>{ res.policy_number }</td>
                            <td>{ res.inc_comp_name }</td>
                            <td>{ res.policy_type }</td>
                            <td>{ res.mobile }</td>
                            <td>{ res.caseStatus }</td>
                            <td>{ res.assign_to }</td>
                            <td><FontAwesomeIcon icon={faEye} /></td>
                            </tr>
                        })
                    }
                    <tr key={2}></tr>
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
