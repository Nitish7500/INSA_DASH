import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  faPencil,
  faPhone,
  faFileZipper,
  faFile,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";

const BotTranscript = ({ intl, match }) => {
  const [open, setOpen] = useState(false);
  const [openHistory, setopenHistory] = useState(false);
  const [historyArr, sethistoryArr] = useState([]);
  const [botTranscriptId, setbotTranscriptId] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log({ state });
  useEffect(() => {
    dispatch({ type: "GET_TRANSCRIPT_DATA" });
  }, [1]);

  const addCommentHandler = (id) => {
    console.log(id);
    setbotTranscriptId(id);
    dispatch({
      type: "BOT_TRANSCRIPT_COMMUNICATION",
      state: { botTranscriptId: id },
    });
  };

  const toggle = () => {
    setOpen(!open);
  };

  const historyToggle = () => {
    setopenHistory(false);
  };

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
    }
  };

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
          <span className="h5">Bot Transcript List</span>
        </div>
      </div>
      <div
        className="bg-white shadow p-3 mb-5 bg-white"
        style={{ borderRadius: "5px" }}
      >
        <div className="table-responsive">
          <table className="table table-borderless mt-5">
            <thead>
              <tr>
                <th className="display-5">Call the Customer</th>
                <th>Ticket ID</th>
                <th>Customer Number</th>
                <th>Chat Source</th>
                <th>Customer Name</th>
                <th>Last Message Date</th>
                <th>Assignment Status</th>
                <th>Agent Name</th>
                <th>Agent Number</th>
                <th>Add Comment</th>
                <th>Chat Transcript</th>
                <th>Chat History</th>
              </tr>
            </thead>
            <tbody>
              {state.botTranscript ? (
                state.botTranscript?.botTranscriptData?.map((res) => {
                  return (
                    <tr>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            dispatch({
                              type: "BOT_TRANSCRIPT_MAKE_CALL",
                              state: {
                                agent_number: `+91${res.agentNumber}`,
                                customer_number: `+91${res.phone}`,
                                caller_id: "+918035338514",
                              },
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faPhone} />
                        </button>
                      </td>
                      <td>{res.botTranscript?.ticket}</td>
                      <td>{res.phone}</td>
                      <td>{res.botTranscript?.src}</td>
                      <td>{res.name}</td>
                      <td>{res.botTranscript?.latestMsgDate}</td>
                      <td>{res.assignmentStatus}</td>
                      <td>{res.agentName}</td>
                      <td>{res.agentNumber}</td>
                      <td>
                        <a
                          href="#myModal"
                          role="button"
                          class="btn"
                          data-toggle="modal"
                        >
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            color="#9c27b0"
                            fontSize={"1.2rem"}
                            icon={faPencil}
                            onClick={() => {
                              setOpen(true);
                              addCommentHandler(res._id);
                            }}
                          />
                        </a>
                      </td>
                      <td>
                        <a
                          href={`${res.botTranscript?.transcriptUrl}`}
                          target="_blank"
                        >
                          <FontAwesomeIcon
                            color="#9c27b0"
                            fontSize={"1.2rem"}
                            icon={faFile}
                          />
                        </a>
                      </td>
                      <td>
                        <a href="#">
                          <FontAwesomeIcon
                            color="#9c27b0"
                            fontSize={"1.2rem"}
                            icon={faHistory}
                            onClick={() => {
                              setopenHistory(true);
                              sethistoryArr(res.botTranscriptHistory);
                            }}
                          />
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center">No Data</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={open} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Query Communications</ModalHeader>
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
            {state.botTranscript?.botTranscriptCommuniaction ? (
              state.botTranscript?.botTranscriptCommuniaction?.communicationData?.map(
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
      <Modal isOpen={openHistory} toggle={historyToggle} size="lg">
        <ModalHeader toggle={historyToggle}>
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
            {historyArr.length
              ? historyArr.map((res) => {
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
};

export default injectIntl(BotTranscript);
