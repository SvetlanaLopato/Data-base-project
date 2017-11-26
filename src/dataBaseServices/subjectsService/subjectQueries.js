export const SELECT_ALL_FROM_SUBJECT = `
    SELECT *
    FROM subject
`;

export function getCreateSubjectQuery({ subjectName, subjectHours, controlType, semester, description }) {
    return `
        INSERT INTO subject
            (subject.subject_name, subject.subject_hours, subject.control_type, subject.semester, subject.description)
        VALUES
            ('${subjectName}', ${subjectHours}, '${controlType}', ${semester}, '${description}')
    `;
}

export function getUpdateSubjectQuery(id, { subjectName, subjectHours, controlType, semester, description }) {
    return `
        UPDATE subject
        SET
            subject.subject_name='${subjectName}',
            subject.subject_hours=${subjectHours},
            subject.control_type='${controlType}',
            subject.semester=${semester},
            subject.description='${description}'
        WHERE subject_id=${id}
    `;
}

export function getSubjectQuery(id) {
    return `
        SELECT *
        FROM subject
        WHERE subject.subject_id=${id}
    `;
}
