import mongoose, {
    Mongoose,
    Schema
} from 'mongoose';
import { User } from './user';

enum Status {
    PENDING = 1,
    COMPLETED = 2
}

export interface TodoListDoc extends Document {
    name: String,
    description: String,
    dueDate: String,
    status: {
        type: Number,
        enum: Status,
        default: Status.PENDING
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}

export const TodoList = new Schema<TodoListDoc>({
    name: String,
    description: String,
    dueDate: String,
    status: {
        type: Number,
        enum: Status,
        default: Status.PENDING
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const todoList = mongoose.model<TodoListDoc>('todoList', TodoList);
export default todoList;