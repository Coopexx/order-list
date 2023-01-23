const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((con) => {
        console.log(con.connections);
        console.log('DB connection sucessful!');
    });

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.end;
    ('Hello from the server!');
});

server.listen(port, '127.0.0.1', () => {
    console.log(`Listening to requests on port ${port}`);
});
