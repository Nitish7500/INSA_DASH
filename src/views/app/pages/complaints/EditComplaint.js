import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function EditComplaint() {
    
  return (
    <div>
      <div>
        <div className="bg-inherit pt-5">
          <div className="w-95 d-flex justify-content-center">
            <div
              className=" text-white b-2 h-20 pl-4 pt-2 d-flex justify-content-start"
              style={{
                background: "linear-gradient(60deg, #2B009F, #100052)",
                borderRadius: "5px",
                width: "97%",
                marginTop: "-25px",
                marginBottom: "-25px",
                paddingBottom: "-17px",
              }}
            ><FontAwesomeIcon className="mt-2" icon={faArrowLeft} size="lg" style={{cursor:"pointer"}} onClick={() => window.history.back()} /> <span className="h5 ml-2 mt-1">Edit Complaint</span>
            </div>
          </div>
          <div className="pt-5 px-5 d-flex bg-white shadow">
              <div className="w-50 bg-primary text-center py-1" style={{cursor:"pointer"}}>
                <h4>Assign to User</h4>
              </div>
              <div className="w-50 bg-danger text-center py-1" style={{cursor:"pointer"}}>
                <h4>Assign to Expert</h4>
              </div>
          </div>
          <div className="container bg-white py-4">
            <div className="row">
                <div className="col-sm-3">
                    <label>Assign To</label>
                    <input type={"text"} disabled className="form-control" />
                </div>
                <div className="col-sm-3">
                    <label>Wave off</label>
                    <input className="form-control" disabled />
                </div>
                <div className="col-sm-3">
                    <label>Policy Number</label>
                    <input className="form-control" disabled />
                </div>
                <div className="col-sm-3">
                    <label>Insurance Company</label>
                    <input className="form-control" disabled />
                </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <label>Policy Type</label>
                <input className="form-control" disabled />
              </div>
              <div className="col-sm-3">
                <label>Father's Name</label>
                <input className="form-control" disabled />
              </div>
              <div className="col-sm-3">
                <label>Holder's Name</label>
                <input className="form-control" disabled />
              </div>
              <div className="col-sm-3">
                <label>Mobile</label>
                <input className="form-control" disabled type={"number"} />
              </div>
            </div>
            <div className="row">
            <div className="col-sm-3">
                <label>Email</label>
                <input className="form-control" disabled />
              </div>
              <div className="col-sm-3">
                <label>Date of Birth</label>
                <input className="form-control" disabled />
              </div>
              <div className="col-sm-3">
                <label>Amount to be Paid</label>
                <input className="form-control" disabled type={"number"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditComplaint;
