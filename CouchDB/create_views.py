import json

from couchdb.client import Server

server = Server('http://admin:admin@localhost:5984')
db = server['my_db4']

with open('mapper.json', 'r') as f:
    db.save(json.load(f))
