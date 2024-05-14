import {
    Col, Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";

import {
    checkAMPM,
    downloadCSV, errorSweetAlert,
    notifyMessage
} from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import moment from "moment/moment";
import { Checkbox, Dropdown, Form } from "semantic-ui-react";
import Flatpickr from "react-flatpickr";
import { Box, Eye, File, Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import MakePayment from "@src/views/payments/modal/make-payment";
import {getPaymentHistory, getPaymentHistoryForReport, getPendingPayments} from "@src/services/payments";
import Pagination from "@components/pagination";
import MonthPicker from "@components/month-picker";
import {useSkin} from "@hooks/useSkin";
import {getAllFarmers} from "@src/services/farmers";
import MultipleLocations from "@components/google-map/multiple-locations";


const Locations = () => {
    const {skin} = useSkin();
    const [loader, setLoader] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
    const [selectedAdvances, setSelectedAdvances] = useState(null);
    const [selectedOrderList, setSelectedOrderList] = useState(null);
    const [selectedTeaLeavesList, setSelectedTeaLeavesList] = useState(null);
    const [keyword, setKeyword] = useState("");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const initialDate = `${currentYear}/${currentMonth.toString().padStart(2, '0')}`;
    const [date, setDate] = useState(new Date(initialDate));
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
         setLoader(true);
        getAllFarmersHandler();
    }, [keyword]);

    const getAllFarmersHandler = async () => {
        setLoader(true);
        await getAllFarmers().then((res) => {
            if(res.success) {
                let arr = []
                if(res.body && res.body?.content) {
                    let farmers = res.body.content
                    console.log("farmers",farmers)
                    if(farmers.length > 0 ) {
                        farmers.map((item)=> {
                            let obj = {
                                name : `${item.firstName} ${item.lastName}`,
                                position : {
                                    lat : parseFloat(item.latitude),
                                    lng : parseFloat(item.longitude)
                                }
                            }
                            arr.push(obj)
                        });
                        setLocations(arr);
                    }
                }
            } else {
                    setLocations([]);
            }
        }).finally(() => {setLoader(false);})
    }




    return (
        <div>
            <Row className={"main-row"}>
                <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
                    <Label className="font-medium-2 mt-1">All Tea Areas</Label>
                </div>

                {loader ? (
                    <Loader />
                ) : locations.length === 0 ? (
                    <div className="py-5 w-100 d-flex justify-content-center">
                        <Label className="font-medium-3 p-5">No Locations</Label>
                    </div>
                ) : (
                    <Col xs={12} className={" mt-2"}>
                        <MultipleLocations
                            zoom={17}
                            isRouteView={false}
                            viewAll={true}
                            // centerObj={centerObj}
                            locationsData={locations}
                        />
                    </Col>
                )}
            </Row>


        </div>
    );
};

export default Locations;
