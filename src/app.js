import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom'

import Navigator from './components/Navigator/Navigator';
import Comments from './components/Comments';
import StudentProfile from './components/Students/StudentProfile/StudentProfile';
import Teachers from './components/Teachers';
import TeacherProfile from './components/Teachers/TeacherProfile/TeacherProfile';
import Students from './components/Students';
import GroupsCourses from './components/GroupsCourses';
import Subjects from './components/Subjects';

import './styles/style.less';

ReactDOM.render(
    (
        <BrowserRouter>
            <div className="container">
                <Route path="/" component={Navigator}/>
                <Switch>
                    <Route exact path="/comments" component={Comments} />
                    <Route exact path="/teachers" component={Teachers} />
                    <Route exact path="/teachers/:id" component={TeacherProfile} />
                    <Route exact path="/students" component={Students} />
                    <Route exact path="/students/:id" component={StudentProfile} />
                    <Route exact path="/groupsCourses" component={GroupsCourses} />
                    <Route exact path="/subjects" component={Subjects} />
                    <Redirect to="/comments" />
                </Switch>
            </div>
        </BrowserRouter>
    ),
    document.getElementById('app')
);
