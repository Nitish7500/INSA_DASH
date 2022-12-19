import React from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {useSelector, useDispatch} from "react-redux"

function QueryComm({isOpen, onClose, botTranscriptId}) {
    const [comment, setComment] = useState("");
    let dispatch = useDispatch()
    let state = useSelector(state =>  state.botTranscript?.botTranscriptCommuniaction)
    const sumbitCommentHandler = () => {
        if (comment && botTranscriptId) {
          dispatch({
            type: "BOT_TRANSCRIPT_ADD_COMMENT",
            state: { botTranscriptId: botTranscriptId, comment: comment },
          });
          dispatch({
            type: "BOT_TRANSCRIPT_COMMUNICATION",
            state: { botTranscriptId: botTranscriptId },
          });
          setComment("")
        }
      };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose} size="lg">
        <ModalHeader toggle={onClose}>Query Communications</ModalHeader>
        {/* <hr className="my-0 w-90"></hr> */}
        <ModalBody>
          <h5>Enter New Communication</h5>
          <hr className="my-0 mb-2" />
          <div className="form-group">
            <textarea
              autofocus
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={4}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>

          <button
            id="BTNewCommAdd"
            className="btn btn-success px-5"
            onClick={sumbitCommentHandler}
          >
            ADD
          </button>
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <span className="h5">Communication List</span>
              </div>
              <div className="col-sm-6">
                <span className="h5">Communication Done</span>
              </div>
            </div>
            <hr />
            {state ? (
              state?.communicationData?.map(
                (res) => {
                  return (
                    <div className="row">
                      <div className="col-sm-6">
                        <span className="h5">{res.comment}</span>
                        <hr />
                      </div>
                      <div className="col-sm-6">
                        <span className="h5">{res.date}</span>
                        <hr />
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div className="row">
                <span className="h4">No Data</span>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default QueryComm;
