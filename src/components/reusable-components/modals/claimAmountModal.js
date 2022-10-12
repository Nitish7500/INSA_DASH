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

export default function ClaimAmountModal({isOpen, onClose, details}) {
    const {policyNumber,userId, email,phone, status, insuranceCompanyId,complaintTypeId,policyTypeId} = details;

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                <h2 className='mb-0 ml-3'>Claim Amount Description</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                <h3 className="text-muted text-thin">Claim Amount</h3>
            </ModalBody>
            {/* <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter> */}
        </Modal>
    )
}
