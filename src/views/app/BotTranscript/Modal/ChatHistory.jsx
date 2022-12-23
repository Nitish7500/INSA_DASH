import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function ChatHistory({ isOpen, onClose, data }) {
  useEffect(() => {
    if (isOpen) {
      NotificationManager.success(
        "Chat History !",
        "SuccessFul !",
        3000,
        null,
        null,
        "filled"
      );
    }
  }, [isOpen]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose} size="lg">
        <ModalHeader toggle={onClose}>
          {" "}
          <span className="h5"> Chat Transcript</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <span className="display-5 font-weight-bold">Ticket ID</span>
              </div>
              <div className="col-sm-3">
                <span className="display-5 font-weight-bold">Chat Source</span>
              </div>
              <div className="col-sm-3">
                <span className="display-5 font-weight-bold">
                  Last Message Date
                </span>
              </div>
              <div className="col-sm-3">
                <span className="display-5 font-weight-bold">Chat History</span>
              </div>
            </div>
            <hr />
            {data.length
              ? data.map((res, i) => {
                  return (
                    <div key={i+100}>
                      <div className="row">
                        <div className="col-sm-3">
                          <span className="display-5">{res.ticket}</span>
                        </div>
                        <div className="col-sm-3">
                          <span className="display-5">{res.src}</span>
                        </div>
                        <div className="col-sm-3">
                          <span className="display-5">{res.latestMsgDate}</span>
                        </div>
                        <div className="col-sm-3">
                          <a
                            id={`BTLN${i}`}
                            href={`${res?.transcriptUrl}`}
                            target="_blank"
                          >
                            <FontAwesomeIcon
                              color="#9c27b0"
                              fontSize={"1.2rem"}
                              icon={faFile}
                            />
                          </a>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })
              : "No History Data"}
              <div className="d-flex justify-content-center">
                    <button className="btn btn-danger rounded"onClick={onClose}>Close</button>
              </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ChatHistory;
