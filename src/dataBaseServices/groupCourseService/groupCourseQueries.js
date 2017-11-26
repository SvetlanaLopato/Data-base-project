export const SELECT_ALL_FROM_GROUP_COURSE = `
    SELECT *
    FROM group_course
`;

export function getCreateGroupCourseQuery({ course, group, title }) {
    return `
        INSERT INTO group_course
            (group_course.course, group_course.group, group_course.title)
        VALUES
            (${course}, ${group}, '${title}')
    `;
}

export function getUpdateGroupCourseQuery(id, { course, group, title }) {
    return `
        UPDATE group_course
        SET group_course.course=${course}, group_course.group=${group}, group_course.title='${title}'
        WHERE group_course_id=${id}
    `;
}

export function getGroupCourseQuery(id) {
    return `
        SELECT *
        FROM group_course
        WHERE group_course.group_course_id=${id}
    `;
}
