import React from 'react';

import CreateComment from './CreateComment/CreateComment';
import CommentsTable from './CommentsTable/CommentsTable';
import DeleteComment from './DeleteComment/DeleteComment';

export default class Comments extends React.Component {
	render() {
		return (
			<div>
				<h3>Create comment</h3>
				<CreateComment />
				<DeleteComment />
				<h3>Edit comment</h3>
				<CreateComment editMode={true} />
				<CommentsTable showOptions={true} />
			</div>
		);
	}
}
