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
# Purpose: Twitter stream harvester

# -*- coding: utf-8 -*-
"""
Created on Thu Apr 23 18:33:42 2020

@author: devin
CCC2020 - Group 7
"""

from __future__ import absolute_import, print_function
from tweepy import OAuthHandler, Stream, StreamListener

import params
import keywords

import json
import time
import re
import couchdb
import os
from shapely.geometry import shape, Point 

# Go to http://apps.twitter.com and create an app.
# The consumer key and secret will be generated for you after
consumer_key=params.CONSUMER_KEY
consumer_secret=params.CONSUMER_SECRET


# After the step above, you will be redirected to your app's page.
# Create an access token under the the "Your access token" section
access_token=params.ACCESS_TOKEN
access_token_secret=params.ACCESS_TOKEN_SECRET


class AUS:
    def __init__(self,code,city,mp) :
        self.code = code
        self.city = city
        self.midpoint = mp
    
    def __str__(self):
       return self.name


class StdOutListener(StreamListener):
    """
    A listener handles tweets that are received from the stream.
    This is a basic listener that just prints received tweets to stdout.
    """
    def __init__(self, time_limit=14, aus_list=[], nsw_json=[]):
        self.start_time = time.time()
        self.limit = time_limit*60
        self.file = open(params.STREAM_OUTPUT, 'a+', encoding='utf-8')
        self.aus = aus_list
        self.nsw = nsw_json
        
        couch_db_ip_address='127.0.0.1'
        data_base_name='tweet'
        try :
            secure_remote_server = couchdb.Server('http://admin:admin@' + couch_db_ip_address + ':5984')
            if data_base_name in secure_remote_server:
                print("Data Base already exists")
                self.db = secure_remote_server[data_base_name]
            else:
                print("Data Base does not exist. Creating it")
                self.db = secure_remote_server.create(data_base_name)
                print("Connected to DB")
        except Exception as e :
            print("could not connect to server")
            print(e.__doc__)
            
        super(StdOutListener, self).__init__()
    
    def on_data(self, data):
        new_data = json.loads(data)
        id = new_data['id']
        stamp = new_data['created_at']
        text = new_data['text']
        gccsa_code = None
        gccsa_mp = None
        sa4_name = None
        sa4_code = None
        sa4_midpoint = None
        
        try :
            city = new_data['place']['name']
            city = 'Perth' if 'Perth' in city else city
            if city in ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 
                        'Perth', 'Hobart', 'Darwin', 'Canberra'] :
                for item in self.aus :
                    if item.city == city:
                        gccsa_code = item.code
                        gccsa_mp = item.midpoint
        except :
            city = None
        
        try :
            point = new_data['coordinates']['coordinates']
            for feature in self.nsw['features'] :
                polygon = shape(feature['geometry'])
                if polygon.contains(Point(point)):
                    sa4_name = feature['sa4_name']
                    sa4_code = feature['sa4_code']
                    sa4_midpoint = feature['midpoint']
                    break
        except :
            None
        
        food = 0
        film = 0
        exercise = 0
        
        if any(re.findall('|'.join(keywords.FOOD_KEYS), data.lower())) :
            food = 1
        if any(re.findall('|'.join(keywords.FILM_KEYS), data.lower())) :
            film = 1
        if any(re.findall('|'.join(keywords.EXERCISE_KEYS), data.lower())) :
            exercise = 1
        
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
            self.db.save(data)
        except Exception as e:
            print("Error while updating DB data")
            print(e.__doc__)
        
        json.dump(data, self.file, ensure_ascii=False)
        self.file.write('\n')
        
        if (time.time() - self.start_time) <= self.limit:
            return True
        else:
            self.file.close()
            return False

    def on_error(self, status):
        json.dump(status, self.file, ensure_ascii=False)
        self.file.write('\n')
        if (time.time() - self.start_time) <= self.limit:
            return True
        else:
            self.file.close()
            return False

if __name__ == '__main__':
    
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
        l = StdOutListener(14, aus_list, nsw_json)
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        stream = Stream(auth, l)
        
        try :
            stream.filter(locations=params.AUS_GEO_RANGE)
            time.sleep(120)  
        except Exception as e :
            stream.disconnect()
            print(e.__doc__)
            time.sleep(600)
            continue

