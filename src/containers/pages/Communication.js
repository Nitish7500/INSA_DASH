import { currentUser } from "constants/defaultValues";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

function Communication() {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  const storage = useSelector((state) => state.complaint);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({
    com_dis: "",
    id: state._id,
    notification_key: false,
    com_date: "",
    com_by: "",
    userType: currentUser?.data?.userType,
  });

  //--------------------------> Comment Edit
  const [editComment, seteditComment] = useState({
    open: false,
    com_dis: "",
  });

  const getCommArr = () => {
    dispatch({
      type: "COMPLAINT_GET_COMMENTS",
      state: { id: state._id },
    });
  };

  useEffect(() => {
    getCommArr();
  }, [state._id]);

  const handleUpdateComment = () => {
    dispatch({
      type: "COMPLAINT_UPDATE_COMMENT",
      state: { ...editComment, insurance_id: state._id },
    });
    seteditComment({ ...editComment, open: false });
    getCommArr();
  };

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
            <button
              className="btn btn-sm mb-1 btn-success py-1"
              onClick={() => history.push("/app/pages/product/data-list")}
            >
              BACK TO COMPLAINTS
            </button>
            <br />
            <button className="btn btn-sm mb-1 btn-success py-1">
              BACK TO REPORT
            </button>
            <br />
            <button
              className="btn btn-sm mb-1 btn-success py-1"
              onClick={() => {
                // setComment({ comment: "", id: "" });
                setOpen(true);
              }}
            >
              ADD COMMENT
            </button>
          </div>
        </div>
      </div>
      <div></div>
      <div
        className="bg-white shadow p-3 mb-5 bg-white pt-5"
        style={{ borderRadius: "5px" }}
      >
        <h1></h1>

        <div>
          <table className="table">
            <thead>
              <tr key={"heading00"}>
                <th>Communication Date</th>
                <th>Communication By</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {storage.comments[0]?.communication?.map((res,i) => {
                return (
                  <tr key={i + 77}>
                    <td>{res.com_date}</td>
                    <td>{res.com_by}</td>
                    <td>{res.com_dis}</td>
                    <td>
                      <FontAwesomeIcon
                      key={i+66}
                        id="complaintEditIcon"
                        icon={faPencil}
                        className="text-primary"
                        size="lg"
                        onClick={() => {
                          seteditComment({
                            ...editComment,
                            open: true,
                            com_dis: res.com_dis,
                            comm_id: res._id,
                            com_date: res.com_date,
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
              <div className=" col-12 my-3 d-flex justify-content-between">
                <span>Do you want to send notification ?</span>
                <input
                id="ComplaintcommCheckbox"
                  type={"checkbox"}
                  onChange={(e) => {
                    setComment({
                      ...comment,
                      notification_key: e.target.checked,
                    });
                  }}
                />
              </div>
              <div className="col-12 mb-3">
                <label>Communication Date</label>
                <input
                id="ComplaintcommDate"
                  className="form-control border-bold"
                  type={"date"}
                  onChange={(e) => {
                    setComment({ ...comment, com_date: e.target.value });
                  }}
                />
              </div>
              <h6 className="col-12 p-0 ml-3">Communication Description</h6>
              <div className="d-block col-12 p-0 ">
                {/* <select className="w-90 mb-3" value>
                <option></option>
                <option>Other</option>
              </select> */}
              </div>
              <textarea
                id="ComplaintcommDes"
                className="col-10 d-block p-2 form-control border ml-3"
                rows={4}
                value={comment?.com_dis}
                onChange={(e) =>
                  setComment({ ...comment, com_dis: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                id="complaintCommClose"
                className="btn btn-danger rounded mr-2"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                id="complaintCommSave"
                className="btn btn-primary rounded ml-2"
                onClick={() => {
                  comment.com_date && comment.com_dis
                    ? dispatch({
                        type: "COMPLAINT_ADD_COMMENT",
                        state: [{ ...comment }],
                      })
                    : null;
                  // console.log(comment);
                  setOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -----------------> EDIT COMMENT MODAL */}
      <Modal
        isOpen={editComment.open}
        toggle={() => {
          seteditComment({ ...editComment, open: !editComment.open });
        }}
      >
        <ModalHeader>Comment Details</ModalHeader>
        <ModalBody>
          <div>
            <label>Communication Description</label>
            <textarea
                id="complaintCommEditDes"
              className="form-control border-bold"
              rows={4}
              value={editComment.com_dis}
              onChange={(e) => {
                seteditComment({ ...editComment, com_dis: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
                id="complaintCommEditClose"
              className="btn btn-danger rounded mr-2"
              onClick={() => {
                seteditComment({ ...editComment, open: false });
              }}
            >
              CLOSE
            </button>
            <button
                id="complaintCommEditSave"
              className="btn btn-success rounded "
              onClick={handleUpdateComment}
            >
              SAVE
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Communication;
