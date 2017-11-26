export const SELECT_ALL_FROM_COMMENT = `
    SELECT
        c.comment_id,
        c.text,
        c.comment_date,
        t.first_name as t_first_name,
        t.last_name as t_last_name,
        t.middle_name as t_middle_name,
        t.teacher_id,
        s.first_name as s_first_name,
        s.last_name as s_last_name,
        s.middle_name as s_middle_name,
        s.student_id
    FROM comment as c
        INNER JOIN teacher as t
        ON t.teacher_id = c.teacher_id
        INNER JOIN student as s
        ON s.student_id = c.student_id
`;

export function getCreateCommentQuery({ teacherId, studentId, text, date }) {
    return `
        INSERT INTO comment
            (text, comment_date, comment.teacher_id, comment.student_id)
        VALUES
            ('${text}', '${date}', ${teacherId}, ${studentId})
    `;
}

export function getSortCommentsQuery(sortBy) {
    const sortByMap = {
        date: 'comment_date',
        id: 'comment_id',
    };

    return `
        ${SELECT_ALL_FROM_COMMENT}
        ORDER BY ${sortByMap[sortBy]} DESC;
    `;
}

export function getDeleteCommentQuery(id) {
    return `
        DELETE FROM comment
        WHERE comment_id=${id}
    `;
}

export function getFilterCommentsQuery(filterBy) {
    filterBy = filterBy.split(',').join(' AND ');

    return `
        ${SELECT_ALL_FROM_COMMENT}
        WHERE ${filterBy}
    `;
}

export function getCommentQuery(id) {
    return `
        SELECT *
        FROM comment
        WHERE comment_id=${id}
    `;
}

export function getUpdateCommentQuery(id, { teacherId, studentId, text, date }) {
    return `
        UPDATE comment
        SET comment.teacher_id=${teacherId}, comment.student_id=${studentId}, text='${text}', comment_date='${date}'
        WHERE comment_id=${id}
    `;
}
