import React from 'react';
import axios from 'axios';

export default class DeleteComment extends React.Component {
	render() {
		return (
			<div>
				<h3>Delete comment</h3>
				<form className="create-form" onSubmit={this.deleteComment}>
					<div className="form-field">
						<label className="required-field">Comment id:</label>
						<input onChange={this.onIdCange} type="number" placeholder="Enter comment id..." required />
					</div>
					<button className="submit-button">Submit</button>
				</form>
			</div>
		);
	}

	onIdCange = (event) => {
		this.setState({ commentId: event.target.value });
	}

	deleteComment = () => {
		axios.delete(`/api/comments/${this.state.commentId}`);
	}
}
