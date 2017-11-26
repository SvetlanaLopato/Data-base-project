import React from 'react';
import axios from 'axios';

export default class CreateStudent extends React.Component {
    componentWillMount() {
        axios.get('/api/groupsCourses').then(({ data }) => {
            this.setState({ groupsCourses: this.getGroupsCourses(data) });
        });

        this.updateState();
	}

   render() {
       const groupCourseOptions = this.state.groupsCourses && this.state.groupsCourses.map(this.getOption);
       const studentIdField = this.props.editMode && this.getStudentIdField();
       const today = new Date().toISOString().split('T')[0];

       return (
           <form onSubmit={this.createStudent}>
               <div className="create-form">
                   {studentIdField}
                   <div className="form-field">
                       <label className="required-field">First name:</label>
                       <input value={this.state.firstName} onChange={this.onFirstNameChange} type="text" placeholder="Enter first name..." required />
                   </div>
                   <div className="form-field">
                       <label className="required-field">Last name:</label>
                       <input value={this.state.lastName} onChange={this.onLastNameChange} type="text" placeholder="Enter last name..." required />
                   </div>
                   <div className="form-field">
                       <label>Middle name:</label>
                       <input value={this.state.middleName} onChange={this.onMiddleNameChange} type="text" placeholder="Enter middle name..." />
                   </div>
                   <div className="form-field">
                       <label className="required-field">Date of birth:</label>
                       <input value={this.state.dateOfBirth} onChange={this.onDateOfBirthChange} type="date" max={today} required />
                   </div>
                    <div className="form-field">
                        <label className="required-field">Phone:</label>
                        <input value={this.state.phone} onChange={this.onPhoneChange} type="text" placeholder="Enter phone..." required />
                    </div>
                    <div className="form-field">
                        <label className="required-field">Email:</label>
                        <input value={this.state.email} onChange={this.onEmailChange} type="email" placeholder="Enter email..." required />
                    </div>
                    <div className="form-field">
						<label className="required-field">Group/Course:</label>
						<select onChange={this.onGroupCourseChange} value={this.state.groupCourseId} required>
							<option defaultValue value="">Select group and course...</option>
							{groupCourseOptions}
						</select>
					</div>
                   <button className="submit-button">Submit</button>
               </div>
           </form>
       );
   }

   getGroupsCourses(groupsCourses) {
       return groupsCourses.map(({ course, group, title, group_course_id }) => ({
           label: `${course} course, ${group} group${title ? ', ' + title : ''}`,
           value: group_course_id,
       }));
   }

   getOption({ label, value }) {
       return <option key={`${value}_${label}`} value={value}>{label}</option>
   }

   getStudentIdField = () => {
       return (
           <div className="form-field">
               <label className="required-field">Sudent id:</label>
               <input onChange={this.onIdCange} value={this.state.studentId} type="number" placeholder="Enter student id..." required />
           </div>
       );
   }

   onIdCange = (event) => {
       const studentId = event.target.value;

       this.setState({ studentId });

       if (!studentId) {
           this.updateState({});
           return;
       }

       axios.get(`/api/students/${studentId}`).then(({ data }) => {
           const student = data[0];

           this.updateState(student);
       });
   }

   updateState = (student = {}) => {
       let dateOfBirth = '';

       if (student.date_of_birth) {
           dateOfBirth = new Date(student.date_of_birth).toISOString().split('T')[0];
       }

       this.setState({
           firstName: student.first_name || '',
           lastName: student.last_name || '',
           middleName: student.middle_name || '',
           dateOfBirth,
           phone: student.phone || '',
           email: student.email || '',
           groupCourseId: student.group_course_id || '',
       });
   }

   createStudent = () => {
       const { studentId, ...student } = this.state;

       if (this.props.editMode) {
           axios.put(`/api/students/${studentId}`, student);
       } else {
           axios.post('/api/students', student);
       }
   }

    onFirstNameChange = (event) => {
       this.setState({ firstName: event.target.value });
   }

    onLastNameChange = (event) => {
       this.setState({ lastName: event.target.value });
   }

    onMiddleNameChange = (event) => {
       this.setState({ middleName: event.target.value });
    }

    onEmailChange = (event) => {
       this.setState({ email: event.target.value });
    }

    onGroupCourseChange = (event) => {
       this.setState({ groupCourseId: event.target.value });
    }

    onPhoneChange = (event) => {
       this.setState({ phone: event.target.value });
    }

    onDateOfBirthChange = (event) => {
       this.setState({ dateOfBirth: event.target.value });
    }
}
