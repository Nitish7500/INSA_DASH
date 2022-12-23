import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  faPencil,
  faPhone,
  faFile,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import QueryComm from "./Modal/QueryComm";
import ChatHistory from "./Modal/ChatHistory";
import { NotificationManager } from "components/common/react-notifications";

const BotTranscript = ({ intl, match }) => {
  const [open, setOpen] = useState(false);
  const [openHistory, setopenHistory] = useState(false);
  const [historyArr, sethistoryArr] = useState([]);
  const [botTranscriptId, setbotTranscriptId] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: "GET_TRANSCRIPT_DATA" });
  }, [1]);

  const addCommentHandler = (id) => {
    // console.log(id);
    setbotTranscriptId(id);
    dispatch({
      type: "BOT_TRANSCRIPT_COMMUNICATION",
      state: { botTranscriptId: id },
    });
  };

  useEffect(() => {
    if (state.botTranscript?.message) {
      NotificationManager.success(
        state.botTranscript.message,
        "SuccessFul !",
        3000,
        null,
        null,
        "filled"
      )
    }
  },[state.botTranscript?.message])

  const toggle = () => {
    setOpen(!open);
  };

  const historyToggle = () => {
    setopenHistory(false);
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
                state.botTranscript?.botTranscriptData?.map((res, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <button
                          id={`Btbtn${i}`}
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
                          id={`BTLnk${i}`}
                          href="#myModal"
                          role="button"
                          className="btn"
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
                          id={`BTLnk2${i}`}
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
                        <a id={`BTLnk3${i}`} href="#">
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
      <QueryComm
        isOpen={open}
        onClose={toggle}
        botTranscriptId={botTranscriptId}
      />
      <ChatHistory
        isOpen={openHistory}
        onClose={historyToggle}
        data={historyArr}
      />
    </div>
  );
};

export default injectIntl(BotTranscript);
