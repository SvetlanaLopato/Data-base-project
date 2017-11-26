import React from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default class TableSorter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const radioButtons = this.props.options && this.props.options.map(this.getOptions);

        return (
            <div className="table-manager">
                <label>Sort by:</label>
                <RadioGroup onChange={this.onSortByChange}>
                    {radioButtons}
                </RadioGroup>
                <button onClick={this.onClick} className="submit-button">Submit</button>
            </div>
        );
    }

    getOptions = ({ value, label }) => {
        const greyDarkColor = '#cdc7c7';
        const emeraldColor = '#92d8c6';

        return (
            <RadioButton key={value} padding={10} rootColor={greyDarkColor} pointColor={emeraldColor} value={value}>
                {label}
            </RadioButton>
        );
    }

    onSortByChange = (value) => {
        this.setState({ sortBy: value });
    }

    onClick = () => {
        this.state.sortBy && this.props.onSort(this.state.sortBy);
    }
}
