#!/bin/sh

exec "$@"
rm -rf /var/cache/nginx
