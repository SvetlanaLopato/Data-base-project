import React from 'react';
import axios from 'axios';

import TableRender from 'components/TableRender/TableRender';

export default class TeacherSubjectsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            headerTitles: ['Teacher/Subject id', 'Teacher', 'Subject', 'Control type', 'Semester', 'Subject year'],
        };
    }

    componentWillMount() {
        const { teacherId } = this.props;

        axios.get(`/api/teachers/${teacherId}/subjects`).then(({ data }) => {
            this.setState({ subjects: data });
        });
    }

	render() {
        const subjectsValues = this.state.subjects.map(this.getSubjectsValues);

		return (
            <div>
                <h3>Teacher subject table</h3>
                <TableRender header={this.state.headerTitles} data={subjectsValues}/>
            </div>
		);
	}

    getSubjectsValues(subject) {
        const teacherName = `${subject.t_first_name} ${subject.t_last_name} ${subject.t_middle_name}`;

        return [
            subject.teacher_subject_id,
            teacherName,
            subject.subject_name,
            subject.control_type,
            subject.semester,
            subject.subject_year,
        ];
    }
}
