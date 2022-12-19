import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
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
import { getUserBasedData, reqDataFunc } from 'services/complaints.services';
function RequestFromCustomer({isOpen, onClose, details}) {

    const [userBasedData, setuserBasedData] = useState([])
    const [formData, setformData] = useState({})
    const fields = [
        {label:"Hearing First Date", value:"omb_first_date"},
        {label:"Form 6A Received Date", value:"VIAFormUploadedDate"},
        {label:"Ombudsman Complaint Number", value:"oc_number"}
    ]

    useEffect(() => {
        if (isOpen && details) {
            getUserBasedData(details).then(res => {
                let temp = res.data?.map(res => {
                    return {label:`${res.policyNumber} - ${res.name} - ${res.insuranceCompanyId?.name}`, value:res._id}
                })
                setuserBasedData(temp)
                console.log(temp)
            })
        }
    },[isOpen])

    const handleChange = (e, name) => {

        if(name === "fields"){
            let temp = e?.map(res =>  res.value)
            console.log(temp)
            setformData({...formData, reqFields : temp})
        }else if(name === "idArray"){
            let temp = e?.map(res => res.value)
            let temp2 = e?.map(res => {return {id:res.value, status:"PENDING"}})
            setformData({...formData, idArray:temp, complaintStatus:temp2 })
        }
    }

    const handleSave = () => {
        if (formData.complaintStatus && details.email && formData.idArray?.length && formData.reqFields?.length) {
            reqDataFunc({
                ...formData,
                userId:details.userId,
                email:details.email,
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    NotificationManager.success(
                        res.msg,
                        'Successfully Requested !',
                        3000,
                        null,
                        null,
                        'filled'
                    );
                }
                onClose()
            })
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                <h2 className='mb-0 ml-3'>Request From Customer</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <label>User Details Handler</label>
                            <Select id='selectUser1' isMulti options={userBasedData} name="idArray" onChange={(e) => handleChange(e, "idArray")}></Select>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-sm-12'>
                            <label>Select Field</label>
                            <Select id='selectUserField1' isMulti options={fields} name="fields" onChange={(e) =>handleChange(e,"fields")}></Select>
                        </div>
                    </div>
                </div>
                {/* <select name="resolutionType" className="form-control" onChange={(e)=>setSelectedStatus(e.target.value)}>
                    {getStatusBuckets.map((item) => {
                        let index = item[1];
                        return (index.map((option) => {
                            return (
                                <option value={option}>{capitalizeEachWordInString(option)}</option>
                            )
                        }))
                    })}
                </select> */}
                <div className="text-center mt-4 mb-3">
                    <Button id='closeBtn' color='danger' className='text-center' onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                        <span className='text-center mt-2 ml-3'>Close</span>
                    </Button>
                    <Button color='success' className='text-center ml-4' onClick={handleSave}>
                        <FontAwesomeIcon icon={faCheck} />
                        <span id='saveBtn' className='text-center mt-2 ml-3'>Save</span>
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default RequestFromCustomer