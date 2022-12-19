import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function ChatHistory({isOpen, onClose, data}) {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose} size="lg">
        <ModalHeader toggle={onClose}>
          {" "}
          <sapn className="h5"> Chat Transcript</sapn>
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
                    <>
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
                    </>
                  );
                })
              : "No History Data"}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ChatHistory;
