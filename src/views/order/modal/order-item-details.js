import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import DataTable from "react-data-table-component";
import {useSkin} from "@hooks/useSkin";
const OrderItemDetails = ({ details, closeModal , totalAmount}) => {
    const {skin} = useSkin();
    const [loading, setLoading] = useState(false);

    return (
        <>
            {loading ? <Loader/> :
                <div className="pkg-modal">
                    <div className="w-100">
                        <div className="w-100">
                            <DataTable
                                className={`dataTable-custom routeDetailsTable ${skin === "dark" ? "dark-table" : "light-table"}`}
                                data={details}
                                pointerOnHover
                                highlightOnHover
                                responsive
                                columns={[
                                    {
                                        name: "Variant",
                                        selector: (row) => row["stock"],
                                        sortable: false,
                                        minWidth: "60px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">{row.stock?.variant}</p>
                                        ),
                                    },
                                    {
                                        name: "Stock Type",
                                        selector: (row) => row["stock"],
                                        sortable: false,
                                        minWidth: "150px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                {row?.stock.stockType ?? "N/A"}
                                            </p>
                                        ),
                                    },
                                    {
                                        name: "Requested Size",
                                        selector: (row) => row["reqSize"],
                                        sortable: false,
                                        minWidth: "80px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                {row.reqSize ?? "N/A"} Kg
                                            </p>
                                        ),
                                    },
                                    {
                                        name: "Price for 1Kg",
                                        selector: (row) => row["oneKgPrice"],
                                        sortable: false,
                                        minWidth: "100px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                Rs {row.oneKgPrice ?? "N/A"}
                                            </p>
                                        ),
                                    },
                                    {
                                        name: "Amount",
                                        selector: (row) => row["stockPrice"],
                                        sortable: false,
                                        minWidth: "80px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                Rs {row.stockPrice ?? "N/A"}
                                            </p>
                                        ),
                                    },
                                ]}
                                noHeader={true}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <h5>Total Amount : Rs {totalAmount}</h5>
                        <button className="btn btn-primary" onClick={() => closeModal()}>
                            Ok
                        </button>
                    </div>
                </div>
            }
        </>
    );
};

export default OrderItemDetails;
