const express = require('express');

const Hubs = require('./hubs/hubs-model.js');

const server = express();

server.use(express.json());  // req body
// cors

server.get('/', (req, res) => {
  var a = 1
  a++
  a++
  a -= 7
  console.log(a);
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.get('/api/hubs', (req, res) => {
  Hubs.find(req.query)
  .then(hubs => {
    res.status(200).json(hubs);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  });
});

server.get('/api/hubs/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  // 3 main things we can fish from req:

  // - url parameters req.params.id
  // - body req.body
  // - query string http://google.com?search=cats req.query.search
  Hubs.findById(req.params.id)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  });
});

server.post('/api/hubs', (req, res) => {
  Hubs.add(req.body)
  .then(hub => {
    res.status(201).json(hub);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  });
});

server.delete('/api/hubs/:id', (req, res) => {
  Hubs.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  });
});

server.put('/api/hubs/:id', (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  });
});

// we need to export the server
module.exports = server;