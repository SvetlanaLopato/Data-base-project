import React from 'react';
import axios from 'axios';

export default class CreateComment extends React.Component {
	componentWillMount() {
		axios.get('/api/students/names').then(({ data }) => {
			this.setState({ students: this.getUsers(data) });
		});

		axios.get('/api/teachers/names').then(({ data }) => {
			this.setState({ teachers: this.getUsers(data) });
		});

		this.updateState({ student_id: this.props.studentId, teacher_id: this.props.teacherId });
	}

	render() {
		const teacherOptions = this.state.teachers && this.state.teachers.map(this.getOption);
		const studentsOptions = this.state.students && this.state.students.map(this.getOption);
		const commentIdField = this.props.editMode && this.getCommentIdField();

		return (
			<div>
				<form className="create-form" onSubmit={this.createComment}>
					{commentIdField}
					<div className="form-field">
						<label className="required-field">Text:</label>
						<textarea value={this.state.text} onChange={this.onTextChange} rows="5" placeholder="Enter text..." required></textarea>
					</div>
					<div className="form-field">
						<label className="required-field">Teacher:</label>
						<select onChange={this.onTeacherChange} value={this.state.teacherId} required>
							<option defaultValue value="">Select teacher...</option>
							{teacherOptions}
						</select>
					</div>
					<div className="form-field">
						<label className="required-field">Student:</label>
						<select onChange={this.onStudentChange} value={this.state.studentId} required>
							<option defaultValue value="">Select student...</option>
							{studentsOptions}
						</select>
					</div>
					<button className="submit-button">Submit</button>
				</form>
			</div>
		);
	}

	getCommentIdField = () => {
		return (
			<div className="form-field">
				<label className="required-field">Comment id:</label>
				<input onChange={this.onIdCange} type="number" placeholder="Enter comment id..." required />
			</div>
		);
	}

	onIdCange = (event) => {
		const commentId = event.target.value;

		this.setState({ commentId });

		if (!commentId) {
			this.updateState({});
			return;
		}

		axios.get(`/api/comments/${commentId}`).then(({ data }) => {
			const comment = data[0];

			this.updateState(comment);
		});
	}

	updateState = (comment = {}) => {
		this.setState({
			text: comment.text || '',
			studentId: comment.student_id || '',
			teacherId: comment.teacher_id || '',
		});
	}

	getUsers = (users) => {
		return users.map(user => ({
			label: `${user.last_name} ${user.first_name} ${user.middle_name}`,
			value: user.teacher_id || user.student_id,
		}));
	}

	createComment = () => {
		const data = {
			teacherId: this.state.teacherId,
			studentId: this.state.studentId,
			text: this.state.text,
			date: new Date().toISOString().split('T')[0],
		};

		if (this.props.editMode) {
			axios.put(`/api/comments/${this.state.commentId}`, data);
		} else {
			axios.post('/api/comments', data);
		}
	}

	getOption({ label, value }) {
		return <option key={`${value}_${label}`} value={value}>{label}</option>
	}

	onTeacherChange = (event) => {
		this.setState({ teacherId: event.target.value });
	}

	onStudentChange = (event) => {
		this.setState({ studentId: event.target.value });
	}

	onTextChange = (event) => {
		this.setState({ text: event.target.value });
	}
}
