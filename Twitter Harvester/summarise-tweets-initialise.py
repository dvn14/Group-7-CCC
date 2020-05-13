"""
Below was used to create the summary json file initially
"""
"""
Created on Wed May  6 18:16:14 2020

@author: devin
"""
import json
from shapely.geometry import shape


class Location:
    def __init__(self,name,point) :
        self.name = name
        self.point = point
        self.exercise = 0
        self.exercise_total = 0
        self.food = 0
        self.food_total = 0
        self.film = 0
        self.film_total = 0
    
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


aurin_nsw_file = open("data_nsw.json", 'r', encoding='utf-8')
nsw_json = json.load(aurin_nsw_file)
aurin_nsw_file.close()

aurin_aus_file = open("data_aus.json", 'r', encoding='utf-8')
aus_json = json.load(aurin_aus_file)
aurin_aus_file.close()

nsw_items = []
aus_items = []

for feature in nsw_json['features'] :
    
    name = feature['properties']['sa4_name16']
    polygon = shape(feature['geometry'])
    midpoint = polygon.centroid

    new_location = Location(name, [midpoint.x ,midpoint.y])
    nsw_items.append(new_location)
      

for feature in aus_json['features'] :
    name = feature['properties']['gccsa_name16']
    if ('Rest of ' not in name) :
        name = name.replace('Greater ','')
        name = 'Canberra' if 'Australian Capital Territory' in name else name
        
        polygon = shape(feature['geometry'])
        midpoint = polygon.centroid
        
        new_location = Location(name, [midpoint.x ,midpoint.y])
        aus_items.append(new_location)

nsw_file = open("nsw-summary.json", 'w+', encoding='utf-8')
json.dump([location.__dict__ for location in nsw_items], nsw_file, ensure_ascii=False)
nsw_file.close()

aus_file = open("aus-summary.json", 'w+', encoding='utf-8')
json.dump([location.__dict__ for location in aus_items], aus_file, ensure_ascii=False)
aus_file.close()

