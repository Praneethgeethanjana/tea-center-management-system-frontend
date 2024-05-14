import React, { useEffect, useState } from "react";
import Loader from "@components/spinner/Loader";
import DataTable from "react-data-table-component";
import {useSkin} from "@hooks/useSkin";
const AdvanceRecords = ({ details, closeModal , totalAmount}) => {
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
                                        name: "ID",
                                        selector: (row) => row["id"],
                                        sortable: false,
                                        minWidth: "60px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">{row.id ?? 'N/A'}</p>
                                        ),
                                    },
                                    {
                                        name: "Date",
                                        selector: (row) => row["created"],
                                        sortable: false,
                                        minWidth: "60px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">{row.created ? row.created.split("T")[0] : 'N/A'}</p>
                                        ),
                                    },
                                    {
                                        name: "Amount",
                                        selector: (row) => row["totalPrice"],
                                        sortable: false,
                                        minWidth: "80px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                Rs {row.amount ?? "N/A"}
                                            </p>
                                        ),
                                    },
                                ]}
                                noHeader={true}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <h5>Total Advanced Amount : Rs {totalAmount}</h5>
                        <button className="btn btn-primary" onClick={() => closeModal()}>
                            Ok
                        </button>
                    </div>
                </div>
            }
        </>
    );
};

export default AdvanceRecords;
