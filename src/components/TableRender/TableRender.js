import React from 'react';
import { Link } from 'react-router-dom';

export default class TableRender extends React.Component {
    render() {
        const header = this.props.header && this.props.header.map(this.getTableCell);
        const rows = this.props.data && this.props.data.map(this.getRenderedRow);

        return (
            <div className="table">
				<div className="table-header">
                    {header}
                </div>
                {rows}
			</div>
        );
    }

    getRenderedRow = (row, index) => {
        const id = row[0];
        const cells = row.map(this.getTableCell);


        return <div key={`${index} ${id}`} className="table-row">{cells}</div>;
    }

    getTableCell = (value, index) => {
        if (index === 0 && this.props.profileUrl && typeof value === 'number') {
            const url = this.props.profileUrl.concat(value);

            return (
                <div key={index} className="table-cell" title={value}>
                    <Link to={url}>{value}</Link>
                </div>
            );
        }
        return <div key={index} className="table-cell" title={value}>{value}</div>;
    }
}
