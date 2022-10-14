//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker, FormikReactSelect } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useRef, useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { 
    emailType,
        isRequirementReceived,
        movementOfCase,
        resolutionType,
        selectMultipleItems, 
    } from 'constants/formValues';
import { faDownload, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tinymce/tinymce-react';
import { tinyMceApiKey } from 'constants/defaultValues';


export default function SavedEmail ({ heading }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);

    const editorRef = useRef(null);
    const log = (e) => {
        e.preventDefault()
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

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

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="4">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Select Multiple Users</Label>
                                            <FormikReactSelect
                                                name="selectMultipleUsers"
                                                id="selectMultipleUsers"
                                                value={values.selectMultipleItems}
                                                isMulti
                                                options={selectMultipleItems}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="4">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Select Multiple Documents</Label>
                                            <FormikReactSelect
                                                name="selectMultipleUsers"
                                                id="selectMultipleUsers"
                                                value={values.selectMultipleItems}
                                                isMulti
                                                options={selectMultipleItems}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="4">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Draft Mail done by</Label>
                                            <FormikReactSelect
                                                name="selectMultipleUsers"
                                                id="selectMultipleUsers"
                                                value={values.selectMultipleItems}
                                                isMulti
                                                options={selectMultipleItems}
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
                                            <Label className="d-block">Movement Of Case</Label>
                                            <select name="movementOfCase"
                                                className="form-control"
                                                value={values.movementOfCase}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {movementOfCase.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Email To</Label>
                                            <Field className="form-control" name="emailTo" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Email CC</Label>
                                            <Field className="form-control" name="emailCc" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Email Type</Label>
                                            <select name="emailType"
                                                className="form-control"
                                                value={values.emailType}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {emailType.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Email Subject</Label>
                                            <Field className="form-control" name="emailSubject" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                            
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Email Message</Label>
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
                                <div className="flex">
                                    <Button color="warning" onClick={(e)=>e.preventDefault()}>
                                        Save Incomplete Draft
                                    </Button>
                                    <Button color="primary" className='ml-3' type="submit">
                                        Save Email
                                    </Button>
                                </div>
                            </Colxx>
                        </Row>
                    </Form>
                )}
                </Formik>
            </CardBody>
        </Card>
    )
}

