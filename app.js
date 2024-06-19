const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

let users = [];

app.get('/', (req, res) => {
    res.send(`
        <form action="/add-user" method="POST">
            <input type="text" name="username" placeholder="Enter your name">
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/add-user', (req, res) => {
    const username = req.body.username;
    if (username) {
        users.push(username);
        res.redirect('/users');
    } else {
        res.send('Error: Username cannot be empty');
    }
});

app.get('/users', (req, res) => {
    if (users.length > 0) {
        res.send(`
            <h1>List of Users</h1>
            <ul>
                ${users.map(user => `<li>${user}</li>`).join('')}
            </ul>
        `);
    } else {
        res.send('No users found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
