import React from 'react';
import axios from 'axios';

export default class CreateTeacher extends React.Component {
    componentWillMount() {
        this.updateState();
    }

   render() {
       const teacherIdField = this.props.editMode && this.getTeacherIdField();

       return (
           <form onSubmit={this.createTeacher}>
               <div className="create-form">
                   {teacherIdField}
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
                       <label className="required-field">LogIn:</label>
                       <input value={this.state.login} onChange={this.onLogInChange} type="text" placeholder="Enter login..." required />
                   </div>
                   <div className="form-field">
                       <label className="required-field">Password:</label>
                       <input value={this.state.password} onChange={this.onPasswordChange} type="password" placeholder="Enter password..." required />
                   </div>
                   <div className="form-field">
                       <label className="required-field">Email:</label>
                       <input value={this.state.email} onChange={this.onEmailChange} type="email" placeholder="Enter email..." required />
                   </div>
                   <div className="form-field">
                       <label>Description:</label>
                       <textarea value={this.state.description} onChange={this.onDescriptionChange} rows="5" placeholder="Enter description..."></textarea>
                   </div>
                   <div className="form-field">
                       <label className="required-field">Phone:</label>
                       <input value={this.state.phone} onChange={this.onPhoneChange} type="text" placeholder="Enter phone..." required />
                   </div>
                   <button className="submit-button">Submit</button>
               </div>
           </form>
       );
   }

   updateState = (teacher = {}) => {
       this.setState({
           firstName: teacher.first_name || '',
           lastName: teacher.last_name || '',
           middleName: teacher.middle_name || '',
           login: teacher.login || '',
           password: teacher.password || '',
           email: teacher.email || '',
           phone: teacher.phone || '',
           description: teacher.description || '',
       });
   }

   getTeacherIdField = () => {
       return (
           <div className="form-field">
               <label className="required-field">Teacher id:</label>
               <input onChange={this.onIdCange} type="number" placeholder="Enter teacher id..." required />
           </div>
       );
   }

   onIdCange = (event) => {
       const teacherId = event.target.value;

       this.setState({ teacherId });

       if (!teacherId) {
           this.updateState({});
           return;
       }

       axios.get(`/api/teachers/${teacherId}`).then(({ data }) => {
           const teacher = data[0];

           this.updateState(teacher);
       });
   }

   createTeacher = () => {
       const { teacherId, ...teacher } = this.state;

       if (this.props.editMode) {
           axios.put(`/api/teachers/${teacherId}`, teacher);
       } else {
           axios.post('/api/teachers', teacher);
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

    onLogInChange = (event) => {
       this.setState({ login: event.target.value });
    }

    onPasswordChange = (event) => {
       this.setState({ password: event.target.value });
    }

    onEmailChange = (event) => {
       this.setState({ email: event.target.value });
    }

    onDescriptionChange = (event) => {
       this.setState({ description: event.target.value });
    }

    onPhoneChange = (event) => {
       this.setState({ phone: event.target.value });
    }
}
