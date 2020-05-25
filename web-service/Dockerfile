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
