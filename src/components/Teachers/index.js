import React from 'react';

import TeacherTable from './TeacherTable/TeacherTable';
import CreateTeacher from './CreateTeacher/CreateTeacher';

export default class Comments extends React.Component {
	render() {
		return (
			<div>
				<h3>Create teacher</h3>
				<CreateTeacher />
				<h3>Edit teacher</h3>
				<CreateTeacher editMode={true} />
				<TeacherTable />
			</div>
		);
	}
}
