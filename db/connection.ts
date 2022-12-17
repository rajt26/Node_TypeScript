import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/todo_app', (err: any) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Successfully connected to database`);
    }
})
