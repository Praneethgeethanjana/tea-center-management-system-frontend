import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import { createFarmer, updateFarmer } from "@src/services/farmers";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import {addStock, updateStock} from "@src/services/stock";
import {updateAdvance} from "@src/services/advance";
const CreateVariant = ({ details, closeModal, updateHandler }) => {
  const [data, setData] = useState(details ?? {});
  const [loading, setLoading] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [stockType, setStockType] = React.useState("TEA");
  const [selectedDate, setSelectedDate] = useState([
    moment(new Date()).format("YYYY-MM-DD"),
  ]);
  const [liveDate, setLiveDate] = useState(null);


  useEffect( () => {
    setLoading(true);
    if(details) {
      let obj = {
        variantName : details.variant,
        size : details.availableSize,
        price : details.oneKgPrice
      }
      setData(obj)
      setStockType(details.stockType)
    }

    setLoading(false)

  },[])



  const manageHandler = async () => {
    if (!data.variantName || data.variantName.trim() === "" )
      return notifyMessage("Variant name can not be empty", 0);
    if (!data.size || data.size === "" )
      return notifyMessage("Size can not be empty", 0);
    if (!data.price || data.price === "" )
      return notifyMessage("Price can not be empty", 0);

    const obj = {
      stockType : stockType,
      variant : data.variantName,
      size : data.size,
      oneKgPrice : parseFloat(data.price)
    }
    if(details) {
      await updateStockHandler(details.id,obj);
    } else {
      await createStock(obj);
    }
  };


  const createStock = async (obj) => {
    setApiLoader(true);
    await  addStock(obj).then((res) => {
      if(res.success) {
        notifyMessage(res.message,1)
        if(updateHandler) updateHandler();
        closeModal();
      } else {
        notifyMessage(res.message,0);
      }
    }).finally(()=> { setApiLoader(false)});
  }

  const updateStockHandler = async (id,obj) => {
    setApiLoader(true);
    await updateStock(id,obj).then((res) => {
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
            <Col md={6}>
              <div className="text-wrapper tile-wrapper mt-1">
                <Label className={"required font-small-4"}>Select Stock</Label>
                <Dropdown
                  disabled={false}
                  placeholder=""
                  className={"form-control"}
                  fluid
                  selection
                  search={false}
                  onChange={(e, { value }) => {
                   setStockType(value)
                  }}
                  value={stockType}
                  options={[
                    { key: "TEA", text: "Tea", value: "TEA" },
                    { key: "FERTILIZER", text: "Fertilizer", value: "FERTILIZER" },
                  ]}
                  selectOnBlur={false}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Variant Name</Label>
                <Input
                  name={"variantName"}
                  value={data.variantName ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                      inputHandler(e,val)
                  }}
                  type="text"
                  placeholder="Variant Name"
                  className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"required font-small-4"}>Size</Label>
                <Input
                  name={"size"}
                  value={data.size ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if(/^\d*$/.test(val) || val === '') {
                      inputHandler(e,val)
                    }
                  }}
                  type="text"
                  placeholder="Size"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"required font-small-4"}>Price</Label>
                <Input
                  name="price"
                  value={data.price ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if(/^\d*$/.test(val) || val === '') {
                      inputHandler(e,val)
                    }
                  }}
                  type="text"
                  placeholder="Price"
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
              {details ? "Update" : "Add"}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default CreateVariant;
