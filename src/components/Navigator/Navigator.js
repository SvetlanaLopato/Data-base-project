import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Navigator.less';

export default class Navigator extends React.Component {
    render() {
        return (
            <div className="nav-menu">
                <Link to="/comments">Comments</Link>
                <Link to="/teachers">Teachers</Link>
                <Link to="/students">Students</Link>
                <Link to="/groupsCourses">Groups / Courses</Link>
                <Link to="/subjects">Subjects</Link>
                <span onClick={this.print} className="print">Print</span>
            </div>
        );
    }

    print = () => {
        axios.get('/api/print');
    }
}
