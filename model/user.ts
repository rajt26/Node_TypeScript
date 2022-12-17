import mongoose, {
    Schema
} from 'mongoose';



enum userRole {
    ADMIN = 1,
    USER = 2
}

export interface UserDoc extends Document {
    name: String,
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: userRole,
        default: userRole.USER
    }
}
export const User = new Schema<UserDoc>({
    name: String,
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: userRole,
        default: userRole.USER
    }
});

const users = mongoose.model<UserDoc>('users', User);
export default users;