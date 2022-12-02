import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

function DigiLocker() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: "CUSTOMER_ADMIN_ISSUED_DOC",
      state: {
        directory_id: "",
        issuer: "digilocker",
        userId: location.state?._id,
      },
    });
    dispatch({
      type: "CUSTOMER_ADMIN_SELF_DOC",
      state: {
        directory_id: "",
        issuer: "self",
        userId: location.state?._id,
      },
    });
    dispatch({
      type: "CUSTOMER_USER_DOC_LIST",
      state: { userId: location.state?._id },
    });
  }, []);

  return (
    <div>
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
            <span className="h5">User Digilocker Documents</span>
            <h6 className="text-muted">List of Issed Documents</h6>
          </div>
        </div>
        <div
          className="bg-white shadow p-3 mb-5 bg-white"
          style={{ borderRadius: "5px" }}
        >
          <div className="container mt-5">
            <span>NO Issue Document Found</span>
          </div>
        </div>
      </div>
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
            <span className="h5">User Digilocker Documents</span>
            <h6 className="text-muted">List of Self Uploaded Documents</h6>
          </div>
        </div>
        <div
          className="bg-white shadow p-3 mb-5 bg-white"
          style={{ borderRadius: "5px" }}
        >
          <div className="container mt-5"></div>
        </div>
      </div>
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
            <span className="h5">User Digilocker Documents</span>
            <h6 className="text-muted">List of Available Documents</h6>
          </div>
        </div>
        <div
          className="bg-white shadow p-3 mb-5 bg-white"
          style={{ borderRadius: "5px" }}
        >
          <div className="container mt-5">
            <span>NO Issue Document Found</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigiLocker;
