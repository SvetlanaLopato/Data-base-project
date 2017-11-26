import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import CommentsTable from 'components/Comments/CommentsTable/CommentsTable';
import CreateComment from 'components/Comments/CreateComment/CreateComment';
import CreateStudentSubject from '../CreateStudentSubject/CreateStudentSubject';
import StudentSubjectsTable from '../StudentSubjectsTable/StudentSubjectsTable';

class StudentProfileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state ={ student: {} };
    }

    componentWillMount() {
        axios.get(`/api/students/${this.props.match.params.id}`).then(({ data }) => {
            const student = data[0];

			this.setState({ student });
		});
    }

    render() {
        const studentId = this.props.match.params.id;
        const { student } = this.state;

        return (
            <div>
                <div className="profile-info">
                    <div><span>Name:</span>{`${student.first_name} ${student.last_name} ${student.middle_name}`}</div>
                    <div><span>Date of birth:</span>{student.date_of_birth}</div>
                    <div><span>Email:</span>{student.email}</div>
                    <div><span>Phone:</span>{student.phone}</div>
                    <div><span>Group:</span>{student.group}</div>
                    <div><span>Course:</span>{student.course}</div>
                </div>
                <h3>Create/edit student subject</h3>
                <CreateStudentSubject studentId={studentId} />
                <StudentSubjectsTable studentId={studentId} />
                <h3>Create comment</h3>
                <CreateComment studentId={studentId} />
                <h3>Edit comment</h3>
                <CreateComment editMode={true} />
                <CommentsTable studentId={studentId} />
            </div>
        );
    }
}

const StudentProfile = withRouter(StudentProfileComponent);

export default StudentProfile;
