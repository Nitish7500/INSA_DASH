//complaint details nested form

import { Colxx } from "components/common/CustomBootstrap";
import {
  FormikCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikDatePicker,
} from "containers/form-validations/FormikFields";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import {
  claimRejectionTypes,
  education,
  gender,
  movementOfCase,
  occupation,
  policyTypes,
  realtionships,
} from "constants/formValues";
import {
  assignIGMS,
  assignLegalExpert,
  assignOmbudsman,
  fetchAllUserPolicy,
  fetchCompIds,
  fetchDocs,
  fetchDraftMail,
  fetchHtmlPage,
  fetchLead,
  findByUserId,
  findLegalByComplaintId,
  getAllForEscalationByUserId,
  getAllInsa,
  getAllStates,
  getCompanyNoticeData,
  getComplaintTypesByPolicyTypeId,
  getCurrentInvoiceCount,
  getFirstDraftData,
  getInsuranceCompanyNamesByPolicyTypeId,
  getLegalUserData,
  getPolicyTypes,
  getUserBasedData,
  omdRemindMail,
  userAdmin,
} from "services/complaints.services";
import { useSelector } from "react-redux";
const options = [
  { value: "", label: "Select an Option" },
  { value: "Something", label: "Something" },
  { value: "Anything", label: "Anything" },
];

export default function DetailsForm({ heading, details, handleFormChange }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setdistricts] = useState([]);
  const [policyTypes, setPolicyTypes] = useState([]);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  const [firstDraft, setFirstDraft] = useState([]);
  const [userBasedData, setUserBasedData] = useState([]);
  const [allExecutives, setAllExecutives] = useState([]);
  const [allExperts, setAllExperts] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allOmbudsman, setAllOmbudsman] = useState([]);
  const [allLegalExecutives, setAllLegalExecutives] = useState([]);
  const [userAdminData, setuserAdminData] = useState([]);
  const [findLegalByComplaintIdData, setfindLegalByComplaintIdData] = useState(
    []
  );
  const [allEscalationData, setallEscalationData] = useState([]);
  const [compIdsData, setcompIdsData] = useState([]);
  const [htmlPageData, sethtmlPageData] = useState({});
  const [allUserPolicy, setallUserPolicy] = useState([]);
  const [userFoundData, setuserFoundData] = useState([]);
  const state = useSelector((state) => state.complaint);
  // console.log(state)
  // objects nested in api response
  let complaint = details?.complaintTypeId;
  let user = details?.userId;
  let lead = details?.leadId;
  let wholeAddress = details?.wholeAddress;
  let insuranceCompany = details?.insuranceCompanyId;
  let policyType = details?.policyTypeId;
  let complaintType = details?.complaintTypeId;

  // IDs of all important objects
  let policyTypeId = policyType ? policyType._id : "";
  let complaintTypeId = complaint ? complaint._id : "";
  let insuranceCompanyId = insuranceCompany ? insuranceCompany._id : "";
  let leadId = lead ? lead._id : "";
  let userId = user ? user._id : "";

  // console.log(details);

  let date = new Date(parseInt(user?.dob?.substr(6)));
  // console.log(date);

  //getting all states (ombudsman state locations and districts)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllStates();
        let dis = data?.filter((res) => res.name === details.stateN);

        setdistricts(dis.district);
        setStates(data);
      } catch (error) {
        console.log("States", error);
      }
      setIsLoaded(true);
    };
    fetchData();

    //getting all policy types from api ::-- to be noted that policy type here is being referred to Insurance Type i.e. LI, GI, HI etc --::
    const fetchPolicyType = async () => {
      try {
        const { data } = await getPolicyTypes();
        setPolicyTypes(data);
      } catch (error) {
        console.log("Policy Types ", error);
      }
      setIsLoaded(true);
    };
    fetchPolicyType();

    // getting all complaint types and  Insurance companies details on the basis of policy type selected
    handleSelectInsurancetype(policyTypeId);

    // getting complaint type if coming from api response
    getComplaintTypes(complaintTypeId);

    // getting insurance company type
    getInsuranceCompanies(insuranceCompanyId);

    // get user based data method with payload
    const fetchUserBaseddata = async () => {
      try {
        const { data } = await getUserBasedData();
        setUserBasedData(data);
      } catch (error) {
        console.log("Policy Types ", error);
      }
      setIsLoaded(true);
    };
    fetchUserBaseddata();

    //getting all Executives list
    const fetchAllExecutives = async () => {
      try {
        const { data } = await getAllInsa();
        setAllExecutives(data.data);
      } catch (error) {
        console.log("All INSA Executives ", error);
      }
      setIsLoaded(true);
      // console.log('All Executives ', allExecutives);
    };
    fetchAllExecutives();

    //getting all Legal Experts
    const fetchLegalExperts = async () => {
      try {
        const { data } = await assignLegalExpert();
        setAllLegalExecutives(data.data);
      } catch (error) {
        console.log("All Legal Experts ", error);
      }
      setIsLoaded(true);
      // console.log('All Legal Experts ', allLegalExecutives);
    };
    fetchLegalExperts();

    //getting all Ombudsman
    const fetchAllOmbudsman = async () => {
      try {
        const { data } = await assignOmbudsman();
        setAllOmbudsman(data.data);
      } catch (error) {
        console.log("All Ombudsman ", error);
      }
      setIsLoaded(true);
      // console.log('All Ombudsman ', allOmbudsman);
    };
    fetchAllOmbudsman();

    //getting all Ombudsman
    const fetchAllCompanyIgms = async () => {
      try {
        const { data } = await assignIGMS();
        setAllCompanies(data.data);
      } catch (error) {
        console.log("All Companies / IGMS ", error);
      }
      setIsLoaded(true);
      // console.log('All Companies / IGMS ', allCompanies);
    };
    fetchAllCompanyIgms();

    // const getFirstDraft = async () => {
    //     try {
    //         const {data} = await getFirstDraftData();
    //         setFirstDraft(data);
    //     } catch (error) {
    //         console.log('First draft data ', error)
    //     }
    //     setIsLoaded(true);
    // }
    // getFirstDraft();

    getCurrentInvoiceCountFunc();
    omdRemindMailFunc();
    getLegalUserDataFunc();
    getCompanyNoticeDataFunc();
    getComplaintDocFunc();
    getLeadData();
    getDraftMailFunc();
    getUserAdminFunc();
    getFindLegalByComFunc();
    getAllForEscFunc();
    getCompIdsFunc();
    getHtmlPageFunc();
    getAllUserPoliciesFunc();
    findByUserIdFunc();
    getFirstDraftFunc();
  }, []);

  const getCurrentInvoiceCountFunc = async () => {
    try {
      const { data } = await getCurrentInvoiceCount();
      // setAllCompanies(data.data);
    } catch (error) {
      console.log("All Companies / IGMS ", error);
    }
  };

  const omdRemindMailFunc = async () => {
    try {
      const { data } = await omdRemindMail(details._id);
      // setAllCompanies(data.data);
    } catch (error) {
      console.log("All Companies / IGMS ", error);
    }
  };

  const getLegalUserDataFunc = async (id) => {
    try {
      const { data } = await getLegalUserData(details._id);
      // setAllCompanies(data.data);
    } catch (error) {
      console.log("All Companies / IGMS ", error);
    }
  };

  const getCompanyNoticeDataFunc = async (id) => {
    try {
      const { data } = await getCompanyNoticeData(details.policyNumber);
      // setAllCompanies(data.data);
    } catch (error) {
      console.log("All Companies / IGMS ", error);
    }
  };

  const getComplaintDocFunc = async () => {
    try {
      const { data } = await fetchDocs(details.userId?._id, details._id);
      // setInsuranceCompanies(data);
      // console.log(insuranceCompanies);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getLeadData = async () => {
    try {
      console.log(details.leadId);
      const { data } = await fetchLead(details.leadId?._id);
      // setInsuranceCompanies(data);
      // console.log(insuranceCompanies);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getDraftMailFunc = async () => {
    try {
      const { data } = await fetchDraftMail(details.userId?._id);
      // setInsuranceCompanies(data);
      // console.log(insuranceCompanies);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getUserAdminFunc = async () => {
    try {
      const { data } = await userAdmin(details.userId?._id);
      setuserAdminData(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getFindLegalByComFunc = async () => {
    try {
      const { data } = await findLegalByComplaintId({
        userId: details.userId?._id,
      });
      setfindLegalByComplaintIdData(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getAllForEscFunc = async () => {
    try {
      const { data } = await getAllForEscalationByUserId({
        userId: details.userId?._id,
      });
      setallEscalationData(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getCompIdsFunc = async () => {
    try {
      const { data } = await fetchCompIds(details.userId?._id);
      setcompIdsData(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getHtmlPageFunc = async () => {
    try {
      const { data } = await fetchHtmlPage(details?._id);
      sethtmlPageData(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getAllUserPoliciesFunc = async () => {
    try {
      const { data } = await fetchAllUserPolicy(
        details?.complaintTypeId?.name,
        details.userId?._id
      );
      setallUserPolicy(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const getFirstDraftFunc = async () => {
    try {
      const { data } = await getFirstDraftData(details);
      setFirstDraft(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  const findByUserIdFunc = async () => {
    try {
      const { data } = await findByUserId(details.userId?._id);
      setuserFoundData(data);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  //getting all complaint types on the basis of policy type selected
  const getComplaintTypes = async (id) => {
    let policyTypeId = id;
    try {
      const { data } = await getComplaintTypesByPolicyTypeId(policyTypeId);
      // setComplaintTypes(data);
      // console.log(complaintTypes);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  //getting all Insurance companies details on selecting insurance type
  const getInsuranceCompanies = async (id) => {
    let policyTypeId = id;
    try {
      const { data } = await getInsuranceCompanyNamesByPolicyTypeId(
        policyTypeId
      );
      setInsuranceCompanies(data);
      // console.log(insuranceCompanies);
    } catch (error) {
      console.log("States", error);
    }
    setIsLoaded(true);
  };

  // function handling policytype id :: insurance type id
  const handleSelectInsurancetype = (insuranceTypeId) => {
    let policyTypeId = insuranceTypeId;
    // console.log('Policy Type ID ', policyTypeId);
    getComplaintTypes(policyTypeId);
    getInsuranceCompanies(policyTypeId);
  };

  // console.log(details);

  // const onSubmit = (values, { setSubmitting } ) => {
  //     values.preventDefault()
  //     const payload = {
  //       ...values,
  //       reactSelect: values.reactSelect.map((t) => t.value),
  //     };
  //     setTimeout(() => {
  //       console.log(JSON.stringify(payload, null, 2));
  //       setSubmitting(false);
  //     }, 1000);
  // };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <Card>
      <CardBody>
        <h2 className="mb-5">{heading}</h2>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <label>Name</label>
              <input
                id="compDetailsName"
                className="form-control"
                name="name"
                value={details.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Email</label>
              <input
                id="compDetailsEmail"
                disabled
                className="form-control"
                name="email"
                value={details.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Phone</label>
              <input
                disabled
                id="compDetailsPhone"
                className="form-control"
                name="phone"
                value={details.phone}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label> Alternate Contact Number</label>
              <input
                disabled
                id="compDetailsAltNo"
                className="form-control"
                name="alternatePhone"
                type={"number"}
                value={details.user?.alternatePhone}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label> Income Level*(per month)</label>
              <input
                disabled
                id="compDetailsIncLel"
                className="form-control"
                name="incomeLevel"
                type={"number"}
                value={details.incomeLevel}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>PinCode</label>
              <input
                id="compDetailsPincode"
                className="form-control"
                name="pinCode"
                value={details.pinCode}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Gender</label>
              <div className="d-flex">
                <div className="d-flex">
                  <label>Male</label>
                  <input
                    id="compDetailsgenderM"
                    className="form-control ml-3"
                    name="gender"
                    type={"radio"}
                    value="Male"
                    checked={details.gender === "Male"}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="d-flex ml-4">
                  <label>Female</label>
                  <input
                    id="compDetailsGenderF"
                    className="form-control ml-3"
                    name="gender"
                    type={"radio"}
                    value="Female"
                    checked={details.gender === "Female"}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <label>Education*</label>
              <select
                id="compDetailsEdu"
                name="education"
                className="form-control"
                value={details.education}
                onChange={handleFormChange}
                // onBlur={handleBlur}
              >
                {education.map((level) => (
                  <option value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>DOB</label>
              <input
                id="compDetailsDob"
                className="form-control"
                name="dob"
                type={"date"}
                value={details.dob}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Pan Card Number</label>
              <input
                id="compDetailsPan"
                className="form-control"
                name="panNumber"
                type={"text"}
                value={details.panNumber}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Select State</label>
              <select
                id="compDetailsState"
                name="stateN"
                className="form-control"
                value={details.stateN}
                onChange={handleFormChange}
                // onBlur={handleBlur}
              >
                <option value="">Select a state..</option>
                {states?.map((res) => {
                  // console.log(res)
                  return <option value={res.name}>{res.name}</option>;
                })}
                <option value="Bihar">Bihar</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Select District</label>
              <select
                id="compDetailsDst"
                name="district"
                className="form-control"
                value={details.districtName}
                onChange={handleFormChange}
                // onBlur={handleBlur}
              >
                <option value="">Select District</option>
                {districts?.map((res) => {
                  return <option>{res}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Occupation</label>
              <select
                id="compDetailsOcu"
                name="occupation"
                className="form-control"
                value={details.occupation}
                onChange={handleFormChange}
                // onBlur={handleBlur}
              >
                {occupation.map((key) => (
                  <option value={key.value}>{key.label}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <label>Nominee Name</label>
              <input
                id="compDetailsNominee"
                name="nominee"
                value={details.nominee}
              />
            </div>
            <div className="col-sm-3">
              <label>Deceased Name</label>
              <input
                id="compDetailsDeceased"
                name="deceasedPerson"
                className="form-control"
                value={details.deceasedPerson}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label> Policy Number</label>
              <input
                id="compDetailsPolicy"
                name="policyNumber"
                className="form-control"
                value={details.policyNumber}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Claim Amount</label>
              <input
                id="compDetailsClaim"
                className="form-control"
                type={"number"}
                name="claimAmount"
                value={details.claimAmount}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-6">
              <label>Address</label>
              <input
                id="compDetailsAdd"
                disabled
                className="form-control"
                type={"text"}
                name="address"
                value={details.address}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Insurance Type</label>
              <select
                id="compDetailsIncType"
                name="insuranceCompany"
                className="form-control"
                value={details.insuranceCompany?._id}
                onChange={(e) => {
                  handleSelectInsurancetype(e.target.value);
                  handleFormChange(e);
                }}
                // onBlur={handleBlur}
              >
                {policyTypes.map((policyType) => {
                  return (
                    <option value={policyType._id}>{policyType.name}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Select Complaint Type</label>
              <select
                id="compDetailsComType"
                name="complaintType"
                className="form-control"
                value={details.complaintType}
                onChange={handleFormChange}
                // onBlur={handleBlur}
              >
                {complaintTypes.map((type) => (
                  <option value={type._id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <label>Select Company Name</label>
              <select
                id="compDetailsComName"
                name="insuranceCompanyId"
                className="form-control"
                value={details.insuranceCompanyId?._id}
                onChange={handleFormChange}
                //   onBlur={handleBlur}
              >
                {insuranceCompanies.map((insuranceCompany) => (
                  <option value={insuranceCompany._id}>
                    {insuranceCompany.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <label>Policy Type</label>
              <select
                id="compDetailsPolType"
                name="policyTypeId"
                className="form-control"
                value={details.policyTypeId?._id}
                onChange={handleFormChange}
                //   onBlur={handleBlur}
              >
                {policyTypes?.map((key) => (
                  <option value={key._id}>{key.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <label>Rejection Type</label>
              <select
                id="compDetailsRejType"
                name="claimRejectionType"
                className="form-control"
                value={details.claimRejectionType}
                onChange={handleFormChange}
                //   onBlur={handleBlur}
              >
                {claimRejectionTypes.map((type) => (
                  <option value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Relationship</label>
              <select
                id="compDetailsRel"
                name="familyRelation"
                className="form-control"
                value={details.familyRelation}
                onChange={handleFormChange}
                //   onBlur={handleBlur}
              >
                {realtionships.map((key) => (
                  <option value={key.value}>{key.label}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <label>Movement of Case</label>
              <select
                id="compDetailsMovCase"
                name="movementOfCase"
                className="form-control"
                value={details.movementOfCase}
                onChange={handleFormChange}
                //   onBlur={handleBlur}
              >
                {movementOfCase.map((movement) => (
                  <option value={movement.value}>{movement.label}</option>
                ))}
              </select>
            </div>
            <div class="col-sm-3">
              <label>Assign To</label>
              <div class="input-group">
                <input
                  id="compDetailsAssignTo"
                  type="text"
                  name="userName"
                  class="form-control"
                  value={details.assign_to ? details.assign_to : "-"}
                  disabled
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Assign To Expert</label>
              <div class="input-group">
                <input
                  id="compDetailsAssignExp"
                  type="text"
                  name="userName"
                  class="form-control"
                  value="{{ caseone.assign_to_expert ? caseone.assign_to_expert : '--' }}"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div class="col-sm-3">
              <label>Assign To Company/IGMS</label>
              <div class="input-group">
                <input
                  id="compDetailsCom/IGMS"
                  type="text"
                  name="userName"
                  class="form-control"
                  value={
                    details.assignToCompanyIGMS
                      ? details.assignToCompanyIGMS
                      : "--"
                  }
                  disabled
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Assign To Ombudsman</label>
              <div class="input-group">
                <input
                  id="compDetailsOmb"
                  type="text"
                  name="userName"
                  class="form-control"
                  value={
                    details.assignToOmbudsman ? details.assignToOmbudsman : "--"
                  }
                  disabled
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Assign To Legal Executive</label>
              <div class="input-group">
                <input
                  id="compDetailsAssignLeg"
                  type="text"
                  name="userName"
                  class="form-control"
                  value={
                    details.assignedLegalExecutive
                      ? details.assignedLegalExecutive
                      : "--"
                  }
                  disabled
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Assign To Legal Sub Executive</label>
              <div class="input-group">
                <input
                  id="compDetailsAssignSub"
                  type="text"
                  name="userName"
                  class="form-control"
                  value={
                    details.assignedLegalSubExecutive
                      ? details.assignedLegalSubExecutive
                      : "--"
                  }
                  disabled
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Lead Number</label>
              <div class="input-group">
                <input
                  id="compDetailsLeadNo"
                  type="text"
                  name="userId"
                  class="form-control"
                  value={details.leadId ? details.leadId.leadId : "--"}
                  disabled
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Status</label>
              <div class="input-group">
                <input
                  id="compDetailsStatus"
                  type="text"
                  name="currentStatus"
                  class="form-control"
                  value={details.status ? details.status : "--"}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <label>Door No./ Bldg/Name / Floor</label>
              <input
                id="compDetailsDoorNo"
                className="form-control"
                name="DoorNo/Bldg/Name/Floor"
                value={
                  details.wholeAddress["DoorNo/Bldg/Name/Floor"]
                    ? details.wholeAddress["DoorNo/Bldg/Name/Floor"]
                    : ""
                }
              />
            </div>
            <div className="col-sm-3">
              <label>Street / Area</label>
              <input
                id="compDetailsStreet"
                className="form-control"
                name="DoorNo/Bldg/Name/Floor"
                value={
                  details.wholeAddress["Street/Area"]
                    ? details.wholeAddress["Street/Area"]
                    : ""
                }
              />
            </div>
            <div className="col-sm-3">
              <label>City / Town / Panchayath / Village</label>
              <input
                id="compDetailsCity"
                className="form-control"
                name="DoorNo/Bldg/Name/Floor"
                value={
                  details.wholeAddress["City/Town/Panchayath/Village"]
                    ? details.wholeAddress["City/Town/Panchayath/Village"]
                    : ""
                }
              />
            </div>
            <div className="col-sm-3">
              <label>Taluk / Tehsil</label>
              <input
                id="compDetailsTaluk"
                className="form-control"
                name="DoorNo/Bldg/Name/Floor"
                value={
                  details.wholeAddress["Taluk/Tehsil"]
                    ? details.wholeAddress["Taluk/Tehsil"]
                    : ""
                }
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Generated address</label>
              <input
                id="compDetailsGenerated"
                className="form-control"
                name="DoorNo/Bldg/Name/Floor"
                value={
                  details.wholeAddress["address"]
                    ? details.wholeAddress["address"]
                    : ""
                }
              />
            </div>
            <div class="col-sm-3">
              <label>Covid Complaint Check</label>
              <div class="input-group">
                <label>Is it a Covid Complaint</label>
                <input
                  id="compDetailsCovid"
                  type="checkbox"
                  name="covidCheck"
                  class="form-control"
                  formControlName="covidCheck"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Service Complaint Check</label>
              <div class="input-group">
                <label>As a Service Complaint or not</label>
                <input
                  id="compDetailsSer"
                  type="checkbox"
                  name="asAServiceCheck"
                  class="form-control"
                  formControlName="asAServiceCheck"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div class="col-sm-3">
              <label>Assign To Internal Legal Executive</label>
              <input
                id="compDetailsIntLeg"
                type="text"
                class="form-control"
                value={
                  details.assigned_internal_legal_executive
                    ? details.assigned_internal_legal_executive
                    : "--"
                }
                disabled
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-8">
              <label>complaintStatement</label>
              <textarea
                id="compDetailsComSta"
                className="form-control"
                name="complaint_statement"
                rows={5}
                value={details.complaint_statement}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <h4 className="my-4">
            Customer Care Executive Created Email Section
          </h4>
          <div className="row">
            <div className="col-sm-3">
              <label>Email ID</label>
              <input
                id="compDetailsEmail2"
                class="form-control"
                type="text"
                name="executive_created_email"
                value={details.executive_created_email}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Password</label>
              <input
                id="compDetailsPass"
                class="form-control"
                type="password"
                name="password"
                value={details.password}
                onChange={handleFormChange}
              />
            </div>
            <div class="col-sm-3">
              <label>Approved Claim Amount</label>
              <div class="input-group">
                <input
                  id="compDetailsApvAmt"
                  class="form-control"
                  type="text"
                  name="actualRefundAmount"
                  value={details.actualRefundAmount}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
