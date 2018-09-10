FROM node:8.11.4-stretch

ENV LC_ALL ja_JP.UTF-8

# http://docs.docker.jp/engine/articles/dockerfile_best-practice.html
# 日本語化も行っている
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev locales\
    autoconf libtool make nasm pkg-config\
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen \
 && locale-gen ja_JP.UTF-8 \
 && /usr/sbin/update-locale LANG=ja_JP.UTF-8


ENV MYSQL_MAJOR 8.0
# mysql 関連
WORKDIR /tmp
RUN set -ex; \
    key='A4A9406876FCBD3C456770C88C718D3B5072E1F5' \
 && export GNUPGHOME="$(mktemp -d)" \
 && gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" \
 && gpg --export "$key" > /etc/apt/trusted.gpg.d/mysql.gpg \
 && rm -r "$GNUPGHOME" \
 && apt-key list > /dev/null \
 && echo "deb http://repo.mysql.com/apt/debian/ jessie mysql-${MYSQL_MAJOR}" > /etc/apt/sources.list.d/mysql.list \
 && apt-get clean \
 && apt-get update \
 && apt-get install -y mysql-client \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app/enner
COPY ./package* /app/enner/

RUN npm install \
  && rm -rf package*

VOLUME /app/enner
WORKDIR /app/enner