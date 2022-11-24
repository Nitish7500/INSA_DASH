import {
  BOT_TRANSCRIPT_ADD_COMMENT,
  BOT_TRANSCRIPT_ADD_COMMENT_FAILED,
  BOT_TRANSCRIPT_ADD_COMMENT_SUCCESS,
  BOT_TRANSCRIPT_COMMUNICATION,
  BOT_TRANSCRIPT_COMMUNICATION_FAILED,
  BOT_TRANSCRIPT_COMMUNICATION_SUCCESS,
  BOT_TRANSCRIPT_MAKE_CALL,
  BOT_TRANSCRIPT_MAKE_CALL_SUCCESS,
  GET_TRANSCRIPT_DATA,
  GET_TRANSCRIPT_DATA_FAILED,
  GET_TRANSCRIPT_DATA_SUCCESS,
} from "./Action";

const initialState = {
  botTranscriptData: [],
  botTranscriptCommuniaction: {},
  botTranscriptComment: [],
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSCRIPT_DATA:
      return { ...state };

    case GET_TRANSCRIPT_DATA_SUCCESS:
      return { ...state, botTranscriptData: action.data };

    case GET_TRANSCRIPT_DATA_FAILED:
      return { ...state, message: action.message };

    case BOT_TRANSCRIPT_MAKE_CALL:
      return { ...state };

    case BOT_TRANSCRIPT_MAKE_CALL_SUCCESS:
      return { ...state };

    case BOT_TRANSCRIPT_COMMUNICATION:
      return { ...state };

    case BOT_TRANSCRIPT_COMMUNICATION_SUCCESS:
      return { ...state, botTranscriptCommuniaction: action.data };

    case BOT_TRANSCRIPT_COMMUNICATION_FAILED:
      return { ...state, message: action.message };

    case BOT_TRANSCRIPT_ADD_COMMENT:
      return { ...state };

    case BOT_TRANSCRIPT_ADD_COMMENT_SUCCESS:
      return { ...state, botTranscriptComment: action.data };

    case BOT_TRANSCRIPT_ADD_COMMENT_FAILED:
      return { ...state, message: action.message };

    default:
      return { ...state };
  }
};
