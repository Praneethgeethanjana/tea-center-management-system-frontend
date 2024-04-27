import React, { Component } from "react";

class Pagination extends Component {
  handlePagination(activePage) {
    this.props.handlePagination(activePage);
  }

  renderPaginationItems(active, totalNoOfPages) {
    const items = [];
    let start;
    let prev;
    let next;
    if (active - 2 <= 0) {
      if (active - 1 <= 0) {
        start = 1;
        prev = 1;
      } else {
        start = active - 1;
        prev = start;
      }
    } else if (active === totalNoOfPages) {
      start = active - 2;
      prev = active - 1;
    } else {
      start = active - 1;
      prev = active - 1;
    }
    let end;
    if (start + 2 > totalNoOfPages) {
      if (start + 1 > totalNoOfPages) {
        end = totalNoOfPages;
        next = end;
      } else {
        end = start + 1;
        next = end === active ? active : active + 1;
        next = end === active ? active : active + 1;
      }
    } else {
      end = start + 2;
      next = end === active ? active : active + 1;
    }
    items.push(
      <li className="page-item" key="First">
        <a
          className="page-link text_regular"
          style={{ cursor: active !== 1 ? "pointer" : "not-allowed" }}
          onClick={active !== 1 ? this.handlePagination.bind(this, 1) : null}
        >
          &laquo;
        </a>
      </li>,
      <li className="page-item" key="Prev">
        <a
          className="page-link text_regular"
          style={{ cursor: active !== 1 ? "pointer" : "not-allowed" }}
          onClick={active !== 1 ? this.handlePagination.bind(this, prev) : null}
        >
          &lsaquo;
        </a>
      </li>
    );
    for (let i = start; i <= end; i += 1) {
      items.push(
        <li
          className={i === active ? "page-item active" : " page-item"}
          key={i}
        >
          <a
            className="page-link text_regular"
            style={{ cursor: active !== i ? "pointer" : "not-allowed" }}
            onClick={active !== i ? this.handlePagination.bind(this, i) : null}
          >
            {i}
          </a>
        </li>
      );
    }
    items.push(
      <li className="page-item" key="Next">
        <a
          className="page-link text_regular"
          style={{
            cursor: active !== totalNoOfPages ? "pointer" : "not-allowed",
          }}
          onClick={
            active !== totalNoOfPages
              ? this.handlePagination.bind(this, next)
              : null
          }
        >
          &rsaquo;
        </a>
      </li>,
      <li className="page-item" key="Last">
        <a
          className="page-link text_regular"
          style={{
            cursor: active !== totalNoOfPages ? "pointer" : "not-allowed",
          }}
          onClick={
            active !== totalNoOfPages
              ? this.handlePagination.bind(this, totalNoOfPages)
              : null
          }
        >
          &raquo;
        </a>
      </li>
    );
    return items;
  }
  render() {
    return (
      <nav
        style={this.props.style}
        aria-label="Page navigation example"
        className={"pagination-wrapper"}
      >
        <ul className="pagination">
          {this.renderPaginationItems(
            this.props.activePage,
            this.props.totalNoOfPages
          )}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
