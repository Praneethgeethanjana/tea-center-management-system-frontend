import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import {createFarmer, getAllFarmers, updateFarmer} from "@src/services/farmers";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import {getVariables} from "@src/services/statistics";
import {createAdvance, updateAdvance} from "@src/services/advance";
const CreateAdvance = ({ details, closeModal, updateHandler }) => {
  const [data, setData] = useState(details ?? {});
  const [loading, setLoading] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [farmers, setFarmers] = React.useState([]);
  const [selectedFarmer, setSelectedFarmer] = React.useState('');
  const [selectedDate, setSelectedDate] = useState([
    moment(new Date()).format("YYYY-MM-DD"),
  ]);
  const [liveDate, setLiveDate] = useState(null);


  useEffect( () => {
    setLoading(true);
    if(!details) {
      getFarmers();
    } else {
      setSelectedFarmer(details.user.id)
      setLoading(false);
    }
  },[])



  const getFarmers = async () => {
    await getAllFarmers().then((res) => {
      if(res.success) {
        let array = []
        if(res?.body?.content) {
          res.body.content.map((item,index) => {
            let obj = {
              key : item.id,
              text : `${item.id} - ${item.firstName} ${item.lastName}`,
              value : item.id
            }
            array.push(obj);
          });
          setFarmers(array);
        }
      } else {
        setFarmers([]);
      }
    }).finally(() => {setLoading(false);});
  }



  const manageHandler = async () => {
    if (!details && (!selectedFarmer || selectedFarmer === ''))
      return notifyMessage("Please select a farmer", 0);
    if (!data.amount || data.amount.trim() === "" )
      return notifyMessage("Amount can not be empty", 0);


    const obj = {
        userId : details ? details.user.id : selectedFarmer,
        amount : data.amount,
        created : selectedDate[0]
    }
    if(details) {
      await updateAdvanceHandler(details.id,obj);
    } else {
      await advanceHandler(obj);
    }

  };


  const advanceHandler = async (obj) => {
    setApiLoader(true);
    await createAdvance(obj).then((res) => {
      if(res.success) {
        notifyMessage(res.message,1)
        if(updateHandler) updateHandler();
        closeModal();
      } else {
        notifyMessage(res.message,0);
      }
    }).finally(()=> { setApiLoader(false)});
  }

  const updateAdvanceHandler = async (id,obj) => {
    setApiLoader(true);
    await updateAdvance(id,obj).then((res) => {
      if(res.success) {
        notifyMessage(res.message,1)
        if(updateHandler) updateHandler();
        closeModal();
      } else {
        notifyMessage(res.message,0);
      }
    }).finally(()=> { setApiLoader(false)});
  }


  const inputHandler = (e,val) => {
    let name = e.target.name;
    setData({ ...data, [name]: val });
  };



  return (
    <>
      {loading ? <Loader/> :
        <div className="manage-form">
          <Row>
            {details &&   <Label className={" font-small-4"}>Farmer Name : {details?.user?.firstName} {details?.user?.lastName}</Label>}
            {!details &&
                <Col md={6}>
                  <div className="text-wrapper tile-wrapper mt-1">
                    <Label className={"required font-small-4"}>Select Farmer</Label>
                    <Dropdown
                        disabled={details ? true : false}
                        placeholder=""
                        className={"form-control"}
                        fluid
                        selection
                        search={true}
                        onChange={(e, { value }) => {
                          setSelectedFarmer(value)
                        }}
                        value={selectedFarmer}
                        options={farmers}
                        selectOnBlur={false}
                    />
                  </div>
                </Col>
            }
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Amount (Rs)</Label>
                <Input
                  name={"amount"}
                  value={data.amount ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if(/^\d*$/.test(val) || val === '') {
                      inputHandler(e,val)
                    }
                  }}
                  type="text"
                  placeholder="Amount"
                  className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={`text-wrapper tile-wrapper ${details ? 'mt-1' : ''}`}>
                <Label className={"font-small-4"}>Date</Label>
                <Flatpickr
                  options={{
                    mode: "single",
                    minDate: moment().subtract(2, "months").toDate(),
                    maxDate: new Date(),
                  }}
                  className="form-control selected-date"
                  placeholder={"Select a date"}
                  value={liveDate ? liveDate : selectedDate}
                  onChange={(date) => {
                    setLiveDate(date);
                    setSelectedDate([moment(date[0]).format("YYYY-MM-DD")]);

                  }}
                />
              </div>
            </Col>


          </Row>

          <div className="d-flex justify-content-end">

            <button
              // disabled={apiLoader}
              className="btn btn-primary mt-3"
              onClick={manageHandler}
            >
              {details ? 'Update' : 'Advance'}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default CreateAdvance;
