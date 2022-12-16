import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import getStatusBuckets from 'data/getStatusBuckets';
import { capitalizeEachWordInString } from 'helpers/CommonHelper';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import {
  Button,
  Modal,
  ModalBody,
} from 'reactstrap';
import { apisURLs } from 'services/apisURLs.services';
import { cancelReqData, getReqUserData } from 'services/complaints.services';

export default function CancelRequest({isOpen, onClose, userId }) {

    const [userData, setuserData] = useState([])
    const [form, setForm] = useState([])

    useEffect(() => {
        if (isOpen) {
            getReqUserData(userId).then(res => {
                console.log(res)
                let temp = res.data?.length && res.data?.map(res => {
                    return {label:res.reqFields?.join(","), value:res._id}
                })
                setuserData(temp)
            })
        }
    },[isOpen])

    const handleCancelReq = () => {
        let temp = form?.map(x => {
            return x.value
        })
        cancelReqData({idArray:temp}).then(res => {
            console.log(res)
            onClose()
            NotificationManager.success(
                res.msg,
                'Cancelled document requested !!',
                3000,
                null,
                null,
                'filled'
            );
        })
    }

    // const [selectedStatus, setSelectedStatus] = useState();
    // console.log(insuranceId)

    // async function cancelRequest() {
    //     try {
    //         axios
    //         .post(
    //             apisURLs.setStatus,
    //             {
    //                 expert: '', 
    //                 id: insuranceId,
    //                 legalExpert: '',
    //                 status: selectedStatus,
    //                 userEntryId: '',
    //                 user_id: ''
    //             })
    //             .then((res) => {
    //                 NotificationManager.success(
    //                     res.data.message,
    //                     'Successfully Changed Status !',
    //                     3000,
    //                     null,
    //                     null,
    //                     'filled'
    //                 );
    //                 onClose();
    //             })
    //         } catch (error) {
    //             console.log('Emails ', error);
    //             NotificationManager.error(
    //                 error.message,
    //                 'Failed to download Reports',
    //                 3000,
    //                 null,
    //                 null,
    //                 'filled'
    //             );
    //             onClose();
    //         }
    // };
        
    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                <h2 className='mb-0 ml-3'>Cancel Request</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                <label>Request sent to Customer</label>
                <Select isMulti options={userData} onChange={(e) => {setForm(e)}}></Select>
                <div className="text-center mt-4 mb-3">
                    <Button color='danger' className='text-center'
                    //  onClick={updateStatus}
                    >
                        <span className='text-center' onClick={handleCancelReq}>Cancel Request</span>
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}
