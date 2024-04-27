import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import { createFarmer, getAllFarmers, updateFarmer } from "@src/services/farmers";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { getVariables } from "@src/services/statistics";
import { addTeaLeaves } from "@src/services/tea-leaves";
const AddLeaves = ({ detials, closeModal, updateHandler }) => {
  const [data, setData] = useState(detials ?? {weight:null,cover_weight:null,net_weight:null});
  const [loading, setLoading] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [location, setLocation] = React.useState(null);
  const [todayTeaPrice, setTodayTeaPrice] = React.useState(null);
  const [farmers, setFarmers] = React.useState([]);
  const [selectedFarmer, setSelectedFarmer] = React.useState('');
  const [selectedDate, setSelectedDate] = useState([
    moment(new Date()).format("YYYY-MM-DD"),
  ]);
  const [liveDate, setLiveDate] = useState(null);


  useEffect(  () => {
    setLoading(true);

    getFarmers();

  },[])

  const getFarmers = async () => {
    getVariables().then((res) => {
      setTodayTeaPrice(res.body.todayTeaPrice)
    });
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
    if(selectedFarmer === '') return notifyMessage("Please select a farmer",0)
    if (!data.weight || data.weight.trim() === "" )
      return notifyMessage("Weight can not be empty", 0);
    if (!data.cover_weight || data.cover_weight.trim() === "" )
      return notifyMessage("Bag weight can not be empty", 0);

    const obj = {
      numberOfKg : data.weight,
      bagWeight : data.cover_weight,
      todayTeaPrice : parseFloat(todayTeaPrice),
      date : selectedDate[0],
      userId : selectedFarmer
    }
    if(detials) {
      await updateTeaLeaveshandler(obj);
    } else {
      await addTeaLeavesHandler(obj);
    }
  };


  const addTeaLeavesHandler = async (obj) => {
    setApiLoader(true);
    await  addTeaLeaves(obj).then((res) => {
      if(res.success) {
        notifyMessage(res.message,1)
        if(updateHandler) updateHandler();
        closeModal();
      } else {
        notifyMessage(res.message,0);
      }
    }).finally(()=> { setApiLoader(false)});
  }

  const updateTeaLeaveshandler = async (id,obj) => {
    setApiLoader(true);
    await updateFarmer(id,obj).then((res) => {
      if(res.success) {
        notifyMessage(res.message,1)
        if(updateHandler) updateHandler();
        closeModal();
      } else {
        notifyMessage(res.message,0);
      }
    }).finally(()=> { setApiLoader(false)});
  }


  const weightInputHandler = (e,val) => {
    let name = e.target.name;
      if(val === "") {
        setData({...data,['net_weight'] : '',['total_amount']:'',[name]: val})
      } else {
        if(data.cover_weight) {
          if(data.cover_weight >= (val)) return notifyMessage("Please enter correct weight",0)
          let netVal = ((parseFloat(val)) - parseFloat(data.cover_weight));
          let tot = null
          if(todayTeaPrice) tot = (netVal * todayTeaPrice)
          setData({...data,['net_weight'] : netVal,['total_amount']:tot,[name]: val})
        } else {
          setData({...data,[name]: val})
        }
      }
  };

  const coverWeightInputHandler = (e,val) => {
    let name = e.target.name;
    if (val === "") {
      setData({...data, ['net_weight']: '', ['total_amount']: '', [name]: val})
    } else {
      if (data.weight) {
        if(val > (data.weight - 1)) return notifyMessage("Please enter correct bag weight",0)
        let netVal = ((parseFloat(data.weight)) - parseFloat(val));
        let tot = null
        if (todayTeaPrice) tot = (netVal * todayTeaPrice)
        setData({...data, ['net_weight']: netVal, ['total_amount']: tot, [name]: val})
      } else {
        setData({...data,[name]: val})
      }
    }
  }


  return (
    <>
      {loading ? <Loader/> :
        <div className="manage-form">
          <Label className={"font-medium-1"}>Today Tea Leaves Price for 1Kg : Rs {todayTeaPrice}</Label>
          <Row>
            <Col md={6}>
              <div className="text-wrapper tile-wrapper mt-1">
                <Label className={"required font-small-4"}>Select Farmer</Label>
                <Dropdown
                  disabled={false}
                  placeholder=""
                  className={"form-control"}
                  fluid
                  selection
                  search={true}
                  onChange={(e, { value }) => {
                    setSelectedFarmer(value);
                  }}
                  value={selectedFarmer}
                  options={farmers}
                  selectOnBlur={false}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"font-small-4"}>Given Date</Label>
                <Flatpickr
                    options={{
                      mode: "single",
                      minDate: moment().subtract(3, "months").toDate(),
                      maxDate: new Date(),
                    }}
                    className="form-control selected-date"
                    placeholder={"Select date range"}
                    value={liveDate ? liveDate : selectedDate}
                    onChange={(date) => {
                      setLiveDate(date);
                      setSelectedDate([moment(date[0]).format("YYYY-MM-DD")]);

                    }}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Weight (Kg)</Label>
                <Input
                  name={"weight"}
                  value={data.weight ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if(/^\d*$/.test(val) || val === '') {
                      weightInputHandler(e,val)
                    }
                  }}
                  type="text"
                  placeholder="Weight"
                  className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Bag Weight (Kg)</Label>
                <Input
                  name="cover_weight"
                  value={data.cover_weight}
                  // disabled={data.weight === null || data.weight === ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if(/^\d*$/.test(val) || val === '') {
                      coverWeightInputHandler(e,val)
                    }
                  }}
                  type="text"
                  placeholder="Cover Weight"
                  className={"mb-1"}
                />
              </div>
            </Col>


            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"font-small-4"}>Net Weight (Kg)</Label>
                <Input
                  name="net_weight"
                  value={data.net_weight ?? ""}
                  disabled
                  type="text"
                  placeholder="Net Weight"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"font-small-4"}>Total Amount (Rs)</Label>
                <Input
                    name="total_amount"
                    value={data.total_amount ?? ""}
                    disabled
                    type="text"
                    placeholder="Total Amount"
                    className={"mb-1"}
                />
              </div>
            </Col>




          </Row>

          <div className="d-flex justify-content-end">

            <button
              disabled={apiLoader}
              className="btn btn-primary mt-3"
              onClick={manageHandler}
            >
              {detials ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default AddLeaves;
