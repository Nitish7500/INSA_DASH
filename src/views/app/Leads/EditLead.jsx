import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function EditLead({ lead, seteditPage, getData }) {
  const [formData, setformData] = useState({
    leadId: lead?.leadId,
    status: lead?.status,
    createdAt: lead?.createdAt
      ? moment(lead.createdAt).format("YYYY-MM-DD HH:MM")
      : "",
    name: lead?.name,
    phone: lead?.phone,
    email: lead?.email,
    policyTypeId: lead?.policyTypeId?._id,
    complaintTypeId: lead?.complaintTypeId?._id,
    otpVerified: lead?.isPhoneVerified ? "Yes" : "No",
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state.leadReducer);
  console.log(state, lead);

  useEffect(() => {
    dispatch({
      type: "LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE",
      state: { policyType: formData?.policyTypeId },
    });
  }, [formData.policyTypeId]);

  useEffect(() => {
    dispatch({ type: "LEAD_GET_POLICY_TYPE" });
  }, [lead]);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    leadId,
    status,
    createdAt,
    name,
    phone,
    email,
    policyTypeId,
    complaintTypeId,
    otpVerified,
  } = formData;

  return (
    <div className="bg-inherit pt-5" id="editLeadContainer">
      <div className="w-95 d-flex justify-content-center">
        <div
          className=" d-flex text-white b-2 h-20 pl-4 pt-2"
          style={{
            background: "linear-gradient(60deg, #2B009F, #100052)",
            borderRadius: "5px",
            width: "97%",
            marginTop: "-25px",
            marginBottom: "-25px",
            paddingBottom: "-17px",
          }}
        >
          <div
            className="mr-3 mt-auto mb-auto pb-2"
            style={{ cursor: "pointer" }}
            onClick={() => seteditPage(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </div>
          <div>
            <span className="h5">Lead Details</span>
            <h5>Below are lead details</h5>
          </div>
        </div>
      </div>
      <div className="bg-white shadow p-3 mb-5 bg-white">
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Reference ID</label>
                <input
                  value={leadId}
                  id="editLeadRefId"
                  type={"text"}
                  className="form-control bg-white"
                  style={{ border: "2px solid #f3f3f3", borderStyle: "dotted" }}
                  disabled
                ></input>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Status</label>
                <select
                  value={status}
                  className="form-control bg-white"
                  id="editLeadStatus"
                  style={{ border: "2px solid #f3f3f3", borderStyle: "dotted" }}
                  disabled
                >
                  <option>PENDING</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Created At</label>
                <input
                  value={createdAt}
                  id="editLeadCreatedAt"
                  type={"text"}
                  className="form-control bg-white"
                  style={{ border: "2px solid #f3f3f3", borderStyle: "dotted" }}
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Name</label>
                <input
                  name="name"
                  onChange={handleChange}
                  value={name}
                  id="editLeadName"
                  type={"text"}
                  className="form-control border"
                ></input>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Mobile</label>
                <input
                  name="phone"
                  onChange={handleChange}
                  value={phone}
                  id="editLeadMobile"
                  type={"number"}
                  className="form-control border"
                ></input>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Email</label>
                <input
                  value={email}
                  name="email"
                  onChange={handleChange}
                  id="editLeadEmail"
                  type={"email"}
                  className="form-control border"
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Policy Type</label>
                <select
                  name="policyTypeId"
                  onChange={handleChange}
                  value={policyTypeId}
                  className="form-control border"
                  id="editLeadPolicyType"
                >
                  {state.policyType?.map((res) => {
                    return <option value={res._id}>{res.name}</option>;
                  })}
                  <option></option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">Complaints Type</label>
                <select
                  onChange={handleChange}
                  name="complaintTypeId"
                  value={complaintTypeId}
                  className="form-control border"
                >
                  {state.complaintType?.map((res) => {
                    return <option value={res._id}>{res.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="form-control border-0">
                <label className="form-control border-0">OTP Verified</label>
                <input
                  value={otpVerified}
                  id="editLeadOtpVerified"
                  type={"text"}
                  className="form-control bg-white"
                  style={{ border: "2px solid #f3f3f3", borderStyle: "dotted" }}
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <button
            className="btn btn-warning rounded font-weight-bold mt-3 ml-2"
            onClick={() => {
              dispatch({
                type: "Lead_UPDATE_LEAD",
                state: { ...lead, ...formData },
              });
              seteditPage(false);
              getData("PENDING", 0,50);
            }}
          >
            {" "}
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLead;
