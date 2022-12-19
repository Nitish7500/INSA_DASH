//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { formatDate } from 'helpers/CommonHelper';
import moment from 'moment';

export default function IGMSForm ({ heading, details, complaintId, handleFormChange }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // console.log(details);

    const {IGMS_Token, IGMS_date, escalation_date, IGMSLoginDOB, IGMS_Done, IGMS_No, response_date_igms, response_date_igms1, igmsResponseReceived, igmsRequirementReceived, igms_content, response_data_igms, response_data2_igms} = details;

    const escalationDate = (escalation_date != undefined) ? new Date(escalation_date) : null;
    const igmsDate = (IGMS_date != undefined) ? new Date(IGMS_date) : null;

    // console.log(new Date(response_date_igms));


    // const onSubmit = (values, { setSubmitting }) => {
    //     const payload = {
    //       ...values,
    //       reactSelect: values.reactSelect.map((t) => t.value),
    //     };
    //     setTimeout(() => {
    //       console.log(JSON.stringify(payload, null, 2));
    //       setSubmitting(false);
    //     }, 1000);
    // };

    return (
        <Card>
            <CardBody>
                <h2 className="mb-4">{heading}</h2>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-3'>
                            <label>IGMS Token Number</label>
                            <input id='igmsToken' className='form-control' type={"text"} name="IGMS_Token" value={details.IGMS_Token} onChange={handleFormChange} />
                        </div>
                        <div className='col-sm-3'>
                            <label>IGMS Date</label>
                            {console.log(details.IGMS_date)}
                            <input id='igmsData' className='form-control' type={"date"} name="IGMS_date" value={details.IGMS_date ? moment(details.IGMS_date).format("YYYY-MM-DD") : ""} onChange={handleFormChange} />
                        </div>
                        <div className='col-sm-3'>
                            <label>IGMS Escalation Date</label>
                            <input id='igmsEsc' className='form-control' type={"date"} name="escalation_date" value={details.escalation_date ? moment(details.escalation_date).format("YYYY-MM-DD") : ""} onChange={handleFormChange} />
                        </div>
                        <div className='col-sm-3'>
                            <label>IGMS Login DOB</label>
                            <input id='igmsLoginDob' className='form-control' type={"date"} name="IGMSLoginDOB"  value={details.IGMSLoginDOB ? moment(details.IGMSLoginDOB).format("YYYY-MM-DD") : ""} onChange={handleFormChange} />
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-sm-3'>
                            <label>IGMS Done By</label>
                            <select id='igmsDoneBy' className='form-control' name="IGMS_Done"  value={details.IGMS_Done} onChange={handleFormChange} >
                                
                                <option value="PAN-No">Pan No.</option>
                                <option value="Mobile-No">Mobile No.</option>
                                <option value="LandLine-No">Landline No.</option>
                                <option value="Voter-ID-No">Voter ID card number</option>
                                <option value="Ration-Card-No">Ration Card No.</option>
                                <option value="Passport-No">Passport No.</option>
                                <option value="DOB">Date of Birth</option>
                            </select>
                        </div>
                        <div className='col-sm-3'>
                            <label>First Response date from IGMS</label>
                            <input
                            id='igmsFstResDate'
                          type="date"
                          class="form-control"
                          value={details.response_date_igms ? moment(details.response_date_igms).format("YYYY-MM-DD") : ""}
                          name="response_date_igms"
                          onChange={handleFormChange}
                        />
                        </div>
                        <div class="col-sm-3">
                      <label>Second Response date from IGMS</label>
                      <div class="input-group">
                        <input
                        id='igmsSecDate'
                          type="date"
                          class="form-control"
                          value={details.response_date_igms1 ? moment(details.response_date_igms1).format("YYYY-MM-DD") : ""}
                          name="response_date_igms1"
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <label>IGMS Escalation Date</label>
                      <div class="input-group">
                        <input
                        id='igmsEscDate'
                          type="date"
                          class="form-control"
                          value={details.escalation_date ? moment(details.escalation_date).format("YYYY-MM-DD") : ""}
                          name="escalation_date"
                          onChange={handleFormChange}
                          placeholder="Response Date..."
                        />
                      </div>
                    </div>
                    </div>
                    <div className='row mt-4'>
                    <div class="col-sm-3 d-flex">
                      <label>Response Received</label>
                      <div class=" ml-3 mt-1">
                        <input
                        id='igmsResRec'
                          type="checkbox"
                          class="form-control"
                          value={details.igmsResponseReceived}
                          name="igmsResponseReceived"
                          onChange={handleFormChange}
                          placeholder="Response Date..."
                        />
                      </div>
                    </div>
                    <div class="col-sm-3 d-flex">
                      <label>Requirement Received</label>
                      <div class="ml-3 mt-1">
                        <input
                        id='igmsReqRec'
                          type="checkbox"
                          class="form-control"
                          value={details.igmsRequirementReceived}
                          name="igmsRequirementReceived"
                          onChange={handleFormChange}
                          placeholder="Response Date..."
                        />
                      </div>
                    </div>
                    </div>
                    <div className='row mt-4'>
                    <div class="col-sm-12">
                      <label>IGMS Content</label>
                      <div class="input-group">
                        <textarea
                        rows={5}
                        id="igmsContent"
                          type="textarea"
                          class="form-control"
                          value={details.igms_content}
                          name="igms_content"
                          onChange={handleFormChange}
                          placeholder="Response Data..."
                        />
                      </div>
                    </div>
                    </div>
                    <div class="row mt-4">
                    <div class="col-sm-12">
                      <label>Response Data From IGMS</label>
                      <div class="input-group">
                        <textarea
                        rows={5}
                        id="igmsResData"
                          type="textarea"
                          class="form-control"
                          value={details.response_data_igms}
                          name="response_date_igms"
                          onChange={handleFormChange}
                          placeholder="Response Data..."
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-sm-12">
                      <label>Second Response Data From IGMS</label>
                      <div class="input-group">
                        <textarea
                        rows={5}
                        id="igmSecRes"
                          type="textarea"
                          class="form-control"
                          value={details.response_data2_igms}
                          name="response_data2_igms"
                          onChange={handleFormChange}
                          placeholder="Response Data..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </CardBody>
        </Card>
    )
}

