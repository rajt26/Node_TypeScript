import ToDo from '../model/todo'
import User from '../model/user';


const createToDoList = async (req: any, res: any) => {
    try {
        const params: typeof ToDo = req.body;
        const TodoList = await ToDo.create(params);
        res.status(200).send({
            message: "TodoList create successfully",
            IsSuccess: true,
            result: TodoList
        });
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const getAllToDoList = async (req: any, res: any) => {
    try {
        const TodoLists = await ToDo.find();
        res.status(200).send(TodoLists);
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const getToDoListByUserId = async (req: any, res: any) => {
    try {
        const params = req.body;
        const TodoLists = await ToDo.find({ user: params.userId });
        res.status(200).send(TodoLists);
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const getToDoListByStatus = async (req: any, res: any) => {
    try {
        const params = req.body;
        const TodoLists = await ToDo.find({ status: params.status });
        res.status(200).send(TodoLists);
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const updateToDoList = async (req: any, res: any) => {
    try {
        const params = req.body;
        const TodoList = await ToDo.findOneAndUpdate({ _id: params.id }, params);
        res.status(200).send({
            message: "TodoList details updated successfully",
            IsSuccess: true,
            result: TodoList
        });
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const deleteToDoList = async (req: any, res: any) => {
    try {
        const params = req.body;
        const user: any = await User.findOne({ _id: req.user.id })
        const todoList = await ToDo.findOne({ _id: params.id })

        if (user.role !== 1) {
            return res.status(404).send('You do not have delete permission');
        } else if (user.id !== todoList?.user) {
            return res.status(404).send('You do not have delete permission');
        }

        const TodoList = await ToDo.deleteOne({ _id: params.id });
        res.status(200).send({
            message: "TodoList deleted successfully",
            IsSuccess: true,
            result: TodoList
        });
    } catch (error) {
        res.status(404).send('error', error);
    }
}
export default {
    createToDoList,
    getAllToDoList,
    getToDoListByUserId,
    getToDoListByStatus,
    updateToDoList,
    deleteToDoList
}