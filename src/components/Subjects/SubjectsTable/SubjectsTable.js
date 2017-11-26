import React from 'react';
import axios from 'axios';

import TableRender from 'components/TableRender/TableRender';

export default class SubjectTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            headerTitles: ['Subejct id', 'Name', 'Hours', 'Control type', 'Semester', 'Description'],
        };
    }

    componentWillMount() {
        axios.get('/api/subjects').then(({ data }) => {
            this.setState({ subjects: data });
        });
    }

	render() {
        const subjectsValues = this.state.subjects.map(this.getSubjectsValues);

		return (
            <div>
                <h3>Subject table</h3>
                <TableRender header={this.state.headerTitles} data={subjectsValues}/>
            </div>
		);
	}

    getSubjectsValues(groupCourse) {
        return [
            groupCourse.subject_id,
            groupCourse.subject_name,
            groupCourse.subject_hours,
            groupCourse.control_type,
            groupCourse.semester,
            groupCourse.description,
        ];
    }
}
