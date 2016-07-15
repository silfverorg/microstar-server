#!/usr/bin/env node 
var amqp = require('amqplib/callback_api');

var obj = {
  id: "577e8084889c698e15d7782b",
  _session: {},
  _env: {},
  _event_date: 1458840310163,
  event_name: "My test event",
  event_data: {
    foo: "bar"
  },
};

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'microstar_events';
    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer(JSON.stringify(obj)))
    setTimeout(function() {
      conn.close();
      process.exit(0);
    }, 500);
  });
});
