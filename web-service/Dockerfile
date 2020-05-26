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
# File:    web-service/Dockerfile
# Purpose: Dockerfile to assemble web-service

FROM python:alpine
EXPOSE 5000
WORKDIR /web-service
RUN apk add --no-cache \
	uwsgi-python3 
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD uwsgi --socket 0.0.0.0:5000 \
	--plugins python3 \
	--protocol uwsgi \
	--wsgi webservice:app \
	--uid uwsgi \
	-H /usr/local/
