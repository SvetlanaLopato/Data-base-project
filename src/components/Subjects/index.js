import React from 'react';

import SubjectsTable from './SubjectsTable/SubjectsTable';
import CreateSubject from './CreateSubject/CreateSubject';

export default class Subjects extends React.Component {
	render() {
		return (
			<div>
                <h3>Create subject</h3>
                <CreateSubject />
                <h3>Edit subject</h3>
                <CreateSubject editMode={true} />
                <SubjectsTable />
			</div>
		);
	}
}
