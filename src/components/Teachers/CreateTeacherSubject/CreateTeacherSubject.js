import React from 'react';
import axios from 'axios';

export default class CreateTeacherSubject extends React.Component {
    componentWillMount() {
        this.updateState();

        axios.get('/api/subjects').then(({ data }) => {
            this.setState({ subjects: this.getSubjects(data) });
        });
    }

   render() {
        const teacherSubjectIdField = this.props.editMode && this.getSubjectIdField();
        const subjectOptions = this.state.subjects && this.state.subjects.map(this.getOption);

        return (
            <form onSubmit={this.createTeacherSubject}>
                <div className="create-form">
                    {teacherSubjectIdField}
                    <div className="form-field">
                        <label className="required-field">Subject:</label>
                        <select onChange={this.onSubjectIdChange} value={this.state.subjectId} required>
                            <option defaultValue value="">Select subejct...</option>
                            {subjectOptions}
                        </select>
                    </div>
                    <div className="form-field">
                        <label className="required-field">Subject year:</label>
                        <input value={this.state.subjectYear} onChange={this.onSubjectYearChange} type="number" placeholder="Enter subject year..." required />
                        {this.state.subjectYearInvalid && <span className="error-message">*Subject year should be from 2000 to 3000</span>}
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
           subjectId: subject.subject_id || '',
           subjectYear: subject.subject_year || '',
           teacherSubjectId: subject.teacher_subject_id || '',
       });
   }

   getSubjectIdField = () => {
       return (
           <div className="form-field">
               <label className="required-field">Teacher subject id:</label>
               <input onChange={this.onTeacherSubjectIdCange} type="number" placeholder="Enter teacher/subejct id..." required />
           </div>
       );
   }

   onTeacherSubjectIdCange = (event) => {
       const teacherSubjectId = event.target.value;

       this.setState({ teacherSubjectId });

       if (!teacherSubjectId) {
           this.updateState({});
           return;
       }

       axios.get(`/api/teachers/teacherSubjects/${teacherSubjectId}`).then(({ data }) => {
           const teacherSubject = data[0];

           this.updateState(teacherSubject);
       });
   }

   createTeacherSubject = (event) => {
       if (this.state.subjectYearInvalid) {
           event.preventDefault();
           return;
       }

       const { subjectId, subjectYear, teacherSubjectId } = this.state;
       const { teacherId } = this.props;

       if (this.props.editMode) {
           axios.put(`/api/teachers/teacherSubjects/${teacherSubjectId}`, { subjectId, subjectYear, teacherId });
       } else {
           axios.post(`/api/teacher/${teacherId}/subjects`, this.state);
       }
   }

    onSubjectIdChange = (event) => {
       this.setState({ subjectId: event.target.value });
   }

    onSubjectYearChange = (event) => {
       const subjectYear = event.target.value;
       const minSubjectYearValue = 2000;
       const maxSubjectYearValue = 3000;

        this.setState({
            subjectYear,
            subjectYearInvalid: subjectYear < minSubjectYearValue || subjectYear > maxSubjectYearValue,
        });
    }
}
