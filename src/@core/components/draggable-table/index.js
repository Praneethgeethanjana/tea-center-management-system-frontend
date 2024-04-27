import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

let PICKUP = "PICKUP";

const DraggableTable = ({
  type,
  tableData,
  route,
  setTableData,
  setIsDragged,
  removeHandler,
}) => {
  const [items, setItems] = useState(tableData);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const itemsCopy = [...items];
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);
    setItems(itemsCopy);
    setTableData(itemsCopy);
    setIsDragged(true);
  };

  return (
    <div
      className="table-container draggableTable"
      style={{ width: "100%", overflowX: "auto" }}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="table">
          {(provided) => (
            <table {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                <tr>
                  <th className="" style={{ minWidth: "40px" }}></th>
                  <th className="" style={{ minWidth: "155px" }}>
                    SHIPMENT REFERENCE
                  </th>
                  <th className="" style={{ minWidth: "100px" }}>
                    {type === PICKUP ? "PICKUP STATUS" : "DELIVERY STATUS"}
                  </th>
                  <th style={{ minWidth: "160px" }} className="font-small-3">
                    COMPANY NAME
                  </th>
                  <th style={{ minWidth: "160px" }} className="font-small-3">
                    COMPANY NUMBER
                  </th>
                  <th style={{ minWidth: "120px" }} className="font-small-3">
                    POSTCODE
                  </th>
                  <th style={{ minWidth: "160px" }} className="font-small-3">
                    ADDRESS1
                  </th>
                  <th style={{ minWidth: "160px" }} className="font-small-3">
                    ADDRESS2
                  </th>
                  <th style={{ minWidth: "160px" }} className="font-small-3">
                    ADDRESS LATITUDE
                  </th>
                  <th style={{ minWidth: "160px" }} className="font-small-3">
                    ADDRESS LONGITUDE
                  </th>
                  <th style={{ minWidth: "150px" }} className="font-small-3">
                    BUILDING NAME
                  </th>
                  <th style={{ minWidth: "180px" }} className="font-small-3">
                    CONTACT EMAIL
                  </th>
                  <th style={{ minWidth: "150px" }} className="font-small-3">
                    CONTACT NAME
                  </th>
                  <th style={{ minWidth: "100px" }} className="font-small-3">
                    UNLOCO
                  </th>
                  <th style={{ minWidth: "100px" }} className="font-small-3">
                    COUNTRY
                  </th>
                  <th style={{ minWidth: "100px" }} className="font-small-3">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <Draggable
                    key={item.shipmentId}
                    draggableId={item.shipmentId.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <td
                          className="font-small-2"
                          style={{ minWidth: "40px", color: "black" }}
                        >
                          <p className="text-center"> {index + 1}</p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "155px" }}
                        >
                          {item.shipmentReference}
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "100px" }}
                        >
                          <p className="text-bold-500  mb-0">
                            {type === PICKUP
                              ? item.pickupStatus === "PICKED_UP"
                                ? "PICKEDUP"
                                : item.pickupStatus === "ASSIGNED_TO_DRIVER"
                                ? "ASSIGNED"
                                : item.pickupStatus.replace(/_/g, " ")
                              : item.deliveryStatus === "ASSIGNED_TO_DRIVER"
                              ? "ASSIGNED"
                              : item.deliveryStatus}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "160px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoCompanyName
                              : item.deliveryInfoCompanyName}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "160px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoContactNumber
                              : item.deliveryInfoContactNumber}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "120px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoPostcode
                              : item.deliveryInfoPostcode}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "160px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoAddress1
                              : item.deliveryInfoAddress1}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "160px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoAddress2
                              : item.deliveryInfoAddress2}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "160px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoAddressLat
                              : item.deliveryInfoAddressLat}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "160px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoAddressLng
                              : item.deliveryInfoAddressLng}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "150px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoBuildingName
                              : item.deliveryInfoBuildingName}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "180px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoContactEmail
                              : item.deliveryInfoContactEmail}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "150px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoContactName
                              : item.deliveryInfoContactName}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "120px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoUNLOCO
                              : item.deliveryInfoUNLOCO}
                          </p>
                        </td>
                        <td
                          className="font-small-2"
                          style={{ minWidth: "100px" }}
                        >
                          <p className="text-bold-500 text-truncate mb-0">
                            {type === PICKUP
                              ? item.pickupInfoCountry
                              : item.deliveryInfoCountry}
                          </p>
                        </td>
                        <td>
                          <div className={"mid-center"}>
                            <button
                              style={{
                                height: "34px",
                                width: "110px",
                                lineHeight: "11px",
                                fontSize: "14px",
                              }}
                              // disabled={route?.routeStatus !== "ACTIVE"}
                              disabled={
                                (route?.routeStatus !== "ACTIVE" &&
                                  route?.routeStatus !== "ONGOING") ||
                                (route?.routeStatus === "ONGOING" &&
                                type === PICKUP
                                  ? item.pickupStatus === "PICKED_UP" ||
                                    item.pickupStatus === "REJECTED"
                                  : item.deliveryStatus === "REJECTED" ||
                                    item.deliveryStatus === "DELIVERED")
                              }
                              className="btn btn-danger"
                              onClick={() => removeHandler(item.routeOrderId)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableTable;
