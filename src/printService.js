import Excel from 'exceljs';

const workbook = new Excel.Workbook();

function printService() {
    return { print };

    function print([comments, students, teachers, subjects, groupsCourses, studentsSubjects]) {
        const OutputFile = '/Users/svetlanalopato/Projects/Data-base-project/dataBaseData.xlsx';

        printComments(comments);
        printStudents(students);
        printTeachers(teachers);
        printSubjects(subjects);
        printGroupsCourses(groupsCourses);
        printStudentsComments(students, comments);
        printStudentsSubjects(students, studentsSubjects);

        workbook.xlsx.writeFile(OutputFile).then(() => {
            console.log('File is written');
        });
    }

    function printComments(comments) {
        const commentsRows = comments && getCommentsRows(comments);
        const commentsColumns = [
            { header: 'Id', width: 5 },
            { header: 'Text', width: 30 },
            { header: 'Teacher', width: 30 },
            { header: 'Student', width: 30 },
            { header: 'Comment date', width: 15 },
        ];

        addWorksheet('Comments', commentsColumns, commentsRows);
    }

    function getCommentsRows(comments) {
        return comments.map(comment => {
            const { comment_id, text, comment_date } = comment;
            const teacherName = `${comment.t_last_name} ${comment.t_first_name} ${comment.t_middle_name}`
            const studentName = `${comment.s_first_name} ${comment.s_first_name} ${comment.s_middle_name}`

            return [comment_id, text, teacherName, studentName, comment_date]
        })
    }

    function addWorksheet(title, columns, rows) {
        const worksheet = workbook.addWorksheet(title);

        worksheet.columns = columns;

        worksheet.addRows(rows);
    }

    function printStudents(students) {
        const studentsRows = students && getStudentsRows(students);
        const studentsColumns = [
            { header: 'Id', width: 5 },
            { header: 'First name', width: 20 },
            { header: 'Last name', width: 20 },
            { header: 'Middle name', width: 20 },
            { header: 'Date of birth', width: 20 },
            { header: 'Phone', width: 20 },
            { header: 'Email', width: 20 },
            { header: 'Group', width: 10 },
            { header: 'Course', width: 10 },
            { header: 'Comment', width: 30 },
        ];

        addWorksheet('Students', studentsColumns, studentsRows);
    }

    function getStudentsRows(students) {
        return students.map(student => {
            return [
                student.student_id,
                student.first_name,
                student.last_name,
                student.middle_name,
                student.date_of_birth,
                student.phone,
                student.email,
                student.group,
                student.course,
            ];
        })
    }

    function printTeachers(teachers) {
        const teachersRows = teachers && getTeachersRows(teachers);
        const teachersColumns = [
            { header: 'Id', width: 5 },
            { header: 'First name', width: 20 },
            { header: 'Last name', width: 20 },
            { header: 'Middle name', width: 20 },
            { header: 'Login', width: 20 },
            { header: 'Password', width: 20 },
            { header: 'Email', width: 20 },
            { header: 'Phone', width: 20 },
            { header: 'Description', width: 30 },
        ];

        addWorksheet('Teachers', teachersColumns, teachersRows);
    }

    function getTeachersRows(teachers) {
        return teachers.map(teacher => {
            return [
                teacher.teacher_id,
                teacher.first_name,
                teacher.last_name,
                teacher.middle_name,
                teacher.login,
                teacher.password,
                teacher.email,
                teacher.phone,
                teacher.description,
            ];
        })
    }

    function printSubjects(subjects) {
        const subjectsRows = subjects && getSubjectsRows(subjects);
        const subjectsColumns = [
            { header: 'Id', width: 5 },
            { header: 'Subject name', width: 20 },
            { header: 'Subject hours', width: 10 },
            { header: 'Control type', width: 10 },
            { header: 'Semester', width: 10 },
            { header: 'Description', width: 30 },
        ];

        addWorksheet('Subjects', subjectsColumns, subjectsRows);
    }

    function getSubjectsRows(subjects) {
        return subjects.map(subject => {
            return [
                subject.subject_id,
                subject.subject_name,
                subject.subject_hours,
                subject.control_type,
                subject.semester,
                subject.description,
            ];
        })
    }

    function printGroupsCourses(groupsCourses) {
        const groupsCoursesRows = groupsCourses && getGroupsCoursesRows(groupsCourses);
        const groupsCoursesColumns = [
            { header: 'Id', width: 5 },
            { header: 'Course', width: 10 },
            { header: 'Group', width: 10 },
            { header: 'Title', width: 10 },
        ];

        addWorksheet('GroupsCourses', groupsCoursesColumns, groupsCoursesRows);
    }

    function getGroupsCoursesRows(groupsCourses) {
        return groupsCourses.map(groupCourse => {
            return [
                groupCourse.group_course_id,
                groupCourse.course,
                groupCourse.group,
                groupCourse.title,
            ];
        })
    }

    function printStudentsComments(students, comments) {
        const studentsCommentsRows = getStudentsCommentsRows(students, comments);
        const studentsCommentsColumns = [
            { header: 'Student Id', width: 5 },
            { header: 'Name', width: 30 },
            { header: 'Comment', width: 30 },
            { header: 'Written by', width: 30 },
            { header: 'Comment date', width: 20 },
        ];

        addWorksheet('StudentsComments', studentsCommentsColumns, studentsCommentsRows);
    }

    function getStudentsCommentsRows(students, comments) {
        const studentsMap = getStudentsMap(students);
        const commentsMap = getCommentsMap(comments);
        let rows = [];

        for (const id in studentsMap) {
            rows.push([ id, studentsMap[id] ]);

            commentsMap[id] && commentsMap[id].forEach(comment => {
                rows.push([,,, comment.text, comment.teacherName, comment.date]);
            });
        }

        return rows;
    }

    function getCommentsMap(comments) {
        let commentsMap = {};

        comments.map(comment => {
            if (!commentsMap[comment.student_id]) {
                commentsMap[comment.student_id] = [];
            }

            commentsMap[comment.student_id].push({
                text: comment.text,
                teacherName: `${comment.t_last_name} ${comment.t_first_name} ${comment.t_middle_name}`,
                date: comment.comment_date,
            });
        });

        return commentsMap;
    }

    function getStudentsMap(students) {
        let studentsMap = {};

        students.map(student => {
            studentsMap[student.student_id] = `${student.last_name} ${student.first_name} ${student.middle_name}`;
        });

        return studentsMap;
    }

    function printStudentsSubjects(students, studentsSubjects) {
        const studentsSubjectsRows = getStudentsSubjectsRows(students, studentsSubjects);
        const studentsSubjectsColumns = [
            { header: 'Student Id', width: 5 },
            { header: 'Name', width: 30 },
            { header: 'Subject name', width: 15 },
            { header: 'Semester', width: 10 },
            { header: 'Control type', width: 15 },
            { header: 'Mark', width: 10 },
            { header: 'Pass exam', width: 10 },
        ];

        addWorksheet('StudentsSubjects', studentsSubjectsColumns, studentsSubjectsRows);
    }

    function getStudentsSubjectsRows(students, subjects) {
        const studentsMap = getStudentsMap(students);
        const subjectsMap = getSubjectsMap(subjects);
        let rows = [];

        for (const id in studentsMap) {
            rows.push([ id, studentsMap[id] ]);

            subjectsMap[id] && subjectsMap[id].forEach(subject => {
                rows.push([,,, subject.name, subject.semester, subject.controlType, subject.mark, subject.passExam]);
            });
        }

        return rows;
    }

    function getSubjectsMap(subjects) {
        let subjectsMap = {};

        subjects.map(subject => {
            if (!subjectsMap[subject.student_id]) {
                subjectsMap[subject.student_id] = [];
            }

            subjectsMap[subject.student_id].push({
                name: subject.subject_name,
                semester: subject.semester,
                controlType: subject.control_type,
                mark: subject.mark,
                passExam: subject.pass_exam ? 'true' : 'false',
            });
        });

        return subjectsMap;
    }
}

export default printService();
