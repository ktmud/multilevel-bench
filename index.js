function generateString(i) {
  var ret = ''
  while (i) {
    i -= 1
    ret += '{123456789abcdefg}'
  }
  return ret
}

var str = {
  large : generateString(50),
  medium : generateString(20),
  small : generateString(1)
}
var iterations = 100000;
var __dir = __dirname + '/var';
var PORT = 18904;

suite('Redis (100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var redis = require('redis');
  var client = redis.createClient();
  before(function(next) {
    client.flushdb(next);
  });

  var i = 0;
  bench('set small', function (done) { client.set(i++, str.small, done) });
  bench('set medium', function (done) { client.set(i++, str.medium, done) });
  bench('set large', function (done) { client.set(i++, str.large, done) });
  bench('get large', function (done) { client.get(--i, done) });
  bench('get medium', function (done) { client.get(--i, done) });
  bench('get small', function (done) { client.get(--i, done) });
});

suite('SSDB (100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var redis = require('redis');
  var client = redis.createClient(8888);

  before(function(next) {
    client.keys(function(err, keys){
      client.multi([
        [ 'multi_del', keys ]
      ]).exec(next);
    });
  });

  var i = 0;
  bench('set small', function (done) { client.set(i++, str.small, done) });
  bench('set medium', function (done) { client.set(i++, str.medium, done) });
  bench('set large', function (done) { client.set(i++, str.large, done) });
  bench('get large', function (done) { client.get(--i, done) });
  bench('get medium', function (done) { client.get(--i, done) });
  bench('get small', function (done) { client.get(--i, done) });
});

suite('levelUP (100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var levelup = require('levelup');
  var rimraf = require('rimraf');

  rimraf.sync(__dir + '/levelup');
  var db = levelup(__dir + '/levelup');

  var i = 0;
  bench('set small', function (done) { db.put(i++, str.small, done) });
  bench('set medium', function (done) { db.put(i++, str.medium, done) });
  bench('set large', function (done) { db.put(i++, str.large, done) });
  bench('get large', function (done) { db.get(--i, done) });
  bench('get medium', function (done) { db.get(--i, done) });
  bench('get small', function (done) { db.get(--i, done) });
});

suite('levelDOWN (100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var leveldown = require('leveldown');
  var rimraf = require('rimraf');

  rimraf.sync(__dir + '/leveldown');
  var db = leveldown(__dir + '/leveldown');
  db.open(function (err) {
    if (err) throw err;
  });

  var i = 0;
  bench('set small', function (done) { db.put(i++, str.small, done) });
  bench('set medium', function (done) { db.put(i++, str.medium, done) });
  bench('set large', function (done) { db.put(i++, str.large, done) });
  bench('get large', function (done) { db.get(--i, done) });
  bench('get medium', function (done) { db.get(--i, done) });
  bench('get small', function (done) { db.get(--i, done) });
});

suite('lmdb (100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);
  var levelup = require('levelup');
  var lmdb = require('lmdb');
  var rimraf = require('rimraf');

  rimraf.sync(__dir + '/lmdb');
  var db = levelup(__dir + '/lmdb', { db: lmdb });

  var i = 0;
  bench('set small', function (done) { db.put(i++, str.small, done) });
  bench('set medium', function (done) { db.put(i++, str.medium, done) });
  bench('set large', function (done) { db.put(i++, str.large, done) });
  bench('get large', function (done) { db.get(--i, done) });
  bench('get medium', function (done) { db.get(--i, done) });
  bench('get small', function (done) { db.get(--i, done) });
});

suite('multilevel (100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var boot = require('./multilevel-server.js');
  var port = PORT;
  var server = boot(port);
  var net = require('net');
  var multilevel = require('multilevel')
  var db = multilevel.client();
  var con = net.connect(port);
  con.pipe(db.createRpcStream()).pipe(con);

  after(function(next) {
    con.end();
    next();
  });

  var i = 0;
  bench('set small', function (done) { db.put(i++, str.small, done) });
  bench('set medium', function (done) { db.put(i++, str.medium, done) });
  bench('set large', function (done) { db.put(i++, str.large, done) });
  bench('get large', function (done) { db.get(--i, done) });
  bench('get medium', function (done) { db.get(--i, done) });
  bench('get small', function (done) { db.get(--i, done) });
});

suite('multilevel (standalone server process, 100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var child_process = require('child_process')
  var child = child_process.fork('./multilevel-server.js')
  var port = PORT + 2;
  var net = require('net');
  var multilevel = require('multilevel');
  var db = multilevel.client();
  var con;

  before(function(next) {
    child.send({ port: port });
    setTimeout(function() {
      con = net.connect(port)
      con.pipe(db.createRpcStream()).pipe(con);
      next();
    }, 100);
  });

  after(function(next) {
    con.end();
    child.kill();
    next();
  });

  var i = 0;
  bench('set small', function (done) { db.put(i++, str.small, done) });
  bench('set medium', function (done) { db.put(i++, str.medium, done) });
  bench('set large', function (done) { db.put(i++, str.large, done) });
  bench('get large', function (done) { db.get(--i, done) });
  bench('get medium', function (done) { db.get(--i, done) });
  bench('get small', function (done) { db.get(--i, done) });
});

suite('MemDOWN (10.000x)', function () {
  set('type', 'static');
  set('iterations', 10000);

  var levelup = require('levelup');
  var MemDOWN = require('memdown');
  var factory = function (loc) { return new MemDOWN(loc) }
  var rimraf = require('rimraf');

  rimraf.sync(__dir + '/levelup');
  var db = levelup(__dir + '/levelup', { db : factory });

  var i = 0;
  bench('set small', function (done) { db.put(i++, str.small, done) });
  bench('set medium', function (done) { db.put(i++, str.medium, done) });
  bench('set large', function (done) { db.put(i++, str.large, done) });
  bench('get large', function (done) { db.get(--i, done) });
  bench('get medium', function (done) { db.get(--i, done) });
  bench('get small', function (done) { db.get(--i, done) });
});

suite('Memory (100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var db = {};

  var i = 0;
  bench('set small', function () { db[i++] = str.small });
  bench('set medium', function () { db[i++] = str.medium });
  bench('set large', function () { db[i++] = str.large });
  bench('get small', function () { db[--i]+'' });
  bench('get medium', function () { db[--i]+'' });
  bench('get large', function () { db[--i]+'' });
});

