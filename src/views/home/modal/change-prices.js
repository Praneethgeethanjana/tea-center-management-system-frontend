import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import {createFarmer, getAllFarmers, updateFarmer} from "@src/services/farmers";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import {changePrices, getVariables} from "@src/services/statistics";
import {createAdvance, updateAdvance} from "@src/services/advance";
const ChangePrices = ({ todayTeaPrice,teaCenterCharge,teaFactoryPrice, closeModal, updateHandler }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiLoader, setApiLoader] = useState(false);


    useEffect( () => {
        setLoading(true);
        if(todayTeaPrice || teaFactoryPrice || teaCenterCharge) {
            setData({ ...data, factoryPrice: teaFactoryPrice, centerCharge: teaCenterCharge , todayPrice:todayTeaPrice})
        }
        setLoading(false)

    },[])





    const manageHandler = async () => {
        if (!data.factoryPrice || data.factoryPrice === "") notifyMessage("Factory price can not be empty",0)
        if (!data.centerCharge || data.centerCharge === "") notifyMessage("Tea center charge can not be empty",0)
        if (!data.todayPrice || data.todayPrice === "") notifyMessage("Today Price can not be empty",0)

        const obj = {
            "todayTeaPrice" : data.todayPrice,
            "teaFactoryPrice" : data.factoryPrice,
            "teaCenterCharge" : data.centerCharge,
            "bagWeight" : 2
        }

        await changePriceHandler(obj);
    };


    const changePriceHandler = async (obj) => {
        setApiLoader(true);
        console.log("Variable",obj)
        await changePrices(obj).then((res) => {
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
        if(name === "factoryPrice") {
            if(val == "") {
                setData({ ...data, [name]: val ,["todayPrice"]:0});
            } else {
                if(data.centerCharge) {
                    let tot = (parseInt(val) + parseInt(data.centerCharge))
                    setData({ ...data, [name]: val ,["todayPrice"]:tot});
                } else {
                    setData({ ...data, [name]: val });
                }
            }
        } else {
            if(data.factoryPrice) {
                if(val == "") {
                    setData({ ...data, [name]: val ,["todayPrice"]:""});
                } else {
                    let tot = (parseInt(data.factoryPrice) + parseInt(val))
                    setData({ ...data, [name]: val ,["todayPrice"]:tot});
                }

            }
        }

    };



    return (
        <>
            {loading ? <Loader/> :
                <div className="manage-form">
                    <Row>
                        <Col md={6}>
                            <div className={"text-wrapper tile-wrapper mt-1"}>
                                <Label className={"required font-small-4"}>Factory Price - 1Kg (Rs)</Label>
                                <Input
                                    name={"factoryPrice"}
                                    value={data.factoryPrice ?? ""}
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        if(/^\d*$/.test(val) || val === '') {
                                            inputHandler(e,val)
                                        }
                                    }}
                                    type="text"
                                    placeholder="Factory Price"
                                    className={"mb-1"}
                                />
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className={"text-wrapper tile-wrapper mt-1"}>
                                <Label className={"required font-small-4"}>Tea center charge - 1Kg (Rs)</Label>
                                <Input
                                    name={"centerCharge"}
                                    value={data.centerCharge ?? ""}
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        if(/^\d*$/.test(val) || val === '') {
                                            inputHandler(e,val)
                                        }
                                    }}
                                    type="text"
                                    placeholder="Tea center charge"
                                    className={"mb-1"}
                                />
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className={"text-wrapper tile-wrapper mt-1"}>
                                <Label className={"required font-small-4"}>Today tea leaves price for 1 Kg (Rs)</Label>
                                <Input
                                    name={"todayPrice"}
                                    disabled
                                    value={data.todayPrice ?? ""}
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        if(/^\d*$/.test(val) || val === '') {
                                            inputHandler(e,val)
                                        }
                                    }}
                                    type="text"
                                    placeholder="Today Price"
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
                          Update
                        </button>
                    </div>
                </div>
            }
        </>
    );
};

export default ChangePrices;
