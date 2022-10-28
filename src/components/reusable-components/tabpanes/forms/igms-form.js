//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { formatDate } from 'helpers/CommonHelper';

export default function IGMSForm ({ heading, details, complaintId }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // console.log(details);

    const {IGMS_Token, IGMS_date, escalation_date, IGMSLoginDOB, IGMS_Done, IGMS_No, response_date_igms, response_date_igms1, igmsResponseReceived, igmsRequirementReceived, igms_content, response_data_igms, response_data2_igms} = details;

    const escalationDate = new Date(escalation_date);
    const igmsDate = formatDate(IGMS_date);

    console.log(new Date(response_date_igms));


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
                <Formik initialValues={{
                    igmsTokenNo: IGMS_Token ? IGMS_Token : '',
                    igmsdate: igmsDate ? igmsDate : null,
                    igmsEscalationDate: escalationDate ? escalationDate : null,
                    igmsLoginDob: IGMSLoginDOB ? new Date(IGMSLoginDOB) : null,
                    igmsDoneBy: IGMS_Done ? IGMS_Done : null,
                    firstResponseFromIGMSDate: response_date_igms ? new Date(response_date_igms) : null,
                    secondResponseFromIGMSDate: response_date_igms1 ? new Date(new Date(response_date_igms)) : null,
                    secondIgmsEscalationDate: escalationDate ? escalationDate : null,
                    isResponseRecieved: igmsResponseReceived ? igmsResponseReceived : '',
                    isRequirementRecieved: igmsRequirementReceived ? igmsRequirementReceived : '',
                    igmsContent: igms_content ? igms_content : '',
                    resDataIgms: response_data_igms ? response_data_igms : '',
                    secondResDataIgms: response_data2_igms ? response_data2_igms : '',   
                }}
                    // validationSchema={SignupSchema}
                    // onSubmit={onSubmit}
                >
                {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur,
                    values
                }) => (
                    <Form className="av-tooltip tooltip-label-right">
                        <Row className="mb-4">
                            <Colxx xxs="12" lg="12" className="mb-5">

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">IGMS Token Number</Label>
                                            <Field className="form-control" name="igmsTokenNo" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">IGMS Date</Label>
                                            <FormikDatePicker
                                                name="igmsdate"
                                                value={values.igmsdate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">IGMS Escalation Date</Label>
                                            <FormikDatePicker
                                                name="igmsEscalationDate"
                                                value={values.igmsEscalationDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">IGMS Login DOB</Label>
                                            <FormikDatePicker
                                                name="igmsLoginDob"
                                                value={values.igmsLoginDob}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">IGMS Done By</Label>
                                            <Field className="form-control" name="igmsDoneBy" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">First Response date from IGMS</Label>
                                            <FormikDatePicker
                                                name="firstResponseFromIGMSDate"
                                                value={values.firstResponseFromIGMSDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Second Response date from IGMS</Label>
                                            <FormikDatePicker
                                                name="secondResponseFromIGMSDate"
                                                value={values.secondResponseFromIGMSDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">IGMS Escalation Date</Label>
                                            <FormikDatePicker
                                                name="secondIgmsEscalationDate"
                                                value={values.secondIgmsEscalationDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-150">
                                            <FormikCheckbox
                                                name="isResponseRecieved"
                                                value={values.isResponseRecieved}
                                                label="Response Recieved"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-150">
                                            <FormikCheckbox
                                                name="isRequirementRecieved"
                                                value={values.isRequirementRecieved}
                                                label="Requirement Recieved"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>IGMS Content</Label>
                                            <Input type="textarea" rows="2" name="igmsContent" id="igmsContent" value={values.igmsContent}/>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Response Data From IGMS</Label>
                                            <Input type="textarea" rows="2" name="resDataIgms" id="resDataIgms" value={values.resDataIgms} />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Second Response Data From IGMS</Label>
                                            <Input type="textarea" rows="2" name="secondResDataIgms" id="secondResDataIgms" value={values.secondResDataIgms} />
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                            
                            </Colxx>
                            {/* Wrapping Column ends */}
                            <Colxx xxs="12" lg="12" className="text-center">
                                <Button color="primary" type="submit">
                                    Submit
                                </Button>
                            </Colxx>
                        </Row>
                    </Form>
                )}
                </Formik>
            </CardBody>
        </Card>
    )
}

