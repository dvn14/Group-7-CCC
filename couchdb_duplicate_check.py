import os
from os import listdir
from os.path import isfile, join
import couchdb
import traceback
import json
import pandas as pd
from pandas.io.json import json_normalize

couch_db_ip_address='172.26.129.71'
data_base_name='my_database7'
#filePath='comp90024/couchdb/twitter/data.json'
filePath='stream-v8.json'

secure_remote_server = couchdb.Server('http://admin:admin@' + couch_db_ip_address + ':5984')
print("Connected")
if data_base_name in secure_remote_server:
    print("Data Base already exists")
    db = secure_remote_server[data_base_name]
else:
    print("Data Base does not exist. Creating it")
    db = secure_remote_server.create(data_base_name)
    print("Connected to DB")

with open(filePath, 'r+', encoding="utf-8") as tweetFile:
    for lineNum, line in enumerate(tweetFile):
        try:
           # data = line.replace('\'', '"')
            fdata = json.loads(line)
            fid = str(fdata['id'])
            point = str(fdata['point'])
            city = str(fdata['city'])
            exercise = str(fdata['exercise'])
            food = str(fdata['food'])
            film = str(fdata['film'])
            text = str(fdata['text'])
            stamp = str(fdata['stamp'])
            #string_fdata=str(fdata)
            #string_fid=str(fid)
            print(fdata)
            #print(fid)
            tweet_data = {
                        '_id': fid, 'point': point,'city':city,'exercise':exercise,'food':food,'film':film,'text':text,'stamp':stamp}
            print("test")
            db.save(tweet_data)

        except Exception as e:
            print("Error while updating DB data")
            stacktrace = traceback.format_exc()
            print(e.__doc__)
        else:
            stacktrace = ""
        finally:
            if stacktrace != "":
                print(stacktrace)
