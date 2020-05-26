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
# File:    web-app/Dockerfile
# Purpose: Dockerfile to assemble web-app

FROM node:alpine
EXPOSE 3000
RUN npm install -g serve
WORKDIR /web-app
COPY . .
CMD serve -l tcp://0.0.0.0:3000 -s build
