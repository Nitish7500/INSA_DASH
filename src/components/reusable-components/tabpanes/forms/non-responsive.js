import { Colxx } from "components/common/CustomBootstrap";
import {
  FormikCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikDatePicker,
} from "containers/form-validations/FormikFields";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { faDownload, faDownLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  movementOfCase,
  nonResponsiveCustomerFlow,
} from "constants/formValues";
import { useEffect } from "react";
import {
  getNonResFlow,
  inactiveFlowFunc,
  updateNonResflow,
} from "services/complaints.services";
import { currentUser } from "constants/defaultValues";
import moment from "moment";

export default function NonResponsive({ heading, details }) {
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [nonResData, setnonResData] = useState([]);
  const [formData, setformData] = useState({
    calledBy: "Admin",
    calledDate: "",
    commentAdded: "",
    commentAddedOther: "",
  });

  const getNonFlowDataFunc = () => {
    getNonResFlow(details.userId?._id).then((res) => {
      if (res.status === 200) {
        setnonResData(res.data);
      }
    });
  };

  useEffect(() => {
    getNonFlowDataFunc();
  }, [1]);

  const handleUpdateData = () => {
    if (formData.calledDate && formData.commentAdded) {
      updateNonResflow({
        allCalledDate: formData,
        complaintId: details._id,
        updatingUser: currentUser.data?.userType,
        userId: details.userId?._id,
      }).then((res) => {
        if (res.status) {
          setformData({ ...formData, calledDate: "", commentAdded: "" });
        }
        getNonFlowDataFunc();
      });
    }
  };

  const handleInactive = () => {
    inactiveFlowFunc({
      booleanVal: false,
      userId: details.userId?._id,
    }).then((res) => {
      console.log(res);
      getNonFlowDataFunc();
    });
  };

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">{heading}</h2>
          <div>
            <button
              className="btn btn-danger py-1 text-bold rounded"
              onClick={handleInactive}
            >
              INACTIVE
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <label className="">Called Data</label>
              <input
              id="nonResCalledDt"
                name="calledDate"
                type={"date"}
                className="form-control border-bold"
                value={formData.calledDate}
                onChange={(e) => {
                  setformData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="col-sm-6">
              <label>No Response Section</label>
              <select
              id="nonResNoResSec"
                name="commentAdded"
                className="form-control border-bold"
                value={formData.commentAdded}
                onChange={(e) => {
                  setformData({ ...formData, [e.target.name]: e.target.value });
                }}
                // onBlur={handleBlur}
              >
                {nonResponsiveCustomerFlow.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-start">
            <button
              id="nonResSubBtn"
              className="btn btn-primary my-3 rounded"
              onClick={handleUpdateData}
            >
              Submit
            </button>
          </div>
        </div>
        <hr />
        {nonResData.activeInactive && (
          <>
            <div className="mt-4">
              <h4>All Calling Count History</h4>
              <table className="table table-responsive-sm table-bordered mt-3">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>First Called Date</th>
                    <th>Mailing Omd Counter</th>
                    <th>Calling Counter</th>
                    <th>Done By Admin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {moment(nonResData.firstCalledDate).format("YYYY_MM_DD")}
                    </td>
                    <td>{nonResData.mailOmdCounter}</td>
                    <td>{nonResData.callingCounter}</td>
                    <td>{nonResData.doneByAdmin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <h4>All Called Dates</h4>
              <table className="table table-responsive-sm table-bordered mt-3">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Called Date</th>
                    <th>Called By</th>
                    <th>Comment By</th>
                    <th>Comment Added Other</th>
                  </tr>
                </thead>
                <tbody>
                  {nonResData.allCalledDate?.length &&
                    nonResData.allCalledDate?.map((res, i) => {
                      return (
                        <tr key={i}>
                          <td>{moment(res.calledDate).format("YYYY-MM-DD")}</td>
                          <td>{res.calledBy}</td>
                          <td>{res.commentAdded}</td>
                          <td>{res.commentAddedOther}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
