import moongose from 'mongoose';

const connectDB = async () => {
    moongose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    await moongose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

export default connectDB;