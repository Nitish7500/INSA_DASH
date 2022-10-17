import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { faDownload, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { movementOfCase, nonResponsiveCustomerFlow } from 'constants/formValues';


export default function NonResponsive ({ heading }) {

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

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="6">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Called Date</Label>
                                            <FormikDatePicker
                                                name="legalNoticeResRecDate"
                                                value={values.legalNoticeResRecDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="6">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">No Response Section</Label>
                                            <select name="movementOfCase"
                                                className="form-control"
                                                value={values.movementOfCase}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {nonResponsiveCustomerFlow.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
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

