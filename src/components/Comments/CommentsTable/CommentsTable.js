import React from 'react';
import axios from 'axios';

import TableRender from 'components/TableRender/TableRender';
import TableSorter from 'components/TableSorter/TableSorter';
import FilterComments from '../FilterComments/FilterComments';

export default class CommentsTable extends React.Component {
    constructor(props) {
        super(props);

        const headerTitles = ['Comment id', 'Text', 'Date', 'Student', 'Teacher'];
        const sortOptions = [{ label: 'Date', value: 'date' }, { label: 'Id', value: 'id' }];

        this.state = {
            comments: [],
            headerTitles,
            sortOptions,
        };
    }

    componentWillMount() {
        if (this.props.studentId) {
            this.getComments(`/api/comments?filterBy=c.student_id=${this.props.studentId}`);
            return;
        }

        if (this.props.teacherId) {
            this.getComments(`/api/comments?filterBy=c.teacher_id=${this.props.teacherId}`);
            return;
        }

        this.getComments('/api/comments');
    }

	render() {
        const commentsValues = this.state.comments.map(this.getCommentValues);
        const commentsOoptions = this.props.showOptions && this.getCommentsOptions();

        return (
            <div>
                {commentsOoptions}
                <h3>Comments table</h3>
                <TableRender header={this.state.headerTitles} data={commentsValues}/>
            </div>
		);
	}

    getCommentsOptions = () => {
        return (
            <div>
                <h3>Comments options</h3>
                <TableSorter onSort={this.sortComments} options={this.state.sortOptions} />
                <FilterComments onFilter={this.filterComments} />
            </div>
        );
    }

    filterComments = (params) => {
        this.getComments(`/api/comments?filterBy=${params}`);
    }

    sortComments = (sortBy) => {
        this.getComments(`/api/comments?sortBy=${sortBy}`);
    }

    getComments = (url) => {
        axios.get(url).then(({ data }) => {
            this.setState({ comments: data });
        });
    }

    getCommentValues(comment) {
        const { comment_id, text, comment_date } = comment;
        const teacherName = `${comment.t_last_name} ${comment.t_first_name} ${comment.t_middle_name}`;
        const studentName = `${comment.s_last_name} ${comment.s_first_name} ${comment.s_middle_name}`;
        const date = new Date(comment_date).toISOString().split('T')[0].replace(new RegExp('-', 'g'), '/');

        return [comment_id, text, date, studentName, teacherName];
    }
}
