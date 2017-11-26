import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import CommentsTable from 'components/Comments/CommentsTable/CommentsTable';
import CreateComment from 'components/Comments/CreateComment/CreateComment';
import CreateTeacherSubject from '../CreateTeacherSubject/CreateTeacherSubject';
import TeacherSubjectsTable from '../TeacherSubjectsTable/TeacherSubjectsTable';

class TeacherProfileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = { teacher: {} };
    }

    componentWillMount() {
        axios.get(`/api/teachers/${this.props.match.params.id}`).then(({ data }) => {
            const teacher = data[0] || {};

			this.setState({ teacher });
		});
    }

    render() {
        const teacherId = this.props.match.params.id;
        const { teacher } = this.state;

        return (
            <div>
                <div className="profile-info">
                    <div><span>Name:</span>{`${teacher.first_name} ${teacher.last_name} ${teacher.middle_name}`}</div>
                    <div><span>Email:</span>{teacher.email}</div>
                    <div><span>Login:</span>{teacher.login}</div>
                    <div><span>Password:</span>{teacher.password}</div>
                    <div><span>Phone:</span>{teacher.phone}</div>
                    <div><span>Description:</span>{teacher.description}</div>
                </div>
                <h3>Create teacher subject</h3>
                <CreateTeacherSubject teacherId={teacherId} />
                <h3>Edit teacher subject</h3>
                <CreateTeacherSubject editMode={true} teacherId={teacherId} />
                <TeacherSubjectsTable teacherId={teacherId} />
                <h3>Create comment</h3>
                <CreateComment teacherId={teacherId} />
                <h3>Edit comment</h3>
                <CreateComment editMode={true} />
                <CommentsTable teacherId={teacherId} />
            </div>
        );
    }
}

const TeacherProfile = withRouter(TeacherProfileComponent);

export default TeacherProfile;
