import React from 'react';
import axios from 'axios';

export default class CreateStudentSubject extends React.Component {
    componentWillMount() {
        this.updateState();

        axios.get('/api/subjects').then(({ data }) => {
			this.setState({ subjects: this.getSubjects(data) });
		});
    }

   render() {
        const subjectOptions = this.state.subjects && this.state.subjects.map(this.getOption);

        return (
           <form onSubmit={this.createSubject}>
               <div className="create-form">
                   <div className="form-field">
                       <label className="required-field">Subject:</label>
                       <select onChange={this.onSubjectChange} value={this.state.subjectId} required>
                           <option defaultValue value="">Select subject...</option>
                           {subjectOptions}
                       </select>
                   </div>
                   <div className="form-field">
                       <label>Mark:</label>
                       <input value={this.state.mark} onChange={this.onMarkChange} type="number" placeholder="Enter mark..." />
                       {this.state.markInvalid && <span className="error-message">*Mark should be from 1 to 10</span>}
                   </div>
                   <div className="form-field">
                       <label>Pass exam:</label>
                       <select onChange={this.onPassExamChange} value={this.state.passExam}>
                           <option defaultValue value="0">false</option>
                           <option value="1">true</option>
                       </select>
                   </div>
                   <button className="submit-button">Submit</button>
               </div>
           </form>
       );
   }

   getSubjects = (subjects) => {
       return subjects.map(subject => ({
           label: `${subject.subject_name}(${subject.control_type}), ${subject.semester} semester`,
           value: subject.subject_id,
       }));
   }

   getOption({ label, value }) {
       return <option key={`${value}_${label}`} value={value}>{label}</option>
   }

   updateState = (subject = {}) => {
       this.setState({
           mark: subject.mark || '',
           passExam: subject.pass_exam || 0,
       });
   }

   createSubject = (event) => {
       if (this.state.markInvalid) {
           event.preventDefault();
           return;
       }

       const studentId = this.props.studentId;
       const subjectId = this.state.subjectId;

       if (this.state.editMode) {
           axios.put(`/api/students/${studentId}/subjects/${subjectId}`, this.state);
       } else {
           axios.post(`/api/students/${studentId}/subjects`, this.state);
       }
   }

    onMarkChange = (event) => {
        const mark = event.target.value;
        const minMarkValue = 1;
        const maxMarkValue = 10;

        this.setState({
            mark,
            markInvalid: mark < minMarkValue || mark > maxMarkValue,
        });
   }

    onPassExamChange = (event) => {
       this.setState({ passExam: event.target.value });
   }

    onSubjectChange = (event) => {
       const subjectId = event.target.value;

       this.setState({ subjectId });

       if (!subjectId) {
           this.updateState({});
           return;
       }

       axios.get(`/api/students/${this.props.studentId}/subjects/${subjectId}`).then(({ data }) => {
           const subject = data[0];

           this.setState({ editMode: subject });

           this.updateState(subject);
       });
   }
}
