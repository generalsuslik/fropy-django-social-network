# fropy-django-social-network


Fropy is an open-source platform that allows users to connect, 
communicate, deal with their programming problems and simply share news 
and information. Project's key features are:
profile management, posts creating, user comunication.

Our goal is to combine programming and social stuff

## Installation guideline Linux:
 
We are gonna work with docker

Go to django-project directory
```shell
cd app
```
<br>

Migrate to create a database
```shell
docker-compose run web python3 manage.py makemigrations
docker-compose run web python3 manage.py migrate
```
<br>


Create your superuser
```shell
docker-compose run web python3 manage.py create superuser
```
Then give him a name, password etc. etc.
<br>

Start your local server:
```shell
docker-compose up
```
<br>

Close your local server:
```shell
docker-compose down
```
<br>


