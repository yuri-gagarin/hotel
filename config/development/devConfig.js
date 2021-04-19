export default {
    dbSettings: {
        mongoURI: process.env.devMongoURI
        username: process.env.userName
        password: process.env.password
        useFindAndModify: false
    },
    session: {
        secret: rocess.env.secret
        resave: true,
        saveUninitialized: true
    }

};

