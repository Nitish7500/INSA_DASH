import React from "react";

function UserReport() {
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
          <h5 className="mt-2">User Report Data Section</h5>
        </div>
      </div>
      <div
        className="bg-white shadow p-3 mb-5 bg-white"
        style={{ borderRadius: "5px" }}
      >
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-8">
                    <label className="font-weight-bold">Search SMS Data</label>
                    <input className="form-control border-bold" placeholder="Search by Mobile Number" />
                    <button className="btn btn-primary mt-2">Submit</button>
                </div>
                
            </div>
        </div>
      </div>
    </div>
  );
}

export default UserReport;
