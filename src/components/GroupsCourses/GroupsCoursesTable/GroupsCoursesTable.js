import React from 'react';
import axios from 'axios';

import TableRender from 'components/TableRender/TableRender';

export default class GroupsCoursesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupsCourses: [],
            headerTitles: ['Group/Course id', 'Course', 'Group', 'Title'],
        };
    }

    componentWillMount() {
        axios.get('/api/groupsCourses').then(({ data }) => {
            this.setState({ groupsCourses: data });
        });
    }

	render() {
        const groupsCoursesValues = this.state.groupsCourses.map(this.getGroupsCoursesValues);

        return (
            <div>
                <h3>Group/Course table</h3>
                <TableRender header={this.state.headerTitles} data={groupsCoursesValues}/>
            </div>
		);
	}

    getGroupsCoursesValues(groupCourse) {
        return [
            groupCourse.group_course_id,
            groupCourse.course,
            groupCourse.group,
            groupCourse.title,
        ];
    }
}
