import { Col, Row } from "reactstrap";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";

const PDF = ({ data }) => {
  useEffect(() => {}, []);

  return (
    <div className="w-100">
      <h2 className="text-center">Shipment Report</h2>
      <Row>
        <Col xs={12} className={"datatable-main-wrapper mt-1"}>
          <div>
            <DataTable
              className="dataTable-custom light-table"
              data={data}
              pointerOnHover
              highlightOnHover
              responsive
              columns={[
                {
                  name: "SHIPMENT REFERENCE",
                  selector: (row) => row["shipmentReference"],
                  sortable: false,
                  minWidth: "200px",
                  cell: (row) => (
                    <p className="text-bold-500 text-truncate mb-0">
                      {row.shipmentReference}
                    </p>
                  ),
                },
                {
                  name: "PO NUMBER",
                  selector: (row) => row["poNumber"],
                  sortable: false,
                  minWidth: "120px",
                  cell: (row) => (
                    <p className="text-bold-500 text-truncate mb-0">
                      {row.poNumber}
                    </p>
                  ),
                },
                {
                  name: "DELIVERY DATE",
                  selector: (row) => row["deliveryDateFrom"],
                  sortable: false,
                  minWidth: "160px",
                  cell: (row) => (
                    <p className="text-bold-500 text-truncate mb-0">
                      {row.deliveryDateFrom.split("T")[0]}
                    </p>
                  ),
                },
                // {
                //   name: "Delivery Date To",
                //   selector: (row) => row["deliveryDateTo"],
                //   sortable: true,
                //   minWidth: "200px",
                //   cell: (row) => (
                //     <p className="text-bold-500 text-truncate mb-0">
                //       {row.deliveryDateTo.split("T")[0]}
                //     </p>
                //   ),
                // },
                // {
                //   name: "ORG CODE",
                //   selector: (row) => row["deliveryInfoOrgCode"],
                //   minWidth: "130px",
                //   sortable: true,
                //   cell: (row) => (
                //     <p className="text-bold-500 text-truncate mb-0">
                //       {row.deliveryInfoOrgCode.replace(/_/g, " ")}
                //     </p>
                //   ),
                // },
                {
                  name: "COMPANY NAME",
                  selector: "deliveryInfoCompanyName",
                  minWidth: "170px",
                  sortable: false,
                  cell: (row) => (
                    <p className="text-bold-500 text-truncate mb-0">
                      {row.deliveryInfoCompanyName ?? "N/A"}
                    </p>
                  ),
                },
                {
                  name: "DELIVERY STATUS",
                  selector: (row) => row["status"],
                  minWidth: "150px",
                  sortable: false,
                  cell: (row) => (
                    <p className="text-bold-500 text-truncate mb-0">
                      {row.status === "ASSIGNED_TO_DRIVER"
                        ? "ASSIGNED"
                        : row.status.replace(/_/g, " ")}
                    </p>
                  ),
                },
                {
                  name: "DRIVER",
                  selector: (row) => row["username"],
                  sortable: false,
                  minWidth: "200px",
                  cell: (row) => (
                    <p className="text-bold-500 mb-0">
                      {row.username ?? "NOT ASSIGNED"}
                    </p>
                  ),
                },
              ]}
              noHeader={true}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PDF;
