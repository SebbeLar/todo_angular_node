var express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  app = express();

mongoose.connect('mongodb://node:node@apollo.modulusmongo.net:27017/xIqynu6r');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Todo = mongoose.model('Todo', {
    text: String
});

// ROUTES

app.get('/api/todos', function(req, res) {

  Todo.find(function(err, todos) {

    if(err) {

      res.send(err);
    }

    res.json(todos);
  });
});

app.post('/api/todos', function(req, res) {

  Todo.create({

    text: req.body.text,
    done: false
  }, function(err, todo) {

    if(err) {
      res.send(err);
    }

    Todo.find(function(err, todos) {

      if(err) {

        res.send(err);
      }

      res.json(todos);
    });
  });
});

app.delete('/api/todos/:todo_id', function(req, res) {

  Todo.remove({

    _id: req.params.todo_id
  }, function(err, todo) {

    if(err) {

      res.send(err);
    }

    Todo.find(function(err, todos) {

      if(err) {

        res.send(err);
      }

      res.json(todos);
    });
  });
});

app.get('*', function(req, res) {

  res.sendFile('./public/index.html');
});

app.listen(8080);
console.log('App listening on port 8080');
