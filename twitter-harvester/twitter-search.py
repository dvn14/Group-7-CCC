# COMP90024 Cluster and Cloud Computing
# Assignment 2, Semester 1 2020
# City Analytics on the Cloud
# Team 7
# Kurniawan Lastanto - 1114056 - Melbourne
# Mochammad Chaerudin - 1041681 - Melbourne
# Devin Nanayakkara - 1132751 - Melbourne
# Abhishek Anand - 1005884 - Melbourne
# Shaik Anisuzzaman - 1060370 - Melbourne
#
# Purpose: twitter search harvester

# -*- coding: utf-8 -*-
"""
Created on Mon May 18 22:55:56 2020

@author: devin
CCC2020 - Group 7
"""

#from __future__ import absolute_import, print_function
import tweepy

import params
import keywords

import time
import couchdb
import json
from shapely.geometry import shape, Point 

MAX_COUNT = 100
since_id = [-1, -1, -1]

"""
Prep: Geo boundary files
"""

aurin_nsw_file = open(params.NSW_GEO, 'r', encoding='utf-8')
nsw_json = json.load(aurin_nsw_file)
aurin_nsw_file.close()

for i, item in enumerate(nsw_json['features'],start=0) :
    nsw_json['features'][i]['sa4_name'] = item['properties']['sa4_name16']
    nsw_json['features'][i]['sa4_code'] = item['properties']['sa4_code16']
    nsw_json['features'][i].pop('properties')
    nsw_json['features'][i].pop('id')
    polygon = shape(item['geometry'])
    midpoint = polygon.centroid
    nsw_json['features'][i]['midpoint'] = [midpoint.x ,midpoint.y]

nsw_json.pop('crs')
    
aurin_aus_file = open(params.AUS_GEO, 'r', encoding='utf-8')
aus_json = json.load(aurin_aus_file)
aurin_aus_file.close()
aus_list = []

class AUS:
    def __init__(self,code,city,mp) :
        self.code = code
        self.city = city
        self.midpoint = mp
    
    def __str__(self):
       return self.name
   

for i, item in enumerate(aus_json['features'], start=0) :
    name = item['properties']['gccsa_name16']
    if ('Rest of ' not in name) :
        name = name.replace('Greater ','')
        name = 'Canberra' if 'Australian Capital Territory' in name else name
        code = item['properties']['gccsa_code16']
        
        polygon = shape(item['geometry'])
        midpoint = polygon.centroid
        mp = [midpoint.x ,midpoint.y]
        new_aus = AUS(code, name, mp)
        aus_list.append(new_aus)

"""
Start harvester
"""

while True:    
    couch_db_ip_address='127.0.0.1'
    data_base_name='tweet'
    try :
        secure_remote_server = couchdb.Server('http://admin:admin@' + couch_db_ip_address + ':5984')
        if data_base_name in secure_remote_server:
            print("Data Base already exists")
            db = secure_remote_server[data_base_name]
        else:
            print("Data Base does not exist. Creating it")
            db = secure_remote_server.create(data_base_name)
            print("Connected to DB")
    except Exception as e :
        print("could not connect to server")
        print(e.__doc__)

    file = open(params.SEARCH_OUTPUT, 'a+', encoding='utf-8')
    
    limit = [10, 10, 10]
    for i in [0,1,2] :
        consumer_key= params.CONSUMER_KEY_SET[i]
        consumer_secret= params.CONSUMER_SECRET_SET[i]
        access_token= params.ACCESS_TOKEN_SET[i]
        access_token_secret= params.ACCESS_TOKEN_SECRET_SET[i]

        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        
        food = 1 if i == 0 else 0
        film = 1 if i == 1 else 0
        exercise = 1 if i == 2 else 0

        while limit[i] > 0:
            since = None if since_id[i] == -1 else since_id[i]

            tweets = api.search(q=keywords.SEARCH_KEYS[i], include_entities=True,
                                lang="en", count=MAX_COUNT, since_id=since_id,
                                geocode=params.SYD_GEO_RANGE)
            
            if len(tweets) > 0:
                for tweet in tweets :
                    id = tweet.id
                    stamp = tweet.created_at
                    text = tweet.text
                    gccsa_code = None
                    gccsa_mp = None
                    sa4_name = None
                    sa4_code = None
                    sa4_midpoint = None
                    try :
                        point = tweet.coordinates.coordinates
                        for feature in nsw_json['features'] :
                            polygon = shape(feature['geometry'])
                            if polygon.contains(Point(point)):
                                sa4_name = feature['sa4_name']
                                sa4_code = feature['sa4_code']
                                sa4_midpoint = feature['midpoint']
                                break
                    except :
                        None
                    
                    try :
                        city = tweet.place.name
                        city = 'Perth' if 'Perth' in city else city
                        if city in ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 
                                    'Perth', 'Hobart', 'Darwin', 'Canberra'] :
                            for item in aus_list :
                                if item.city == city:
                                    gccsa_code = item.code
                                    gccsa_mp = item.midpoint
                    except :
                        city = None
                    
                    data = {
                        '_id': str(id),
                        'city':city,
                        'gccsa_code': gccsa_code,
                        'gccsa_midpoint': gccsa_mp,
                        'sa4_name': sa4_name,
                        'sa4_code': sa4_code,
                        'sa4_midpoint': sa4_midpoint,
                        'exercise':exercise,
                        'food':food,
                        'film':film,
                        'text':text,
                        'stamp':stamp}
                    try :
                        db.save(data)
                    except Exception as e:
                        print("Error while updating DB data")
                        print(e.__doc__)
                    
                    json.dump(data, file, ensure_ascii=False)
                    file.write('\n')
                since_id[i] = id

            limit[i] = int(api.last_response.headers['x-rate-limit-remaining'])
        
    file.close()
    time.sleep(16*60)
