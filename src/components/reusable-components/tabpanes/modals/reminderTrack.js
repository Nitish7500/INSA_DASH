import { NotificationManager } from 'components/common/react-notifications'
import React from 'react'
import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { getTrackDataFunc } from 'services/complaints.services'

function ReminderTrackCom({isOpen, onClose, details}) {

    const [formData, setformData] = useState({
        reminderType:"",
        reminder:"",
        id : details._id
    })
    const [data, setData] = useState([])

    const {reminder, reminderType} = formData

    const handleSearchClick = () => {
        if (reminder && reminderType) {
            getTrackDataFunc(formData).then(res => {
                console.log(res)
                if (res.status === 200) {
                    setData(res.data)
                    NotificationManager.success(
                        "Data Found !",
                        res.msg,
                        3000,
                        null,
                        null,
                        "filled"
                    )
                }else{
                    NotificationManager.error(
                        "Something went wrong !",
                        res.msg,
                        3000,
                        null,
                        null,
                        "filled"
                    )
                }
            })
            
        }
    }


  return (
    <div>
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            {/* <ModalHeader className=''> */}
                <div className='d-flex w-100 justify-content-between p-4 border-bottom'>

                <div>
                <span className='h4'>Reminder Tracks</span>
                </div>
                <div>
                <i className="simple-icon-close" style={{cursor:"pointer"}} onClick={onClose} />
                </div>
                </div>
            {/* </ModalHeader> */}
            <ModalBody>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-5'>
                            <label>Select Reminder Type</label>
                            <select
                                class="form-control border-bold"
                                name="reminderType"
                                value={reminderType}
                                onChange={(e) => {setformData({...formData, [e.target.name]:e.target.value})}}
                                >
                                    <option value={""}>Select</option>
                                <option value="Single">Single</option>
                                <option value="Multiple">Multiple</option>
                                </select>
                        </div>
                        <div className='col-sm-5'>
                        <label>Select Reminder</label>
                            <select
                            class="form-control border-bold"
                            name="reminder"
                            value={reminder}
                            onChange={(e) => {setformData({...formData, [e.target.name]:e.target.value})}}
                            >
                            <option value={""}>Select</option>
                            <option value="nonResponsive">Non Responsive</option>
                            <option value="outOfReach">Out Of Reach</option>
                            </select>
                        </div>
                        <div className='col-sm-2'>
                            <div className='d-flex mt-4'>
                                <button className='btn btn-success rounded' onClick={handleSearchClick}>SEARCH</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='table mt-5 w-90 ml-auto mr-auto'>
                    <table className='table table-bordered table-responsive-sm'>
                        <thead>
                            <tr className='bg-dark text-white'>
                                <th>Updated By</th>
                                <th>Reminder Sent Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(data)}
                            {
                                data.length ? data?.map(res => {
                                    return <tr>
                                        <td>{res.updatedBy}</td>
                                        <td>{moment(res.date).format("YYYY-MM-DD")}</td>
                                    </tr>
                                }) : ""
                            }
                            {
                                !data.length && <tr className='text-center'><td colSpan={2}><h4>No Data</h4></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default ReminderTrackCom