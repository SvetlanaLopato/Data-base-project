import { connectToDB } from '../index';

import {
    SELECT_ALL_FROM_GROUP_COURSE,
    getCreateGroupCourseQuery,
    getUpdateGroupCourseQuery,
    getGroupCourseQuery,
} from './groupCourseQueries';

function groupCourseService() {
    return {
        getGroupsCourses,
        createGroupCourse,
        updateGroupCourse,
        getGroupCourse,
    };

    function getGroupsCourses() {
        return connectToDB(SELECT_ALL_FROM_GROUP_COURSE);
    }

    function createGroupCourse(data) {
        const query = getCreateGroupCourseQuery(data);

        return connectToDB(query);
    }

    function updateGroupCourse(id, data) {
        const query = getUpdateGroupCourseQuery(id, data);

        return connectToDB(query);
    }

    function getGroupCourse(id) {
        const query = getGroupCourseQuery(id);

        return connectToDB(query);
    }
}

export default groupCourseService();
