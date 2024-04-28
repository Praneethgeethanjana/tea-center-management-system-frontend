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
import {getAllStockItems} from "@src/services/stock";
import {Trash2} from "react-feather";
import {createOrder} from "@src/services/order";
const CreateOrder = ({ details, closeModal, updateHandler }) => {
    const [data, setData] = useState(details ?? {});
    const [loading, setLoading] = useState(false);
    const [apiLoader, setApiLoader] = useState(false);
    const [farmers, setFarmers] = useState([]);
    const [stockItems, setStockItems] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [selectedFarmer, setSelectedFarmer] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [totalAmount,setTotalAmount] = useState(0);
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
        getAllStockItems().then((response) => {
            if(response.success) {
                let array = []
                if(response?.body?.content) {
                    response.body.content.map((item,index) => {
                        let obj = {
                            key : item.id,
                            text : `${item.variant} - ${item.stockType.toLowerCase()}`,
                            value : item.id,
                            availableSize : item.availableSize,
                            oneKgPrice : item.oneKgPrice
                        }
                        array.push(obj);
                    });
                    setStockItems(array);
                }
            } else {
                setStockItems([]);
            }
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


    const addItemHandler = async () => {
        let array = orderData;
        array = array.filter((item) => item.key !== selectedVariant)
        let tot = 0;
        const filteredVariant = stockItems.find((item) => item.key == selectedVariant);
        const amount = (parseInt(data.size) * parseInt(filteredVariant.oneKgPrice))
        const obj = {...filteredVariant,size: data.size,amount: amount}
        array.push(obj);
        setOrderData(array);
        array.map((item)=> {
            tot = tot + item.amount
        })
        setTotalAmount(tot);
    }

    const removeItem = (id) => {
        let tot = 0;
        let array = orderData;
        array = array.filter((item) => item.key !== id)
        array.map((item)=> {
            tot = tot + item.amount
        })
        setOrderData(array)
        setTotalAmount(tot);
    };

    const manageHandler = async () => {
        const data = orderData
        const orderArray = []
        data.map((item)=> {
            let obj = {
                stockId : item.key,
                kg : item.size
            }
            orderArray.push(obj);
        });

        const obj = {
            farmerId : selectedFarmer,
            orderData : orderArray
        }
      await createOrderHandler(obj);
    };


    const createOrderHandler = async (obj) => {
        setApiLoader(true);
        await createOrder(obj).then((res) => {
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
                            <Col md={4}>
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
                                            setOrderData([]);
                                            setTotalAmount(0)
                                            setSelectedFarmer(value)
                                        }}
                                        value={selectedFarmer}
                                        options={farmers}
                                        selectOnBlur={false}
                                    />
                                </div>
                            </Col>
                        }

                        {!details &&
                            <Col md={4}>
                                <div className="text-wrapper tile-wrapper mt-1">
                                    <Label className={"required font-small-4"}>Select Variant</Label>
                                    <Dropdown
                                        disabled={details ? true : false}
                                        placeholder="Please select a variant"
                                        className={"form-control"}
                                        fluid
                                        selection
                                        search={true}
                                        onChange={(e, { value }) => {
                                            setSelectedVariant(value)
                                        }}
                                        value={selectedVariant}
                                        options={stockItems}
                                        selectOnBlur={false}
                                    />
                                </div>
                            </Col>
                        }

                        <Col md={4}>
                            <div className={"text-wrapper tile-wrapper mt-1"}>
                                <Label className={"required font-small-4"}>Size (Kg)</Label>
                                <Input
                                    name={"size"}
                                    value={data.size ?? ""}
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        if(val === "0") val = "10"
                                        if(/^\d*$/.test(val) || val === '') {
                                            inputHandler(e,val)
                                        }
                                    }}
                                    type="text"
                                    placeholder="Size of Kg"
                                    className={"mb-1"}
                                />
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className={"text-wrapper tile-wrapper"}>
                                <button
                                    disabled={selectedFarmer === '' || selectedVariant === '' || !data.size || data.size === ''}
                                    className="btn btn-primary"
                                    onClick={addItemHandler}
                                >
                                    {"Add"}
                                </button>
                            </div>
                        </Col>


                        <Col md={12}>
                            <div className={"text-wrapper tile-wrapper mt-2"}>
                                {orderData.length > 0 && <Row className='d-flex justify-content-between'>
                                   <Col><h5>Variant Name</h5></Col>
                                   <Col><h5>Available Size</h5></Col>
                                   <Col><h5>Price of 1 Kg</h5></Col>
                                   <Col><h5>Size</h5></Col>
                                   <Col><h5>Amount</h5></Col>
                                   <Col><h5>Remove</h5></Col>

                                </Row> }
                                {orderData.length > 0 && orderData.map((item,index) => (
                                    <Row className='d-flex justify-content-between mt-1'>
                                        <Col><p>{item.text}</p></Col>
                                        <Col>    <p>{item.availableSize} Kg</p></Col>
                                        <Col>   <p>Rs {item.oneKgPrice}</p></Col>
                                        <Col>  <p>{item.size} Kg</p></Col>
                                        <Col>  <p>Rs {item.amount}</p></Col>
                                        <Col>
                                            <Trash2 style={{cursor:'pointer'}} onClick={()=> {removeItem(item.key)}} size="20" />
                                        </Col>
                                    </Row>
                                    )
                                )}
                            </div>
                            {orderData.length > 0 && totalAmount && <h5 className="mt-2">Total Amount : Rs {totalAmount}</h5> }
                        </Col>



                    </Row>

                    <div className="d-flex justify-content-end">

                        <button
                            disabled={orderData.length === 0}
                            className="btn btn-primary mt-3"
                            onClick={manageHandler}
                        >
                            Order
                        </button>
                    </div>
                </div>
            }
        </>
    );
};

export default CreateOrder;
