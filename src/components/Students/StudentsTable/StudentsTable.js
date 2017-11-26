import React from 'react';
import axios from 'axios';

import TableRender from 'components/TableRender/TableRender';

export default class StudentsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            headerTitles: ['Students id', 'First name', 'Last name', 'Middle name', 'Date of birth', 'Phone', 'Email', 'Course', 'Group'],
            studentsProfileUrl: '/students/',
        };
    }

    componentWillMount() {
        axios.get('/api/students').then(({ data }) => {
            this.setState({ students: data });
        });
    }

	render() {
        const studentsValues = this.state.students.map(this.getStudentsValues);

		return (
            <div>
                <h3>Students table</h3>
                <TableRender header={this.state.headerTitles}
                            data={studentsValues}
                            profileUrl={this.state.studentsProfileUrl}
                />
            </div>
		);
	}

    getStudentsValues(student) {
        const dateOfBirth = new Date(student.date_of_birth).toISOString().split('T')[0].replace(new RegExp('-', 'g'), '/')

        return [
            student.student_id,
            student.first_name,
            student.last_name,
            student.middle_name,
            dateOfBirth,
            student.phone,
            student.email,
            student.course,
            student.group,
        ];
    }
}
