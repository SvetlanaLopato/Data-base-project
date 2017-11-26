import React from 'react';
import axios from 'axios';

export default class CreateGroupCourse extends React.Component {
    componentWillMount() {
        this.updateState();
    }

   render() {
        const groupCourseIdField = this.props.editMode && this.getGroupCourseIdField();

        return (
            <form onSubmit={this.createGroupCourse}>
                <div className="create-form">
                    {groupCourseIdField}
                    <div className="form-field">
                        <label className="required-field">Course:</label>
                        <input value={this.state.course} onChange={this.onCourseChange} type="number" placeholder="Enter course..." required />
                        {this.state.courseInvalid && <span className="error-message">*Course should be from 1 to 4</span>}
                    </div>
                    <div className="form-field">
                        <label className="required-field">Group:</label>
                        <input value={this.state.group} onChange={this.onGroupChange} type="number" placeholder="Enter  group..." required />
                    </div>
                    <div className="form-field">
                        <label>Title:</label>
                        <input value={this.state.title} onChange={this.onTitleChange} type="text" placeholder="Enter title..." />
                    </div>
                    <button className="submit-button">Submit</button>
               </div>
            </form>
        );
   }

   updateState = (groupCourse = {}) => {
        this.setState({
            course: groupCourse.course || '',
            group: groupCourse.group || '',
            title: groupCourse.title || '',
        });
   }

   getGroupCourseIdField = () => {
        return (
            <div className="form-field">
                <label className="required-field">Group/Course id:</label>
                <input onChange={this.onGroupCourseIdCange} type="number" placeholder="Enter group/course id..." required />
            </div>
        );
   }

    onGroupCourseIdCange = (event) => {
        const groupCourseId = event.target.value;

        this.setState({ groupCourseId });

        if (!groupCourseId) {
            this.updateState({});
            return;
        }

        axios.get(`/api/groupsCourses/${groupCourseId}`).then(({ data }) => {
            const groupCourse = data[0];

            this.updateState(groupCourse);
        });
    }

   createGroupCourse = (event) => {
        if (this.state.courseInvalid) {
            event.preventDefault();
            return;
        }

        const { groupCourseId, ...groupCourse } = this.state;

        if (this.props.editMode) {
            axios.put(`/api/groupsCourses/${groupCourseId}`, groupCourse);
        } else {
            axios.post('/api/groupsCourses', groupCourse);
        }
   }

    onCourseChange = (event) => {
        const course = event.target.value;
        const minCourseValue = 1;
        const maxCourseValue = 4;

        this.setState({
            course,
            courseInvalid: course < minCourseValue || course > maxCourseValue,
        });
    }

    onGroupChange = (event) => {
        this.setState({ group: event.target.value });
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }
}
