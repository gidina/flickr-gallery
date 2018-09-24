import React, { Component, Fragment } from "react";
import "./Pagination.css";

const defaultActive = 0;
const numItemsPage = 8;

class Pagination extends Component {
  state = { activePage: defaultActive };
  componentDidMount = () => {
    this.props.onPageChange(0, numItemsPage - 1);
  };
  onPageChangeHandler = indexPage => {
    const startIndexItem = indexPage * numItemsPage;
    const endIndexItem = startIndexItem + (numItemsPage - 1);

    this.props.onPageChange(startIndexItem, endIndexItem);
    this.setState({ activePage: indexPage });
  };
  render = () => {
    const { activePage } = this.state;
    const { numItems } = this.props;
    const totalPages = numItems ? Math.trunc(numItems / numItemsPage) + 1 : 0;
    const pagines = Array.from(Array(totalPages).keys());

    return (
      <div className="center">
        <ul className="pagination">
          <li
            onClick={() =>
              activePage > 0 ? this.onPageChangeHandler(activePage - 1) : null
            }
          >
            &laquo;
          </li>
          {pagines.map(indexPage => (
            <li
              key={indexPage}
              className={indexPage === activePage ? "active" : null}
              onClick={() => this.onPageChangeHandler(indexPage)}
            >
              {indexPage + 1}
            </li>
          ))}
          <li
            onClick={() =>
              activePage < totalPages - 1
                ? this.onPageChangeHandler(activePage + 1)
                : null
            }
          >
            &raquo;
          </li>
        </ul>
      </div>
    );
  };
}

// Pagination.protoTypes = {
//  numItems: PropTypes.number.integer.isRequired
// onPageChange: PropTypes.function.isRequires
// };

export default Pagination;
