//get email data

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { faDownload, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function GetEmailData ({ heading }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);

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

                                <Row className="mb-3">
                                    <Colxx xxs="12" lg="12" className="mb-5">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Search Email Data</Label>
                                            <div className="flex">
                                                <Field className="form-control" name="emailSearchParams" />
                                                <Button color="primary" className='ml-3' onClick={(e)=>e.preventDefault()}>
                                                    Search
                                                </Button>
                                            </div>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Card>
                                    <CardBody>
                                        {/* Field */}
                                        <div className="flex mb-3">
                                            <h6>CC :</h6>
                                            <p></p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mb-3">
                                            <h6>Email Type :</h6>
                                            <p></p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mb-3">
                                            <h6>Subject :</h6>
                                            <p></p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mb-3">
                                            <h6>Email Content :</h6>
                                            <p></p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mb-3">
                                            <h6>Send Date :</h6>
                                            <p></p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mb-3">
                                            <h6>Update Draft :</h6>
                                            <p></p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mb-3">
                                            <h6>Action(Please Check before clicking on Delete button) :</h6>
                                            <p></p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex">
                                            <h6>Send Email To Customer :</h6>
                                            <p></p>
                                        </div>
                                    </CardBody>
                                </Card>


                            </Colxx>
                        </Row>
                    </Form>
                )}
                </Formik>
            </CardBody>
        </Card>
    )
}

