# nosqlimport-couchdb

A module for [nosqlimport](https://www.npmjs.com/package/nosqlimport) that allows data to be published to CouchDB or Cloudant.

## Installation

```sh
npm install -g nosqlimport nosqlimport-couchdb
```

## Import data to CouchDB

```sh
cat test.tsv | nosqlimport --db mydb -u http://localhost:5984 -n couchdb
```

See [nosqlimport](https://www.npmjs.com/package/nosqlimport) for further options.
