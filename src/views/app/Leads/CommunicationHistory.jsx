import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "helpers/Utils";
import {useHistory} from "react-router-dom"

function CommunicationHistory() {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
    id: "",
  });
  const [currComment, setcurrComment] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory()
  const state = useSelector((state) => state.leadReducer);
  console.log(location, state);
  const { name, email, phone, leadId, communication, _id } = location.state;

  useEffect(() => {
    dispatch({ type: "LEAD_FETCH_BY_ID", state: { id: _id } });
  }, [_id]);

  return (
    <div className="bg-inherit pt-5">
      <div className="w-95 d-flex justify-content-center">
        <div
          className=" text-white b-2 h-20 pl-4 pt-2 d-flex justify-content-between flex-wrap"
          style={{
            background: "linear-gradient(60deg, #2B009F, #100052)",
            borderRadius: "5px",
            width: "97%",
            marginTop: "-25px",
            marginBottom: "-25px",
            paddingBottom: "-17px",
          }}
        >
          <div className="">
            <span className="h5">Communication List</span>
            <p className="text-muted font-weight-bold mt-2">
              List of available
            </p>
          </div>
          <div className="mr-2 text-right ml-auto">
            <button className="btn btn-sm mb-1 btn-success py-1" onClick={() => history.push("/app/leads")} >
              BACK TO LEADS
            </button>
            <br />
            <button className="btn btn-sm mb-1 btn-success py-1">
              BACK TO EXPORT
            </button>
            <br />
            <button
              className="btn btn-sm mb-1 btn-success py-1"
              onClick={() => {
                setComment({ comment: "", id: "" });
                setOpen(true);
              }}
            >
              ADD COMMENT
            </button>
          </div>
        </div>
      </div>
      <div
        className="bg-white shadow p-3 mb-5 bg-white pt-5"
        style={{ borderRadius: "5px" }}
      >
        <div className="d-flex">
          <div className="w-25 px-1">
            <span className="h4 font-weight-light">Name :-</span>
            <span id="leadCommHirName" className="h4">
              {name}
            </span>
          </div>
          <div className="w-25 px-1">
            <span className="h4 font-weight-light">Email :-</span>
            <span id="leadCommHirName" className="h4">
              {email}
            </span>
          </div>
          <div className="w-25 px-1">
            <span className="h4 font-weight-light">Phone :-</span>
            <span id="leadCommHirName" className="h4">
              {phone}
            </span>
          </div>
          <div className="w-25 px-1">
            <span className="h4 font-weight-light">LeadId :-</span>
            <span id="leadCommHirName" className="h4">
              {leadId}
            </span>
          </div>
        </div>
        <hr />
        <div className="teble-responsive">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Communication Date</th>
                  <th>Communication By</th>
                  <th>Description</th>
                  <th>Action</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {state?.fetchedLead?.communication?.length ? (
                  state?.fetchedLead?.communication.map((res) => {
                    return (
                      <tr>
                        <td>{res?.com_date}</td>
                        <td>{res?.com_by}</td>
                        <td>{res?.com_dis}</td>
                        <td>
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setOpen(true);
                              setcurrComment(res);
                              setComment({
                                comment: res.com_dis,
                                id: res?._id,
                              });
                            }}
                            icon={faPencil}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div>
          <div className="d-flex">
            <span className="h5 mr-5 font-weight-light">Sat Nov 26 2022 I</span>
            <span className="h5 mr-5 font-weight-light">
              INSA_SATYAM1668752791403
            </span>
            <span className="h5 text-primary">
              <FontAwesomeIcon icon={faPencil} />
            </span>
          </div>
        </div> */}
      </div>
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(false);
        }}
        size=""
      >
        <ModalHeader
          className="py-3 text-primary"
          toggle={() => {
            setOpen(false);
          }}
        >
          Comment Details
        </ModalHeader>
        <ModalBody>
          {/* <span className="h6">Confirmation</span> */}
          <div className="container">
            <div className="row">
              <h6 className="col-12 p-0">Communication Description</h6>
              <div className="d-block col-12 p-0">
                {/* <select className="w-90 mb-3" value>
                <option></option>
                <option>Other</option>
              </select> */}
              </div>
              <textarea
                id="inputOnRejectionLead"
                className="col-10 d-block p-2 form-control border"
                rows={4}
                value={comment?.comment}
                onChange={(e) =>
                  setComment({ ...comment, comment: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                id="rejectionNoBtn"
                className="btn btn-danger rounded mr-2"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                id="rejectionYesBtn"
                className="btn btn-primary rounded ml-2"
                onClick={() => {
                  comment?.id
                    ? dispatch({
                        type: "LEAD_COMM_HISTORY_UPDATE_COMMENT",
                        state: {
                          ...currComment,
                          com_dis: comment?.comment,
                          comm_id: currComment._id,
                          lead_id: _id,
                        },
                      })
                    : dispatch({
                        type: "LEAD_COMM_HISTORY_ADD_COMMENT",
                        state: {
                          com_by: "Admin",
                          com_dis: comment?.comment,
                          id: _id,
                          userType: getCurrentUser()?.data?.userType,
                        },
                      });
                  ("");
                  setOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CommunicationHistory;
