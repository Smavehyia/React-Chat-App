const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server');

const app = express()
const chatKit = new Chatkit.default({
    instanceLocator: 'v1:us1:d9c5edea-aaff-445a-9148-adc2ddab3e6a',
    key: 'd07a6e3f-1dbc-4957-aa8a-dbf82e1960d0:6QtyfgklO42WjSRDQ8zkDQXO49tTr6yqnjofXPI2Fzo=',
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { userName } = req.body;

    chatKit.createUser({
        id: userName,
        name: userName,
    }).then(() => {
        console.log('User created successfully');
        res.sendStatus(201);
    }).catch((error) => {
        if(error.error === 'services/chatkit/user_already_exists'){
            res.sendStatus(200);
        } else {
            res.status(error.status).json(error);

        }
    })
})

app.post('/authenticate', (req, res) => {
    const data = chatKit.authenticate({ userId: req.query.user_id});
    res.status(data.status).send(data.body);
})
const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Listening on port ${PORT}`)
  }
})
