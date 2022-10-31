//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { faDownload, faDownLong, faFileZipper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlideComponent from 'components/carousel/GlideComponent';
import { SimpleCarousel } from '../carousel/simple-carousel';
import { items } from 'data/carouselItems';


export default function DocumentForm ({ heading }) {

    return (
        <Card>
            <CardBody>
                <h2 className="mb-4">{heading}</h2>
                <Row className="mb-4">
                    <Colxx xxs="12" lg="12" className="mb-5">

                        <Row>
                            <Colxx xxs="12" lg="12" className="mb-5">
                                <div className="flex">
                                    <h5>Lead ID - </h5>
                                    <h5 className='text-warning ml-2'>C4CF798D-614E-4C28-89A4-00B453BD4D65</h5>
                                </div>
                            </Colxx>
                        </Row>
                        <div className="flex-sb my-3">
                            <h3>Documents Uploaded by User</h3>
                            <div className="actions flex">
                                <div className="flex-cc mr-3">
                                    <Button color='warning' className='text-center'>
                                        <FontAwesomeIcon icon={faFileZipper} />
                                        <span className='text-center mt-2 ml-3'>Generate Zip</span>
                                    </Button>
                                </div>
                                <div className="flex-cc">
                                    <Button color='success' className='text-center'>
                                        <FontAwesomeIcon icon={faDownload} />
                                        <span className='text-center mt-2 ml-3'>Download generated Zip</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Row>
                            <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                                <GlideComponent
                                    settings={{
                                    gap: 4,
                                    perView: 3,
                                    type: 'carousel',
                                    breakpoints: {
                                        480: { perView: 1 },
                                        800: { perView: 2 },
                                        1200: { perView: 3 },
                                    },
                                    hideNav: true,
                                    }}
                                >
                                    {items.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <SimpleCarousel {...item} />
                                        </div>
                                    );
                                    })}
                                </GlideComponent>
                            </Colxx>
                        </Row>

                    </Colxx>
                </Row>
            </CardBody>
        </Card>
    )
}

