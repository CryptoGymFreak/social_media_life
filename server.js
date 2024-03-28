const express = require('express');
const app = express();
const db = require('./config/connection');
//const { User } = require('./models');

const routes = require("./routes")


// express.json, express.urlencoded are middlewares that are used to parse the body of the request.
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(routes);

// app.post('/api/user', async (req, res) => {
//     console.log(req.body)
//     try {
//       const check = await User.collection.insert({
//         username: req.body.username,
//         email: req.body.email
//       });
//       res.json(check);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
// }) // createUser end

// Heroku has a variable at process.env.PORT that could be 6067, 6068, etc for example.
// The || is checking if process.env.port is undefined, then it will use 3000.
// || is an OR short circuit operator

const port = process.env.PORT || 3000;
db.once('open', () => {
    app.listen(port, () => {
        console.log('Server is running on port 3000');
    });
});