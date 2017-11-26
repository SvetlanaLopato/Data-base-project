export const SELECT_NAME_FROM_STUDENT = `
    SELECT
        student_id, student.first_name, student.last_name, student.middle_name
    FROM student
`;

export const SELECT_ALL_FROM_STUDENT = `
    SELECT
        gc.course, gc.group, gc.group_course_id,
        s.first_name, s.last_name, s.middle_name, s.date_of_birth, s.phone, s.email, s.student_id
    FROM student as s
        INNER JOIN group_course as gc
        ON gc.group_course_id=s.group_course_id
`;

export function getStudentQuery(id) {
    return `
        ${SELECT_ALL_FROM_STUDENT}
        WHERE student_id=${id}
    `;
}

export function getUpdateStudentQuery(id, { firstName, lastName, middleName, dateOfBirth, groupCourseId, email, phone }) {
    return `
        UPDATE student
        SET
            student.first_name='${firstName}',
            student.last_name='${lastName}',
            student.middle_name='${middleName}',
            student.date_of_birth='${dateOfBirth}',
            student.phone='${phone}',
            student.email='${email}',
            student.group_course_id='${groupCourseId}'
        WHERE student.student_id=${id}
    `;
}

export function getCreateStudentQuery({ firstName, lastName, middleName, dateOfBirth, phone, email, groupCourseId }) {
    return `
        INSERT INTO student
            (first_name, last_name, middle_name, date_of_birth, phone, email, group_course_id)
        VALUES
            ('${firstName}', '${lastName}', '${middleName}', '${dateOfBirth}', '${phone}', '${email}', ${groupCourseId})
    `;
}

export function getStudentsSubjectsQuery() {
    return `
        SELECT
            student_subject.mark,
            student_subject.pass_exam,
            student_subject.student_id,
            subject.subject_name,
            subject.control_type,
            subject.semester
        FROM student_subject
            INNER JOIN subject
            ON subject.subject_id = student_subject.subject_id
    `;
}

export function getStudentSubjectsQuery(id) {
    return `
        SELECT
            student_subject.mark,
            student_subject.pass_exam,
            subject.subject_name,
            subject.control_type,
            subject.semester,
            student.first_name as s_first_name,
            student.last_name as s_last_name,
            student.middle_name as s_middle_name
        FROM student_subject
            INNER JOIN subject
            ON subject.subject_id = student_subject.subject_id
            INNER JOIN student
            ON student.student_id = student_subject.student_id
            WHERE student_subject.student_id=${id}
    `;
}

export function getCreateStudentSubjectQuery(studentId, { subjectId, mark, passExam }) {
    return `
        INSERT INTO student_subject
            (student_subject.subject_id, student_subject.student_id, student_subject.pass_exam${mark ? ', student_subject.mark' : ''})
        VALUES
            (${subjectId}, ${studentId}, ${passExam}${mark ? ', '+mark : ''})
    `;
}

export function getStudentSubjectQuery(studentId, subjectId) {
    return `
        SELECT
            student_subject.mark,
            student_subject.pass_exam
        FROM student_subject
            WHERE student_subject.student_id=${studentId} AND student_subject.subject_id=${subjectId}
    `;
}

export function getUpdateStudentSubjectQuery(studentId, subjectId, { mark, passExam }) {
    return `
        UPDATE student_subject
        SET
            student_subject.mark=${mark},
            student_subject.pass_exam=${passExam}
        WHERE student_subject.subject_id=${subjectId} AND student_subject.student_id=${studentId}
    `;
}
