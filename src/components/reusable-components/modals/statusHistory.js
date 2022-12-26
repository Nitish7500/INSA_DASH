import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Table,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

export default function StatusHistory({isOpen, onClose, details}) {
    const {policyNumber,userId, email,phone, status, insuranceCompanyId,complaintTypeId,policyTypeId} = details;

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                <h2 className='mb-0 ml-3'>Status History</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                {/* <h3 className="text-muted text-thin">User Details</h3> */}
                <Table borderless>
                    <thead>
                        <tr key={"userId"}>
                            <th>ID</th>
                            <td>{ userId?._id }</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={"userName"}>
                            <th scope="row">Name</th>
                            <td>{ userId?.name }</td>
                        </tr>
                        <tr key={"3"}>
                            <th scope="row">Email</th>
                            <td>{ email }</td>
                        </tr>
                    </tbody>
                </Table>
                <Table bordered>
                    <thead>
                        <tr key={"head"}>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={"name"}>
                            <td scope="row">Name</td>
                            <td>{ userId?.name }</td>
                        </tr>
                        <tr key={"email"}>
                            <td scope="row">Email</td>
                            <td>{ email }</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            {/* <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter> */}
        </Modal>
    )
}
