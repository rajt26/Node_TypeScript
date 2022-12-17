import express from 'express';
import './db/connection'
import * as UserController from './controller/user';
import * as ToDoListController from './controller/todo';
import verifyToken from './middleware/verifyToken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes user
app.post('/createUser', UserController.default.createUser);
app.get('/getAllUsers', UserController.default.getAllUsers);
app.get('/getUserById', UserController.default.getUserById);
app.put('/updateUser', verifyToken, UserController.default.updateUser);
app.delete('/deleteUser', verifyToken, UserController.default.deleteUser);
app.post('/login', UserController.default.login);


// routes todo list
app.post('/createToDoList', verifyToken, ToDoListController.default.createToDoList);
app.get('/getAllToDoList', verifyToken, ToDoListController.default.getAllToDoList);
app.get('/getToDoListByUserId', verifyToken, ToDoListController.default.getToDoListByUserId);
app.get('/getToDoListByStatus', verifyToken, ToDoListController.default.getToDoListByStatus);
app.put('/updateToDoList', verifyToken, ToDoListController.default.updateToDoList);
app.delete('/deleteToDoList', verifyToken, ToDoListController.default.deleteToDoList);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})