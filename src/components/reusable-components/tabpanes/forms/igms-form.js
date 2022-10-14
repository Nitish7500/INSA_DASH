//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { choices, complaintDelayReason, draftSentByCustomer, firstResponseType, firstResponseTypes, gender, isAcknowledgementReceived, isCustomerIDRegistered, isFirstEscalationSent, isFirstReminderMailSentToCompany, isFirstResponseFromCompany, isfirstResponseFromCompany, isReminderMailSentToCompany, isRequirementMailRevert, isRequirementMailSent, isSecondReminderMailSentToCompany, isSecondResponseFromCompany, options, secondResponseType } from 'constants/formValues';


export default function IGMSForm ({ heading }) {

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
                    name: 'Yash',
                    email: 'test@test.com',
                    phone: '9453578234',
                    choice: 'Yes'
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
                                            <Input type="textarea" rows="2" name="igmsContent" id="igmsContent" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Response Data From IGMS</Label>
                                            <Input type="textarea" rows="2" name="resDataIgms" id="resDataIgms" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Second Response Data From IGMS</Label>
                                            <Input type="textarea" rows="2" name="secondResDataIgms" id="secondResDataIgms" />
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

