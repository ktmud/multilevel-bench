var common = require('./common');

var str = common.str
var iterations = 400000;
var __dir = __dirname + '/var';
var PORT = 18904;

function generateKeys(n) {
  var ret = [];
  var len, key;
  while (n--) {
    var len = Math.floor(Math.random() * 50) + 5;
    var key = common.randomString(len);
    ret.push(key);
  }
  return ret;
}

var keys = generateKeys(3 * iterations);


// ========= Random keys ==============

suite('levelUP (random keys, 100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var levelup = require('levelup');
  var rimraf = require('rimraf');
  var db;

  before(function(done) {
    rimraf.sync(__dir + '/levelup');
    db = levelup(__dir + '/levelup', done);
  })
  after(function(done) {
    db.close(done);
  });

  var i = 0;
  bench('set small', function (done) { db.put(keys[i++], str.small, done) });
  bench('set medium', function (done) { db.put(keys[i++], str.medium, done) });
  bench('set large', function (done) { db.put(keys[i++], str.large, done) });
  bench('get large', function (done) { db.get(keys[--i], done) });
  bench('get medium', function (done) { db.get(keys[--i], done) });
  bench('get small', function (done) { db.get(keys[--i], done) });
});

//suite('levelDOWN (random keys, 100.000x)', function () {
  //set('type', 'static');
  //set('iterations', iterations);

  //var leveldown = require('leveldown');
  //var rimraf = require('rimraf');
  //var db;

  //before(function(done) {
    //rimraf.sync(__dir + '/leveldown');
    //db = leveldown(__dir + '/leveldown');
    //db.open(done);
  //})
  //after(function(done) {
    //db.close(done);
  //});

  //var i = 0;
  //bench('set small', function (done) { db.put(keys[i++], str.small, done) });
  //bench('set medium', function (done) { db.put(keys[i++], str.medium, done) });
  //bench('set large', function (done) { db.put(keys[i++], str.large, done) });
  //bench('get large', function (done) { db.get(keys[--i], done) });
  //bench('get medium', function (done) { db.get(keys[--i], done) });
  //bench('get small', function (done) { db.get(keys[--i], done) });
//});

//suite('lmdb (random keys, 100.000x)', function () {
  //set('type', 'static');
  //set('iterations', iterations);
  //var lmdb = require('lmdb');
  //var rimraf = require('rimraf');

  //rimraf.sync(__dir + '/lmdb');
  //var db = lmdb(__dir + '/lmdb');

  //before(function(next) {
    //db.open(next);
  //});

  //after(function(next) {
    //db.close(next);
  //});

  //var i = 0;
  //bench('set small', function (done) { db.put(keys[i++], str.small, done) });
  //bench('set medium', function (done) { db.put(keys[i++], str.medium, done) });
  //bench('set large', function (done) { db.put(keys[i++], str.large, done) });
  //bench('get large', function (done) { db.get(keys[--i], done) });
  //bench('get medium', function (done) { db.get(keys[--i], done) });
  //bench('get small', function (done) { db.get(keys[--i], done) });
//});

suite('levelup lmdb (random keys, 100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);
  var levelup = require('levelup');
  var lmdb = require('lmdb');
  var rimraf = require('rimraf');

  rimraf.sync(__dir + '/lmdb');
  var db = levelup(__dir + '/lmdb', {
    mapSize: 2 * 1024 * 1024 * 1024, // 2G
    db: lmdb
  });

  var i = 0;
  bench('set small', function (done) { db.put(keys[i++], str.small, done) });
  bench('set medium', function (done) { db.put(keys[i++], str.medium, done) });
  bench('set large', function (done) { db.put(keys[i++], str.large, done) });
  bench('get large', function (done) { db.get(keys[--i], done) });
  bench('get medium', function (done) { db.get(keys[--i], done) });
  bench('get small', function (done) { db.get(keys[--i], done) });
});

suite('SSDB (random keys, 100.000x)', function () {
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
  bench('set small', function (done) { client.set(keys[i++], str.small, done) });
  bench('set medium', function (done) { client.set(keys[i++], str.medium, done) });
  bench('set large', function (done) { client.set(keys[i++], str.large, done) });
  bench('get large', function (done) { client.get(keys[--i], done) });
  bench('get medium', function (done) { client.get(keys[--i], done) });
  bench('get small', function (done) { client.get(keys[--i], done) });
});

suite('Redis (random keys, 100.000x)', function () {
  set('type', 'static');
  set('iterations', iterations);

  var redis = require('redis');
  var client = redis.createClient();
  before(function(next) {
    client.flushdb(next);
  });

  var i = 0;
  bench('set small', function (done) { client.set(keys[i++], str.small, done) });
  bench('set medium', function (done) { client.set(keys[i++], str.medium, done) });
  bench('set large', function (done) { client.set(keys[i++], str.large, done) });
  bench('get large', function (done) { client.get(keys[--i], done) });
  bench('get medium', function (done) { client.get(keys[--i], done) });
  bench('get small', function (done) { client.get(keys[--i], done) });
});

//suite('multilevel (random keys, 100.000x)', function () {
  //set('type', 'static');
  //set('iterations', iterations);

  //var boot = require('./multilevel-server.js');
  //var port = PORT;
  //var server = boot(port);
  //var net = require('net');
  //var multilevel = require('multilevel')
  //var db = multilevel.client();
  //var con = net.connect(port);
  //con.pipe(db.createRpcStream()).pipe(con);

  //after(function(next) {
    //con.end();
    //next();
  //});

  //var i = 0;
  //bench('set small', function (done) { db.put(keys[i++], str.small, done) });
  //bench('set medium', function (done) { db.put(keys[i++], str.medium, done) });
  //bench('set large', function (done) { db.put(keys[i++], str.large, done) });
  //bench('get large', function (done) { db.get(keys[--i], done) });
  //bench('get medium', function (done) { db.get(keys[--i], done) });
  //bench('get small', function (done) { db.get(keys[--i], done) });
//});

//suite('multilevel (standalone server process, random keys, 100.000x)', function () {
  //set('type', 'static');
  //set('iterations', iterations);

  //var child_process = require('child_process')
  //var child = child_process.fork('./multilevel-server.js')
  //var port = PORT + 2;
  //var net = require('net');
  //var multilevel = require('multilevel');
  //var db = multilevel.client();
  //var con;

  //before(function(next) {
    //child.send({ port: port });
    //setTimeout(function() {
      //con = net.connect(port)
      //con.pipe(db.createRpcStream()).pipe(con);
      //next();
    //}, 100);
  //});

  //after(function(next) {
    //con.end();
    //child.kill();
    //next();
  //});

  //var i = 0;
  //bench('set small', function (done) { db.put(keys[i++], str.small, done) });
  //bench('set medium', function (done) { db.put(keys[i++], str.medium, done) });
  //bench('set large', function (done) { db.put(keys[i++], str.large, done) });
  //bench('get large', function (done) { db.get(keys[--i], done) });
  //bench('get medium', function (done) { db.get(keys[--i], done) });
  //bench('get small', function (done) { db.get(keys[--i], done) });
//});
