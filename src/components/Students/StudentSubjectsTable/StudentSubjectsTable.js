import React from 'react';
import axios from 'axios';

import TableRender from 'components/TableRender/TableRender';

export default class StudentSubjectsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            headerTitles: ['Student', 'Subject', 'Control type', 'Semester', 'Mark', 'Pass exam'],
        };
    }

    componentWillMount() {
        axios.get(`/api/students/${this.props.studentId}/subjects`).then(({ data }) => {
            this.setState({ subjects: data });
        });
    }

	render() {
        const subjectsValues = this.state.subjects.map(this.getGroupsCoursesValues);

		return (
            <div>
                <h3>Subject table</h3>
                <TableRender header={this.state.headerTitles} data={subjectsValues}/>
            </div>
		);
	}

    getGroupsCoursesValues(subject) {
        const studentName = `${subject.s_first_name} ${subject.s_last_name} ${subject.s_middle_name}`;

        return [
            studentName,
            subject.subject_name,
            subject.control_type,
            subject.semester,
            subject.mark,
            subject.pass_exam ? 'true' : 'false',
        ];
    }
}
