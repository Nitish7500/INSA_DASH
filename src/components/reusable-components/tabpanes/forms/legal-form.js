//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useRef, useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { 
    isLegalNotice,
    isRequirementReceived,
    consumerCourtLocation
    } from 'constants/formValues';
import { faDownload, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tinymce/tinymce-react';
import logs from 'data/logs';
import { tinyMceApiKey } from 'constants/defaultValues';


export default function LegalForm ({ heading }) {

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

    const editorRef = useRef(null);
    const log = (e) => {
        e.preventDefault()
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

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

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100 mb-4">
                                            <Label className="d-block">Legal Notice</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isLegalNotice"
                                                id="isLegalNotice"
                                                label="Which of these?"
                                                value={values.isLegalNotice}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isLegalNotice}
                                            />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Legal Notice Date</Label>
                                            <FormikDatePicker
                                                name="legalNoticeDate"
                                                value={values.legalNoticeDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Approx Fees</Label>
                                            <Field className="form-control" name="approxFees" />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Consumer Court Location</Label>
                                            <select name="consumerCourtLocation"
                                                className="form-control"
                                                value={values.consumerCourtLocation}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {consumerCourtLocation.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Lawyer / Law Firm Name</Label>
                                            <Field className="form-control" name="lawFirmName" />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <br />
                                            <FormikCheckbox
                                                name="isNoticeRemider"
                                                value={values.isNoticeRemider}
                                                label="Notice Reminder"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Courier Number of the Legal Notice</Label>
                                            <Field className="form-control" name="crNoOfLegalNotice" />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Legal Notice response received and date</Label>
                                            <FormikDatePicker
                                                name="legalNoticeResRecDate"
                                                value={values.legalNoticeResRecDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Call to the customer (Date 1)</Label>
                                            <FormikDatePicker
                                                name="callToCustDate1"
                                                value={values.callToCustDate1}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Lawyer / Law Firm Number</Label>
                                            <Field className="form-control" name="lawFirmNo" />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Case Title</Label>
                                            <Field className="form-control" name="caseTitle" />
                                        </FormGroup>
                                    </Colxx>

                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Consumer courts subsequent filing dates</Label>
                                            <FormikDatePicker
                                                name="consumerCourtDates"
                                                value={values.consumerCourtDates}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Call to the customer (Date 2)</Label>
                                            <FormikDatePicker
                                                name="callToCustDate2"
                                                value={values.callToCustDate2}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Lawyer / Law Firm Number</Label>
                                            <Field className="form-control" name="lawFirmNo" />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Case File Number</Label>
                                            <Field className="form-control" name="caseTitle" />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Case Number</Label>
                                            <Field className="form-control" name="caseTitle" />
                                        </FormGroup>
                                    </Colxx>

                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <div className="flex-sb">
                                                <Label className="d-block">Consumer Court Hearing Date</Label>
                                                <Button className='btn-xs' color='warning' onClick={(e)=> e.preventDefault()}>Add</Button>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <div className="flex-sb">
                                                <FormikDatePicker
                                                    name="consumerCourtDates"
                                                    value={values.consumerCourtDates}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                />
                                                <Button color='danger' className='ml-3' onClick={(e)=> e.preventDefault()}>Delete</Button>
                                            </div>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <div className="flex">
                                                <Label className="d-block">Consumer Court Hearing Liners</Label>
                                                <Button className='ml-4 btn-xs' color='warning' onClick={(e)=> e.preventDefault()}>Add</Button>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <div className="flex-sb">
                                                <FormikDatePicker
                                                    name="consumerCourtDates"
                                                    value={values.consumerCourtDates}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                />
                                                <Button color='danger' className='ml-3' onClick={(e)=> e.preventDefault()}>Delete</Button>
                                            </div>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Legal Important Points (Comment Section)</Label>
                                            <Editor
                                                apiKey={tinyMceApiKey}
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue="<p>This is the initial content of the editor.</p>"
                                                init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family:Work Sans,Helvetica,Arial,sans-serif; font-size:14px }'
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Legal Points By Experts</Label>
                                            <Editor
                                                apiKey={tinyMceApiKey}
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue="<p>This is the initial content of the editor.</p>"
                                                init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family:Work Sans,Helvetica,Arial,sans-serif; font-size:14px }'
                                                }}
                                            />
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

