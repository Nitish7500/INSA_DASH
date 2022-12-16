import React from 'react'
import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import {useSelector, useDispatch} from "react-redux"

function AssignToUser({isOpen, onClose}) {

  const dispatch = useDispatch()
  const state = useSelector(state => state.leadReducer)


  const [assignToUser, setassignToUser] = useState({
    assignTo: "",
    id: "",
  });


  return (
    <div>
              <Modal
        id="leadAssignToUserModal"
        isOpen={isOpen}
        toggle={onClose}
        size=""
      >
        <ModalHeader
          className="py-3 text-primary"
          toggle={onClose}
        >
          Lead Assign to Userfdsfd
        </ModalHeader>
        <ModalBody>
          <span className="h6">Policy Number</span>
          <div className="container">
            <div className="row">
              <select
                id="assignDropdownUser"
                value={assignToUser.assignTo}
                className="w-80 mt-3 py-2"
                onChange={(e) =>
                  setassignToUser({ ...assignToUser, assignTo: e.target.value })
                }
              >
                <option disabled>Select User</option>
                {state.assigUser?.map((res) => {
                  return <option value={res.user_id}>{res.name}</option>;
                })}
              </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                id="closeAssignUserModal"
                className="btn btn-danger rounded mr-2"
                onClick={onClose}
              >
                Close
              </button>
              <button
                id="saveAssignUserModal"
                className="btn btn-primary rounded ml-2"
                onClick={() => {
                  onClose();
                  dispatch({
                    type: "LEAD_ASSIGN_USER_SAVE",
                    state: assignToUser,
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
                }}
              >
                Save
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AssignToUser