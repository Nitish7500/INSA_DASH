//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { faArrowRight, faCancel, faCheck, faDownload, faDownLong, faFileZipper, faUser, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlideComponent from 'components/carousel/GlideComponent';
import { SimpleCarousel } from '../carousel/simple-carousel';
import { items } from 'data/carouselItems';
import { selectReminderType } from 'constants/formValues';


export default function OtherActions ({ heading }) {

    return (
        <Card>
            <CardBody>
                <h2 className="mb-4">{heading}</h2>
                <Row className="mb-4">
                    <Colxx xxs="12" lg="12" className="mb-5">

                        <Row>
                            <Colxx xxs="12" lg="12">
                                <div className="flex">
                                    <h5>Lead ID - </h5>
                                    <h5 className='text-warning ml-2'>C4CF798D-614E-4C28-89A4-00B453BD4D65</h5>
                                </div>
                            </Colxx>
                        </Row>
                        <div className="my-3">
                            <h3>Request Actions</h3>
                            <div className="actions flex my-4">
                                <div className="flex-cc mr-3">
                                    <Button color='warning' className='text-center'>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <span className='text-center mt-2 ml-3'>Status Change</span>
                                    </Button>
                                </div>
                                <div className="flex-cc">
                                    <Button color='success' className='text-center'>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                        <span className='text-center mt-2 ml-3'>Request From Customer</span>
                                    </Button>
                                </div>
                                <div className="flex-cc ml-3">
                                    <Button color='danger' className='text-center'>
                                        <FontAwesomeIcon icon={faCancel} />
                                        <span className='text-center mt-2 ml-3'>Cancel Request</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <h3>Assign Complaint</h3>
                            <div className="actions flex my-3">
                                <div className="flex-cc mr-3">
                                    <Button color='primary' className='text-center'>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className='text-center mt-2 ml-3'>Assign To Company / IGMS </span>
                                    </Button>
                                </div>
                                <div className="flex-cc">
                                    <Button color='success' className='text-center'>
                                        <FontAwesomeIcon icon={faUserTag} />
                                        <span className='text-center mt-2 ml-3'>Assign to Ombudsman</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <h3>Generate Single OR multiple Reminder Mail</h3>
                            <div className="actions flex my-3 row">
                                <div className="flex-cc mr-3 col-12 col-md-3">
                                    <select name="education"
                                            className="form-control"
                                        >
                                        {selectReminderType.map((level) => (
                                            <option value={level.value}>{level.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-cc mr-3">
                                    <Button color='warning' className='text-center'>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className='text-center mt-2 ml-3'>Assign To Company/IGMS:</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </Colxx>
                </Row>
            </CardBody>
        </Card>
    )
}

