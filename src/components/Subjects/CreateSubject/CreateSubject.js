import React from 'react';
import axios from 'axios';

export default class CreateSubject extends React.Component {
    componentWillMount() {
        this.updateState();
    }

   render() {
       const subjectIdField = this.props.editMode && this.getSubjectIdField();

       return (
           <form onSubmit={this.createSubject}>
               <div className="create-form">
                   {subjectIdField}
                   <div className="form-field">
                       <label className="required-field">Subject name:</label>
                       <input value={this.state.subjectName} onChange={this.onSubjectNameChange} type="text" placeholder="Enter subject name..." required />
                   </div>
                   <div className="form-field">
                       <label className="required-field">Hours:</label>
                       <input value={this.state.subjectHours} onChange={this.onSubjectHoursChange} type="number" placeholder="Enter subject hours..." required />
                   </div>
                   <div className="form-field">
                       <label className="required-field">Control type:</label>
                       <select onChange={this.onControlTypeChange} value={this.state.controlType} required>
                           <option defaultValue value="">Select control type...</option>
                           <option value="zachet">Zachet</option>
                           <option value="exam">Exam</option>
                       </select>
                   </div>
                   <div className="form-field">
                       <label className="required-field">Semester:</label>
                       <input value={this.state.semester} onChange={this.onSemesterChange} type="number" placeholder="Enter semester..." required />
                       {this.state.semesterInvalid && <span className="error-message">*Semester should be from 1 to 8</span>}
                   </div>
                   <div className="form-field">
                       <label>Description:</label>
                       <textarea value={this.state.description} onChange={this.onDescriptionChange} rows="5" placeholder="Enter description..."></textarea>
                   </div>
                   <button className="submit-button">Submit</button>
               </div>
           </form>
       );
   }

   updateState = (subject = {}) => {
       this.setState({
           subjectName: subject.subject_name || '',
           subjectHours: subject.subject_hours || '',
           controlType: subject.control_type || '',
           semester: subject.semester || '',
           description: subject.description || '',
       });
   }

   getSubjectIdField = () => {
       return (
           <div className="form-field">
               <label className="required-field">Subject id:</label>
               <input onChange={this.onSubjectIdCange} type="number" placeholder="Enter subject id..." required />
           </div>
       );
   }

   onSubjectIdCange = (event) => {
       const subjectId = event.target.value;

       this.setState({ subjectId });

       if (!subjectId) {
           this.updateState({});
           return;
       }

       axios.get(`/api/subjects/${subjectId}`).then(({ data }) => {
           const subject = data[0];

           this.updateState(subject);
       });
   }

   createSubject = (event) => {
       if (this.state.semesterInvalid) {
           event.preventDefault();
           return;
       }

       const { subjectId, ...subject } = this.state;

       if (this.props.editMode) {
           axios.put(`/api/subjects/${subjectId}`, subject);
       } else {
           axios.post('/api/subjects', subject);
       }
   }

    onSubjectNameChange = (event) => {
       this.setState({ subjectName: event.target.value });
   }

    onSubjectHoursChange = (event) => {
       this.setState({ subjectHours: event.target.value });
   }

    onControlTypeChange = (event) => {
       this.setState({ controlType: event.target.value });
    }

    onSemesterChange = (event) => {
        const semester = event.target.value;
        const minSemesterValue = 1;
        const maxSemesterValue = 8;

        this.setState({
            semester,
            semesterInvalid: semester < minSemesterValue || semester > maxSemesterValue,
        });
    }

    onDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }
}
