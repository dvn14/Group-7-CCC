import json

from couchdb.client import Server

server = Server('http://admin:admin@172.26.129.71:5984')
db = server['my_db4']

with open('mapper.json', 'r') as f:
    db.save(json.load(f))
