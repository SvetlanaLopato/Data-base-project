import React from 'react';
import axios from 'axios';

import TableRender from 'components/TableRender/TableRender';

export default class TeacherTable extends React.Component {
    constructor(props) {
        super(props);

        const headerTitles = ['Teacher id', 'First name', 'Last name', 'Middle name', 'Login', 'Password', 'Email', 'Phone', 'Description'];

        this.state = {
            teachers: [],
            headerTitles,
            teachersProfileUrl: '/teachers/',
        };
    }

    componentWillMount() {
        axios.get('/api/teachers').then(({ data }) => {
            this.setState({ teachers: data });
        });
    }

	render() {
        const teachersValues = this.state.teachers.map(this.getTeachersValues);

		return (
            <div>
                <h3>Teacher table</h3>
                <TableRender header={this.state.headerTitles}
                            data={teachersValues}
                            profileUrl={this.state.teachersProfileUrl}
                />
            </div>
		);
	}

    getTeachersValues(teacher) {
        return [
            teacher.teacher_id,
            teacher.first_name,
            teacher.last_name,
            teacher.middle_name,
            teacher.login,
            teacher.password,
            teacher.email,
            teacher.phone,
            teacher.description
        ];
    }
}
