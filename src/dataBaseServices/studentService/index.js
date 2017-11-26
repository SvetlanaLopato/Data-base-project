import { connectToDB } from '../index';

import {
    SELECT_NAME_FROM_STUDENT,
    SELECT_ALL_FROM_STUDENT,
    getStudentQuery,
    getUpdateStudentQuery,
    getCreateStudentQuery,
    getStudentsSubjectsQuery,
    getStudentSubjectsQuery,
    getCreateStudentSubjectQuery,
    getStudentSubjectQuery,
    getUpdateStudentSubjectQuery,
} from './studentQueries';

function studentService() {
    return {
        getStudentsNames,
        getStudents,
        createStudent,
        updateStudent,
        getStudent,
        getStudentsSubjects,
        getStudentSubjects,
        createStudentSubject,
        getStudentSubject,
        updateStudentSubject,
    };

    function getStudentsNames() {
        return connectToDB(SELECT_NAME_FROM_STUDENT);
    }

    function getStudents() {
        return connectToDB(SELECT_ALL_FROM_STUDENT);
    }

    function createStudent(data) {
        const query = getCreateStudentQuery(data);

        return connectToDB(query);
    }

    function getStudent(id) {
        const query = getStudentQuery(id);

        return connectToDB(query);
    }

    function updateStudent(id, data) {
        const query = getUpdateStudentQuery(id, data);

        return connectToDB(query);
    }

    function getStudentsSubjects() {
        const query = getStudentsSubjectsQuery();

        return connectToDB(query);
    }

    function getStudentSubjects(id) {
        const query = getStudentSubjectsQuery(id);

        return connectToDB(query);
    }

    function createStudentSubject(id, data) {
        const query = getCreateStudentSubjectQuery(id, data);

        return connectToDB(query);
    }

    function getStudentSubject(studentId, subjectId) {
        const query = getStudentSubjectQuery(studentId, subjectId);

        return connectToDB(query);
    }

    function updateStudentSubject(studentId, subjectId, data) {
        const query = getUpdateStudentSubjectQuery(studentId, subjectId, data);

        return connectToDB(query);
    }
}

export default studentService();
