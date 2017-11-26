import { connectToDB } from '../index';

import {
    SELECT_ALL_FROM_SUBJECT,
    getCreateSubjectQuery,
    getUpdateSubjectQuery,
    getSubjectQuery,
} from './subjectQueries';

function subjectsService() {
    return {
        getSubjects,
        createSubject,
        updateSubject,
        getSubject,
    };

    function getSubjects() {
        return connectToDB(SELECT_ALL_FROM_SUBJECT);
    }

    function createSubject(data) {
        const query = getCreateSubjectQuery(data);

        return connectToDB(query);
    }

    function updateSubject(id, data) {
        const query = getUpdateSubjectQuery(id, data);

        return connectToDB(query);
    }

    function getSubject(id) {
        const query = getSubjectQuery(id);

        return connectToDB(query);
    }
}

export default subjectsService();
