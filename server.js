import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import ioClient from 'socket.io';
import mongoose from 'mongoose';
import Message from './models/message';

mongoose.connect('mongodb://localhost/node-db-chat');

const app = express();
const httpServer = http.Server(app);
const io = ioClient(httpServer);
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
});

app.post('/messages', (req, res) => {
  const message = new Message(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(500);
    }

    io.emit('message', req.body);
    res.sendStatus(200);
  })
});

io.on('connection', (socket) => {
  console.log('user connected');
})

const port = 3000;
const server = httpServer.listen(port, () => {
  console.log('Server listening on port', server.address().port);
});
