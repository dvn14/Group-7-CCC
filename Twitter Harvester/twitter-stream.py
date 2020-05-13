# -*- coding: utf-8 -*-
"""
Created on Thu Apr 23 18:33:42 2020

@author: devin
"""
from __future__ import absolute_import, print_function
from tweepy import OAuthHandler, Stream, StreamListener

import params
import keywords

import json
import time
from datetime import datetime
import logging
import re

# Go to http://apps.twitter.com and create an app.
# The consumer key and secret will be generated for you after
consumer_key=params.CONSUMER_KEY
consumer_secret=params.CONSUMER_SECRET


# After the step above, you will be redirected to your app's page.
# Create an access token under the the "Your access token" section
access_token=params.ACCESS_TOKEN
access_token_secret=params.ACCESS_TOKEN_SECRET

i = 1
total = params.STREAM_START
added = 0
errors = 0
total_errors = 0
coordinates_added = 0
coordinates_total = 0
logging.basicConfig(filename=params.OUTPUT_LOG ,level=logging.DEBUG)


class Tweet:
    def __init__(self,id,point,text,city,exercise,food,film,stamp) :
        self._id = id
        self.point = point
        self.city = city
        self.exercise = exercise
        self.food = food
        self.film = film
        self.text = text
        self.stamp = stamp
    
    def __str__(self):
       return self.name
    
    
def convert_to_dict(obj):
    """
    A function takes in a custom object and returns a dictionary representation of the object.
    This dict representation includes meta data such as the object's module and class names.
    """
    #  Populate the dictionary with object meta data 
    obj_dict = {
        "__class__": obj.__class__.__name__,
        "__module__": obj.__module__
    }
  
    #  Populate the dictionary with object properties
    obj_dict.update(obj.__dict__)
  
    return obj_dict


class StdOutListener(StreamListener):
    """
    A listener handles tweets that are received from the stream.
    This is a basic listener that just prints received tweets to stdout.
    """
    def __init__(self, time_limit=14):
        self.start_time = time.time()
        self.limit = time_limit*60
        self.file = open(params.STREAM_OUTPUT, 'a+', encoding='utf-8')
        super(StdOutListener, self).__init__()
    
    def on_data(self, data):
        new_data = json.loads(data)
        id = new_data['id']
        stamp = new_data['created_at']
        text = new_data['text']
        try :
            city = new_data['place']['name']
        except :
            city = []
        
        try :
            point = new_data['coordinates']['coordinates']
            global coordinates_added
            coordinates_added += 1
        except :
            point = []
        
        food = 0
        film = 0
        exercise = 0
        
        if any(re.findall('|'.join(keywords.FOOD_KEYS), data.lower())) :
            food = 1
        if any(re.findall('|'.join(keywords.FILM_KEYS), data.lower())) :
            film = 1
        if any(re.findall('|'.join(keywords.EXERCISE_KEYS), data.lower())) :
            exercise = 1
        
        new_tweet = Tweet(id, point, text, city, exercise, food, film, stamp)
        
        json.dump(new_tweet.__dict__, self.file, ensure_ascii=False)
        self.file.write('\n')
        global added
        added += 1
        
        if (time.time() - self.start_time) <= self.limit:
            return True
        else:
            self.file.close()
            return False

    def on_error(self, status):
        json.dump(status, self.file, ensure_ascii=False)
        self.file.write('\n')
        global errors
        errors += 1
        if (time.time() - self.start_time) <= self.limit:
            return True
        else:
            self.file.close()
            return False

if __name__ == '__main__':
    while True:
        logging.info("round: %i start: %s", i, str(datetime.now()))
        l = StdOutListener(time_limit=14)
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)

        stream = Stream(auth, l)
        
        try :
            stream.filter(locations=params.AUS_GEO_RANGE)
        
            total += added
            total_errors += errors
            coordinates_total += coordinates_added
            logging.info("round: %i; completed: %s;\n added: %i; total: %i; errors: %i; total: %i; corr_add: %i; corr_tot: %i",
                         i, str(datetime.now()), added, total, errors, total_errors, coordinates_added, coordinates_total)
            i += 1
            added = 0
            errors = 0
            coordinates_added = 0
            time.sleep(120)  
        except Exception as e :
            stream.disconnect()
            logging.error("Error occured: ")
            logging.error(e)
            time.sleep(600)
            continue

