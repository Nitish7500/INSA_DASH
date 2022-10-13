//mailing section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { gender, options } from 'constants/formValues';


export default function MailingSectionForm ({ heading }) {

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
                <h6 className="mb-4">{heading}</h6>
                <Formik initialValues={{
                    name: 'Yash',
                    email: 'test@test.com',
                    phone: '9453578234',
                }}
                    // validationSchema={SignupSchema}
                    // onSubmit={onSubmit}
                >
                {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur
                }) => (
                    <Form className="av-tooltip tooltip-label-right">
                        <Row className="mb-4">
                            <Colxx xxs="12" lg="12">
                            
                                {/* Sample Components */}
                                <Row className="my-6">
                                    {/* :::::::: Radio Group :::::: */}
                                    <Colxx xxs="12" lg="3"> 
                                        <FormGroup className="error-l-150 pt-2">
                                            <Label className="d-block">Gender</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="gender"
                                                id="gender"
                                                label="Which of these?"
                                                value=''
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={gender}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* ::::::::  Select Group  ::::::: */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Select State</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value=''
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select a state..</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                    {/* ::::::::  Checkbbox Group  ::::::: */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-175 ">
                                            <Label className="d-block">Custom Checkbox Group</Label>
                                            <FormikCustomCheckboxGroup
                                            inline
                                            name="customCheckGroup"
                                            id="customCheckGroup"
                                            label="Which of these?"
                                            value=''
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            options={options}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* ::::::::  Text Group  ::::::: */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label>Name</Label>
                                            <Field className="form-control" name="name" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row 1 */}
                                <Row>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">

                                    </Colxx>
                                </Row>
                            
                            </Colxx>
                        </Row>
                    </Form>
                )}
                </Formik>
            </CardBody>
        </Card>
    )
}

