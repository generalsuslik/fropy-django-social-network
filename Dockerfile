FROM python3.10

RUN mkdir fropy
WORKDIR fropy

ADD . /fropy/
ADD .env.docker /fropy/.env

ENV APP_NAME=FROPY

RUN pip install -r requerments.txt

CMD gunicorn fropy.wsgi:application -b 0.0.0.0:8000
