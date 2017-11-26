import { connectToDB } from '../index';
import {
    SELECT_ALL_FROM_COMMENT,
    getCreateCommentQuery,
    getSortCommentsQuery,
    getDeleteCommentQuery,
    getFilterCommentsQuery,
    getCommentQuery,
    getUpdateCommentQuery,
} from './commentQueries';

function commentService() {
    return {
        getComments,
        createComment,
        sortComments,
        deleteComment,
        filterComments,
        getComment,
        updateComment,
    };

    function getComments() {
        return connectToDB(SELECT_ALL_FROM_COMMENT);
    }

    function createComment(data) {
        const query = getCreateCommentQuery(data);

        return connectToDB(query);
    }

    function sortComments(sortBy) {
        const query = getSortCommentsQuery(sortBy);

        return connectToDB(query);
    }

    function deleteComment(id) {
        const query = getDeleteCommentQuery(id);

        return connectToDB(query);
    }

    function filterComments(filterBy) {
        const query = getFilterCommentsQuery(filterBy);

        return connectToDB(query);
    }

    function getComment(id) {
        const query = getCommentQuery(id);

        return connectToDB(query);
    }

    function updateComment(id, data) {
        const query = getUpdateCommentQuery(id, data);

        return connectToDB(query);
    }
}

export default commentService();
