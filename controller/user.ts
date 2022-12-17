import User, { UserDoc } from '../model/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const createUser = async (req: any, res: any) => {
    try {
        const params: UserDoc = req.body;
        params.password = bcrypt.hashSync(params.password.toString(), 10);
        let username = await User.findOne({ email: params.username });
        if (username) {
            return res.status(401).json({ error: "user already exists!!!" });
        }
        const user = await User.create(params);

        res.status(200).send({
            message: "User register successfully",
            IsSuccess: true,
            result: user
        });
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const getUserById = async (req: any, res: any) => {
    try {
        const params = req.body;
        const user = await User.findOne({ _id: params.id });
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const updateUser = async (req: any, res: any) => {
    try {
        const params = req.body;
        const user = await User.findOneAndUpdate({ _id: params.id }, params);
        res.status(200).send({
            message: "User details updated successfully",
            IsSuccess: true,
            result: user
        });
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const deleteUser = async (req: any, res: any) => {
    try {
        const params = req.body;
        const user = await User.deleteOne({ _id: params.id });
        res.status(200).send({
            message: "User deleted successfully",
            IsSuccess: true,
            result: user
        });
    } catch (error) {
        res.status(404).send('error', error);
    }
}

const login = async (req: any, res: any) => {
    try {
        const params = req.body;
        const user = await User.findOne({ username: params.username });
        let checkPassword;
        if (user) {
            checkPassword = await bcrypt.compare(params.password, user.password.toString())
        }
        if (!user || !checkPassword) {
            return res.status(401).json({ error: "Please enter valid username or password" });
        }
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
            },
            'Secret'
        );
        res.header("Authorization", token).json({
            data: { token, user },
        });
    } catch (error) {
        return res.status(401).json({ error: "Please enter valid email or password" });
    }
}
export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    login
}