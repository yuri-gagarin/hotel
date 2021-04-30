export default {
    dbSettings: {
        mongoURI: process.env.DEV_MONGO_URI,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        useFindAndModify: false
    }
};

