import React from 'react';
import axios from 'axios';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

export default class FilterComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            students: [],
            filterBy: [],
        };
    }

    componentWillMount() {
        axios.get('/api/teachers/names').then(({ data }) => {
            this.setState({ teachers: this.getUsers(data) });
        });

        axios.get('/api/students/names').then(({ data }) => {
            this.setState({ students: this.getUsers(data) });
        });
	}

	render() {
        const teacherOptions = this.state.teachers && this.state.teachers.map(this.getOption);
        const studentsOptions = this.state.students && this.state.students.map(this.getOption);
        const today = new Date().toISOString().split('T')[0];

		return (
            <div className="table-manager">
                <label>Filter by:</label>
                <CheckboxGroup onChange={this.onFilterByChange}>
                    <div className="table-option">
                        <Checkbox value="date"/>
                        <label>Date:</label>
                        <input onChange={this.onDateChange} type="date" max={today} />
                    </div>
                    <div className="table-option">
                        <Checkbox value="teacherId"/>
                        <label>Teacher:</label>
                        <select onChange={this.onTeacherChange} required>
                            <option defaultValue value="">Select teacher...</option>
                            {teacherOptions}
                        </select>
                    </div>
                    <div className="table-option">
                        <Checkbox value="studentId"/>
                        <label>Student:</label>
                        <select onChange={this.onStudentChange} required>
                            <option defaultValue value="">Select student...</option>
                            {studentsOptions}
                        </select>
                    </div>
                    <div className="table-option">
                        <Checkbox value="studentLastName"/>
                        <label>Student last name:</label>
                        <input onChange={this.onStudentLastNameChange} placeholder="Enter last name..." type="text" />
                    </div>
                    <div className="table-option">
                        <Checkbox value="studentFirstName"/>
                        <label>Student first name:</label>
                        <input onChange={this.onStudentFirstNameChange} placeholder="Enter first name..." type="text" />
                    </div>
                    <div className="table-option">
                        <Checkbox value="teacherLastName"/>
                        <label>Teacher last name:</label>
                        <input onChange={this.onTeacherLastNameChange} placeholder="Enter last name..." type="text" />
                    </div>
                    <div className="table-option">
                        <Checkbox value="teacherFirstName"/>
                        <label>Teacher first name:</label>
                        <input onChange={this.onTeacherFirstNameChange} placeholder="Enter first name..." type="text" />
                    </div>
                </CheckboxGroup>
                <button onClick={this.filterComments} className="submit-button">Submit</button>
            </div>
		);
	}

    getUsers = (users) => {
        return users.map(user => ({
            label: `${user.last_name} ${user.first_name} ${user.middle_name}`,
            value: user.teacher_id || user.student_id,
        }));
    }

    getOption({ label, value }) {
        return <option key={`${value}_${label}`} value={value}>{label}</option>
    }

    filterComments = () => {
        const { filterBy } = this.state;

        if (!filterBy.length) {
            return;
        }

        const params = filterBy.map(filterOption => {
            switch (filterOption) {
                case 'date':
                return this.state.date && `comment_date='${this.state.date}'`;
                case 'teacherId':
                return this.state.teacherId && `c.teacher_id=${this.state.teacherId}`;
                case 'studentId':
                return this.state.studentId && `c.student_id=${this.state.studentId}`;
                case 'studentLastName':
                return this.state.studentLastName && `s.last_name='${this.state.studentLastName}'`;
                case 'studentFirstName':
                return this.state.studentFirstName && `s.first_name='${this.state.studentFirstName}'`;
                case 'teacherLastName':
                return this.state.teacherLastName && `t.last_name='${this.state.teacherLastName}'`;
                case 'teacherFirstName':
                return this.state.teacherFirstName && `t.first_name='${this.state.teacherFirstName}'`;
            }
        }).filter(param => param);

        params.length && this.props.onFilter(params);
    }

    onTeacherChange = (event) => {
        this.setState({ teacherId: event.target.value });
    }

    onStudentChange = (event) => {
        this.setState({ studentId: event.target.value });
    }

    onDateChange = (event) => {
        this.setState({ date: event.target.value });
    }

    onFilterByChange = (selectedOptions) => {
        this.setState({ filterBy: selectedOptions });
    }

    onStudentLastNameChange = (event) => {
        this.setState({ studentLastName: event.target.value });
    }

    onStudentFirstNameChange = (event) => {
        this.setState({ studentFirstName: event.target.value });
    }

    onTeacherLastNameChange = (event) => {
        this.setState({ teacherLastName: event.target.value });
    }

    onTeacherFirstNameChange = (event) => {
        this.setState({ teacherFirstName: event.target.value });
    }
}
