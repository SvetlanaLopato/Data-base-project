import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import commentService from './dataBaseServices/commentService';
import studentService from './dataBaseServices/studentService';
import teacherService from './dataBaseServices/teacherService';
import groupCourseService from './dataBaseServices/groupCourseService';
import subjectsService from './dataBaseServices/subjectsService';
import printService from './printService';

const server = express();
const port = 3000;

server.use(express.static('public'));
server.use(bodyParser.json());

server.get('/api/print', print);

server.get('/api/comments', getComments);
server.post('/api/comments', createComment);
server.get('/api/comments/:id', getComment);
server.put('/api/comments/:id', updateComment);
server.delete('/api/comments/:id', deleteComment);

server.get('/api/students/names', getStudentsNames);
server.get('/api/students', getStudents);
server.post('/api/students', createStudent);
server.get('/api/students/:id', getStudent);
server.put('/api/students/:id', updateStudent);
server.get('/api/students/:id/subjects', getStudentSubjects);
server.post('/api/students/:id/subjects', createStudentSubject);
server.get('/api/students/:studentId/subjects/:subjectId', getStudentSubject);
server.put('/api/students/:studentId/subjects/:subjectId', updateStudentSubject);

server.get('/api/teachers/names', getTeachersNames);
server.get('/api/teachers', getTeachers);
server.post('/api/teachers', createTeacher);
server.get('/api/teachers/:id', getTeacher);
server.put('/api/teachers/:id', updateTeacher);
server.post('/api/teacher/:id/subjects', createTeacherSubject);
server.get('/api/teachers/:id/subjects', getTeacherSubjects);
server.get('/api/teachers/teacherSubjects/:id', getTeacherSubject);
server.put('/api/teachers/teacherSubjects/:id', updateTeacherSubject);

server.get('/api/subjects', getSubjects);
server.post('/api/subjects', createSubject);
server.get('/api/subjects/:id', getSubject);
server.put('/api/subjects/:id', updateSubject);

server.get('/api/groupsCourses', getGroupsCourses);
server.post('/api/groupsCourses', createGroupCourse);
server.get('/api/groupsCourses/:id', getGroupCourse);
server.put('/api/groupsCourses/:id', updateGroupCourse);

server.get('*', sendFile);


server.listen(port, function () {
    console.log('App application listening on port 3000!');
});

function sendFile(request, result) {
    result.sendFile(path.resolve('./public/index.html'));
}

function print(req, res) {
    const comments = commentService.getComments();
    const students = studentService.getStudents();
    const teachers = teacherService.getTeachers();
    const subjects = subjectsService.getSubjects();
    const groupsCourses = groupCourseService.getGroupsCourses();
    const studentsSubjects = studentService.getStudentsSubjects();

    Promise.all([comments, students, teachers, subjects, groupsCourses, studentsSubjects])
        .then(printService.print)
        .then(result => res.send('Done!'));
}

function getComments(req, res) {
    const { sortBy, filterBy } = req.query;

    if (sortBy) {
        commentService.sortComments(sortBy).then(result => res.send(result));
        return;
    }

    if (filterBy) {
        commentService.filterComments(filterBy).then(result => res.send(result));
        return;
    }

    commentService.getComments().then(result => res.send(result));
}

function getComment(req, res) {
    commentService.getComment(req.params.id).then(result => res.send(result));
}

function updateComment(req, res) {
    commentService.updateComment(req.params.id, req.body).then(result => res.send(result));
}

function createComment(req, res) {
    commentService.createComment(req.body).then(result => res.send(result));
}

function deleteComment(req, res) {
    commentService.deleteComment(req.params.id).then(result => res.send(result));
}

function getStudentsNames(req, res) {
    studentService.getStudentsNames().then(result => res.send(result));
}

function getStudents(req, res) {
    studentService.getStudents().then(result => res.send(result));
}

function getStudent(req, res) {
    studentService.getStudent(req.params.id).then(result => res.send(result));
}

function updateStudent(req, res) {
    studentService.updateStudent(req.params.id, req.body).then(result => res.send(result));
}

function createStudent(req, res) {
    studentService.createStudent(req.body).then(result => res.send(result));
}

function getStudentSubjects(req, res) {
    studentService.getStudentSubjects(req.params.id).then(result => res.send(result));
}

function createStudentSubject(req, res) {
    studentService.createStudentSubject(req.params.id, req.body).then(result => res.send(result));
}

function getStudentSubject(req, res) {
    studentService.getStudentSubject(req.params.studentId, req.params.subjectId).then(result => res.send(result));
}

function updateStudentSubject(req, res) {
    studentService.updateStudentSubject(req.params.studentId, req.params.subjectId, req.body).then(result => res.send(result));
}

function getTeachersNames(req, res) {
    teacherService.getTeachersNames().then(result => res.send(result));
}

function getTeachers(req, res) {
    teacherService.getTeachers().then(result => res.send(result));
}

function getTeacherSubjects(req, res) {
    teacherService.getTeacherSubjects(req.params.id).then(result => res.send(result));
}

function getTeacherSubject(req, res) {
    teacherService.getTeacherSubject(req.params.id).then(result => res.send(result));
}

function updateTeacherSubject(req, res) {
    teacherService.updateTeacherSubject(req.params.id, req.body).then(result => res.send(result));
}

function createTeacherSubject(req, res) {
    teacherService.createTeacherSubject(req.params.id, req.body).then(result => res.send(result));
}

function getTeacher(req, res) {
    teacherService.getTeacher(req.params.id).then(result => res.send(result));
}

function updateTeacher(req, res) {
    teacherService.updateTeacher(req.params.id, req.body).then(result => res.send(result));
}

function createTeacher(req, res) {
    teacherService.createTeacher(req.body).then(result => res.send(result));
}

function getSubjects(req, res) {
    subjectsService.getSubjects().then(result => res.send(result));
}

function createSubject(req, res) {
    subjectsService.createSubject(req.body).then(result => res.send(result));
}

function updateSubject(req, res) {
    subjectsService.updateSubject(req.params.id, req.body).then(result => res.send(result));
}

function getSubject(req, res) {
    subjectsService.getSubject(req.params.id).then(result => res.send(result));
}

function getGroupsCourses(req, res) {
    groupCourseService.getGroupsCourses().then(result => res.send(result));
}

function createGroupCourse(req, res) {
    groupCourseService.createGroupCourse(req.body).then(result => res.send(result));
}

function updateGroupCourse(req, res) {
    groupCourseService.updateGroupCourse(req.params.id, req.body).then(result => res.send(result));
}

function getGroupCourse(req, res) {
    groupCourseService.getGroupCourse(req.params.id).then(result => res.send(result));
}
