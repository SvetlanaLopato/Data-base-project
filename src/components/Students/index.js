import React from 'react';

import StudentsTable from './StudentsTable/StudentsTable';
import CreateStudent from './CreateStudent/CreateStudent';

export default class Students extends React.Component {
	render() {
		return (
			<div>
				<h3>Create student</h3>
				<CreateStudent />
				<h3>Edit student</h3>
				<CreateStudent editMode={true} />
				<StudentsTable />
			</div>
		);
	}
}
