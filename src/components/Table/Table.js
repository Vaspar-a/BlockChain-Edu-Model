import React, { Component } from "react";
import "./table.css";

class Table extends Component {
  constructor(props) {
    super(props);

    this.refer = { tableContainer: React.createRef(), table: React.createRef() };

    this.state = {
      header: [],
      body: [],
    };
  }

  componentDidMount() {
    this.setState({
      header: this.props.header,
      body: this.props.body,
    });
  }

  render() {
    const thElements = this.state.header.map((cell, index) => {
      return (
        <th className="header-cell freeze-header-cell" key={`h${index}`}>
          {cell}
        </th>
      );
    });

    const trElements = this.props.body.map((row, rowIndex) => {
      const tdElements = row.map((cell, colIndex) => {
        return (
          <td className="body-cell" key={`r${rowIndex}c${colIndex}`}>
            {cell}
          </td>
        );
      });
      return <tr key={`r${rowIndex}`}>{tdElements}</tr>;
    });

    // const table = document.querySelector('table');
    // console.log(this.refer.tableContainer.current);
    // const tableHeight = getComputedStyle(table).getPropertyValue("height");
    // this.refer.tableContainer.current.style.height = tableHeight;

    return (
      <div className="table-container" ref={this.refer.tableContainer}>
        <table className="table" cellSpacing="0" cellPadding="0" ref={this.refer.table}>
          <thead className="thead"><tr>{thElements}</tr></thead>
          <tbody className="tbody">{trElements}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
