var net = require('net');
var multilevel = require('multilevel');
var levelup = require('levelup');
var rimraf = require('rimraf');

rimraf.sync(__dirname + '/var/multilevel');

var db = levelup(__dirname + '/var/multilevel');
var server;

function boot(port) {
  if (server && server.port === port) {
    return server
  }
  server = net.createServer(function (c) {
    c.pipe(multilevel.server(db)).pipe(c);
  })
  server.listen(port);
  return server;
}

module.exports = boot;

process.on('message', function(m) {
  if (m.port) {
    boot(m.port);
  }
});
