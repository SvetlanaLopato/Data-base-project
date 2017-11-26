export const SELECT_NAME_FROM_TEACHER = `
    SELECT
        teacher_id, teacher.first_name, teacher.last_name, teacher.middle_name
    FROM teacher
`;

export const SELECT_ALL_FROM_TEACHER = `
    SELECT *
    FROM teacher
`;

export function getCreateTeacherQuery({ firstName, lastName, middleName, login, password, email, phone, description }) {
    return `
        INSERT INTO teacher
            (first_name, last_name, middle_name, login, password, email, phone, description)
        VALUES
            ('${firstName}', '${lastName}', '${middleName}', '${login}', '${password}', '${email}', '${phone}', '${description}')
    `;
}

export function getTeacherQuery(teacherId) {
    return `
        SELECT *
        FROM teacher
        WHERE teacher_id=${teacherId}
    `;
}

export function getTeacherSubjectQuery(teacherSubjectId) {
    return `
        SELECT *
        FROM teacher_subject
        WHERE teacher_subject.teacher_subject_id=${teacherSubjectId}
    `;
}

export function getUpdateTeacherQuery(teacherId, { firstName, lastName, middleName, login, password, email, phone, description }) {
    return `
        UPDATE teacher
        SET
            teacher.first_name='${firstName}',
            teacher.last_name='${lastName}',
            teacher.middle_name='${middleName}',
            teacher.login='${login}',
            teacher.password='${password}',
            teacher.email='${email}',
            teacher.phone='${phone}',
            teacher.description='${description}'
        WHERE teacher.teacher_id=${teacherId}
    `;
}

export function getTeacherSubjectsQuery(teacherId) {
    return `
        SELECT
            teacher_subject.subject_year,
            teacher_subject.teacher_subject_id,
            subject.subject_name,
            subject.control_type,
            subject.semester,
            teacher.first_name as t_first_name,
            teacher.last_name as t_last_name,
            teacher.middle_name as t_middle_name
        FROM teacher_subject
            INNER JOIN subject
            ON subject.subject_id = teacher_subject.subject_id
            INNER JOIN teacher
            ON teacher.teacher_id = teacher_subject.teacher_id
            WHERE teacher_subject.teacher_id=${teacherId}
    `;
}

export function getCreateTeacherSubjectQuery(teacherId, { subjectId, subjectYear }) {
    return `
        INSERT INTO teacher_subject
            (teacher_subject.teacher_id, teacher_subject.subject_id, teacher_subject.subject_year)
        VALUES
            (${teacherId}, ${subjectId}, ${subjectYear})
    `;
}

export function updateTeacherSubjectQuery(teacherSubjectId, { subjectId, teacherId, subjectYear }) {
    return `
        UPDATE teacher_subject
        SET
            teacher_subject.subject_id=${subjectId},
            teacher_subject.teacher_id=${teacherId},
            teacher_subject.subject_year=${subjectYear}
        WHERE teacher_subject.teacher_subject_id=${teacherSubjectId}
    `;
}
