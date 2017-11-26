import React from 'react';

import GroupsCoursesTable from './GroupsCoursesTable/GroupsCoursesTable';
import CreateGroupCourse from './CreateGroupCourse/CreateGroupCourse';

export default class GroupsCourses extends React.Component {
	render() {
		return (
			<div>
				<h3>Create group/corse</h3>
				<CreateGroupCourse />
				<h3>Edit group/corse</h3>
				<CreateGroupCourse editMode={true} />
				<GroupsCoursesTable />
			</div>
		);
	}
}
