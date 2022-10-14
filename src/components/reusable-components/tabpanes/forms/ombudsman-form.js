//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { 
        calledCustForRewardStatus,
        hearingComment,
        ombudsmanLocation, 
        ombudsmanPendingReason, 
        resolutionType, 
    } from 'constants/formValues';


export default function OmbudsmanForm ({ heading }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);

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
                     //formvalues fetched from api will be stored here
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

                                <h6>Complaint Data</h6><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Complaint Date</Label>
                                            <FormikDatePicker
                                                name="ombudsmanComplaintDate"
                                                value={values.ombudsmanComplaintDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Recent Date</Label>
                                            <FormikDatePicker
                                                name="ccRecentDate"
                                                value={values.ccRecentDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Date</Label>
                                            <FormikDatePicker
                                                name="ccDate"
                                                value={values.ccDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Recent Number</Label>
                                            <Field className="form-control" name="ccRecentNo" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Form Pushed Date</Label>
                                            <FormikDatePicker
                                                name="cpFormPushDate"
                                                value={values.cpFormPushDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Numbers</Label>
                                            <Field className="form-control" name="ccNumbers" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Complaint Number</Label>
                                            <FormikDatePicker
                                                name="form6APushDate"
                                                value={values.form6APushDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <h6>Form 6A Data</h6><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A Pushed Date</Label>
                                            <FormikDatePicker
                                                name="form6aPushedDate"
                                                value={values.form6aPushedDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A Received Date</Label>
                                            <FormikDatePicker
                                                name="form6aReceivedDate"
                                                value={values.form6aReceivedDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A submission date</Label>
                                            <FormikDatePicker
                                                name="form6aSubmissionDate"
                                                value={values.form6aSubmissionDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A Courier Date</Label>
                                            <FormikDatePicker
                                                name="form6aCourierDate"
                                                value={values.form6aCourierDate}
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
                                            <Label className="d-block">Form 6A Courier Number</Label>
                                            <Field className="form-control" name="form6aCourierNo" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <br />
                                            <FormikCheckbox
                                                name="isForm6AThroughMail"
                                                value={values.isForm6AThroughMail}
                                                label="Form 6A through Mail"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Location</Label>
                                            <select name="ombudsmanLocation"
                                                    className="form-control"
                                                    value={values.ombudsmanLocation}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {ombudsmanLocation.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <h6>Ombudsman hearing date and time</h6><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Date 1st</Label>
                                            <FormikDatePicker
                                                name="firstHearingDate"
                                                value={values.firstHearingDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Date 2nd</Label>
                                            <FormikDatePicker
                                                name="secondHearingDate"
                                                value={values.secondHearingDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Call between Expert and Customer Date</Label>
                                            <FormikDatePicker
                                                name="callDate"
                                                value={values.callDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Hearing Comment</Label>
                                            <select name="hearingComment"
                                                    className="form-control"
                                                    value={values.hearingComment}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {hearingComment.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Called Customer or Not to Check Reward Status</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="calledCustForRewardStatus"
                                                id="calledCustForRewardStatus"
                                                label="Which of these?"
                                                value={values.calledCustForRewardStatus}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={calledCustForRewardStatus}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Reward Date</Label>
                                            <FormikDatePicker
                                                name="ombudsmanRewardDate"
                                                value={values.ombudsmanRewardDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Award Non Compliance Sent Date</Label>
                                            <FormikDatePicker
                                                name="callDate"
                                                value={values.callDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Resolution Type</Label>
                                            <select name="resolutionType"
                                                className="form-control"
                                                value={values.resolutionType}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {resolutionType.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form row */}
                                <Row className='mb-3'>
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Pending Reason</Label>
                                            <select name="ombudsmanPendingReason"
                                                className="form-control"
                                                value={values.ombudsmanPendingReason}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {ombudsmanPendingReason.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Ombudsman Pending Reason Listing</Label>
                                            <Input type="textarea" rows="2" name="ombudsmanPendingReason" id="ombudsmanPendingReason" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Expert Important Points for Hearing</Label>
                                            <Input type="textarea" rows="2" name="expImpPoints" id="expImpPoints" />
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

