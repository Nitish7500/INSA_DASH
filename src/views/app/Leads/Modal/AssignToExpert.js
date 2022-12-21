import React from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function AssignToExpert({ isOpen, onClose, details }) {
  let state = useSelector((state) => state.leadReducer);
  let dispatch = useDispatch();

  const [assignToExpert, setassignToExpert] = useState({
    assignTo: "",
    id: "",
  });

  useEffect(() => {
    setassignToExpert({
      assignTo: details.assign_to_expert ? details.assign_to_expert : "",
      id: details._id ? details._id : "",
    });
  }, [details, isOpen]);

  const handleSubmit = () => {
    onClose();
    dispatch({
      type: "LEAD_ASSIGN_EXPERT_SAVE",
      state: assignToExpert,
    });
    dispatch({
      type: "LEAD_DATA_WITH_STATUS",
      state: {
        status: "PENDING",
        pageIndex: 0,
        pageSize: 50,
        keyword: "",
      },
    });
  };

  const { assignTo } = assignToExpert;

  return (
    <div>
      <Modal
        id="leadAssignToExpertModal"
        isOpen={isOpen}
        toggle={onClose}
        size=""
      >
        <ModalHeader className="py-3 text-primary" toggle={onClose}>
          Lead Assign to Expert
        </ModalHeader>
        <ModalBody>
          <span className="h6">Policy Number</span>
          <div className="container">
            <div className="row">
              <select
                id="assignExpertModal"
                value={assignTo}
                className="w-80 mt-3 py-2"
                onChange={(e) =>
                  setassignToExpert({
                    ...assignToExpert,
                    assignTo: e.target.value,
                  })
                }
              >
                <option disabled>Select User</option>
                {state.assignExpert?.map((res) => {
                  return <option value={res.user_id}>{res.name}</option>;
                })}
              </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                id="closeAssignExpertModal"
                className="btn btn-danger rounded mr-2"
                onClick={onClose}
              >
                Close
              </button>
              <button
                id="saveAssignExpertBtn"
                className="btn btn-primary rounded ml-2"
                onClick={handleSubmit}
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

export default AssignToExpert;
