var async = require('async'),
  debug = require('debug')('nosqlimport');

debug('Using couchdb nosqlimport writer');

var writer = function(opts) {

  var stream = require('stream'),
    buffer = [ ],
    written = totalfailed = 0,
    buffer_size = 500;
    parallelism = 5;
    
  var cloudant = require('cloudant')(opts.url);
  var db = cloudant.db.use(opts.database);

  debug('CouchDB URL: ' + opts.url.replace(/\/\/.+@/g, "//****:****@"));
  debug('CouchDB Database: ' + opts.database);

  // process the writes in bulk as a queue
  var q = async.queue(function(payload, cb) {
    db.bulk(payload, function(err, data) {
      if (err) {
        writer.emit('writeerror', err);
      } else {
        var ok = failed = 0;
        for(var i in data) {
          var d = data[i];
          var isok = (d.id && d.rev)?true:false;
          if (isok) {
            ok++;
          } else {
            failed++;
            writer.emit("writefail", d);
            debug(d);
          }
        }
        written += ok;
        totalfailed += failed
        writer.emit("written", { documents: ok, failed: failed, total: written, totalfailed: totalfailed});
        debug({ documents: ok, failed: failed, total: written, totalfailed: totalfailed});
      }
      cb();
    });
  }, parallelism);
  
  
  // write the contents of the buffer to CouchDB in blocks of 500
  var processBuffer = function(flush, callback) {
  
    if (flush || buffer.length>= buffer_size) {
      var toSend = buffer.splice(0, buffer.length);
      buffer = [];
      q.push({docs: toSend});
      
      // wait until the buffer size falls to a reasonable level
      async.until(
        
        // wait until the queue length drops to twice the paralellism 
        // or until empty
        function() {
          if(flush) {
            return q.idle() && q.length() ==0
          } else {
            return q.length() <= parallelism * 2
          }
        },
        
        function(cb) {
          setTimeout(cb,100);
        },
        
        function() {
          if (flush) {
            writer.emit("writecomplete", { total: written , totalfailed: totalfailed});
          }
          callback();
        });


    } else {
      callback();
    }
  }

  var writer = new stream.Transform( { objectMode: true } );

  // take an object
  writer._transform = function (obj, encoding, done) {

    // add to the buffer, if it's not an empty object
    if (obj && typeof obj === 'object' && Object.keys(obj).length>0) {
      buffer.push(obj);
    }

    // optionally write to the buffer
    this.pause();
    processBuffer(false,  function() {
      done();
    });

  };

  // called when we need to flush everything
  writer._flush = function(done) {
    processBuffer(true, function() {
      done();
    });
  };
  
  return writer;
};

module.exports = {
  writer: writer
}