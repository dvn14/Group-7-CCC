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
# File:    web-app-lb/Dockerfile
# Purpose: Dockerfile to assemble web-app-lb
#          (web-app load balancer)

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
