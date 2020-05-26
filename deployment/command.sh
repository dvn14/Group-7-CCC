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
# File:    command.sh
# Purpose: to deploy web-service, web-app, web-service-lb (web-service load
#          balancer), and web-app-lb (web-app load balancer).
# Note:    This file can be executed manually or called or integrated to the
#          ansible script.
#          We need to open port 80 (HTTP) and 8080 in security group (e.g.,
#          using ansible script).

sudo apt update
sudo apt install -y subversion
sudo apt install -y npm
mkdir CCC2020-Group7
cd CCC2020-Group7
svn export https://github.com/dvn14/CCC2020-Group7/trunk/docker-compose.yml
svn export https://github.com/dvn14/CCC2020-Group7/trunk/web-service
svn export https://github.com/dvn14/CCC2020-Group7/trunk/web-app
svn export https://github.com/dvn14/CCC2020-Group7/trunk/web-service-lb
svn export https://github.com/dvn14/CCC2020-Group7/trunk/web-app-lb

# We need to update these files to point them to the correct IP based on
# our servers
# We can update them on the fly or replace them with prepared files
# Update CCC2020-Group7/web-service/config.json
# Update CCC2020-Group7/web-service-lb/nginx.conf
# Update CCC2020-Group7/web-app/src/conf/config.json
# Update CCC2020-Group7/web-app-lb/nginx.conf
# Here we will replace them with prepared files

PREP=../prepared
cp $PREP/web-service_config.json web-service/config.json
cp $PREP/web-service-lb_nginx.conf web-service-lb/nginx.conf
cp $PREP/web-app_config.json web-app/src/conf/config.json
cp $PREP/web-app-lb_nginx.conf web-app-lb/nginx.conf

cd web-app
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo npm install
sudo npm run build
cd ..
sudo docker-compose build
sudo docker-compose up -d
sudo docker ps
