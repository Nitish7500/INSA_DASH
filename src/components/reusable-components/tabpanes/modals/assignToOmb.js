import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  assignOmbudsman,
  assignToOmbPostFunc,
} from "services/complaints.services";

function AssignToOmb({ isOpen, onClose, details }) {
  const [ombdData, setombdData] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (isOpen) {
      assignOmbudsman().then((res) => {
        console.log(res);
        setombdData(res.data);
      });
    }
  }, [isOpen]);

  const handleSave = () => {
    if (user && details._id) {
      assignToOmbPostFunc({ assignToOmbudsman: user, id: details._id }).then(
        (res) => {
          if (res.success) {
            onClose();
            NotificationManager.success(
              res.message,
              "Assign To Ombudsman Successfully !!",
              3000,
              null,
              null,
              "filled"
            );
            setUser("")
          }
        }
      );
    } else {
      NotificationManager.error(
        "Please Select User",
        "Please Select Ombudsman !",
        3000,
        null,
        null,
        "filled"
      );
      onClose()
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose} size="lg">
        <div className="d-flex w-100 justify-content-between p-4 border-bottom">
          <h2 className="mb-0 ml-3">Case Assign To Ombudsman</h2>
          <div
            onClick={onClose}
            style={{ fontSize: "22px", marginRight: "20px" }}
          >
            <i className="simple-icon-close" />
          </div>
        </div>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <label>Assign to Ombudsman</label>
                <select
                  className="form-control border-bold"
                  onChange={(e) => setUser(e.target.value)}
                >
                  <option value={""}>Select User</option>
                  {ombdData?.map((res) => {
                    return <option value={res.user_id}>{res.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-primary rounded px-5 py-2"
                onClick={handleSave}
              >
                SAVE
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AssignToOmb;
