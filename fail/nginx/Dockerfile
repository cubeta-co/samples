# The official image switches users at startup, which needs capabilities that
# Cubeta apps do not get: expect APP_CRASHED with the nginx-unprivileged hint.
FROM nginx:1.29-alpine
COPY index.html /usr/share/nginx/html/index.html
