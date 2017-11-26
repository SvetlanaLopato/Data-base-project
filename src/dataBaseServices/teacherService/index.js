import { connectToDB } from '../index';

import {
    SELECT_NAME_FROM_TEACHER,
    SELECT_ALL_FROM_TEACHER,
    getCreateTeacherQuery,
    getTeacherQuery,
    getUpdateTeacherQuery,
    getTeacherSubjectsQuery,
    getCreateTeacherSubjectQuery,
    getTeacherSubjectQuery,
    updateTeacherSubjectQuery,
} from './teacherQueries';

function teacherService() {
    return {
        getTeachersNames,
        getTeachers,
        createTeacher,
        getTeacher,
        updateTeacher,
        createTeacherSubject,
        getTeacherSubjects,
        updateTeacherSubject,
        getTeacherSubject,
    };

    function getTeachersNames() {
        return connectToDB(SELECT_NAME_FROM_TEACHER);
    }

    function getTeachers() {
        return connectToDB(SELECT_ALL_FROM_TEACHER);
    }

    function createTeacher(data) {
        const query = getCreateTeacherQuery(data);

        return connectToDB(query);
    }

    function getTeacher(id) {
        const query = getTeacherQuery(id);

        return connectToDB(query);
    }

    function updateTeacher(id, data) {
        const query = getUpdateTeacherQuery(id, data);

        return connectToDB(query);
    }

    function getTeacherSubjects(id) {
        const query = getTeacherSubjectsQuery(id);

        return connectToDB(query);
    }

    function getTeacherSubject(teacherSubjectId) {
        const query = getTeacherSubjectQuery(teacherSubjectId);

        return connectToDB(query);
    }

    function createTeacherSubject(id, data) {
        const query = getCreateTeacherSubjectQuery(id, data);

        return connectToDB(query);
    }

    function updateTeacherSubject(id, data) {
        const query = updateTeacherSubjectQuery(id, data);

        return connectToDB(query);
    }
}

export default teacherService();
