# Image of the portfolio, in two parts:
# - /site: the static files. The server copies them out into a folder Nginx
#   serves (Server-Setup, "gss-deploy seite").
# - /app: mail.php with PHPMailer for the contact form, run by PHP-FPM. The
#   server starts this as a container; Nginx passes only /mail.php to it.
# What is not delivered stays out through .dockerignore.

FROM docker.io/library/composer:2.11 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
# Exactly the locked versions, no development packages, and none of the
# scripts or plugins a package could bring along.
RUN composer install --no-dev --no-scripts --no-plugins --no-interaction --no-progress --classmap-authoritative

FROM docker.io/library/php:8.4-fpm-trixie
# Debian's security fixes that came out after the base image was built: the
# official PHP image is rebuilt only every few days, and the scan stops a
# build with a fixable critical or high vulnerability.
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get upgrade -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
# PHP's settings for production: no error messages to visitors. Our own
# settings are in php/: no version in the headers, no access log of PHP's own.
RUN mv "${PHP_INI_DIR}/php.ini-production" "${PHP_INI_DIR}/php.ini"
COPY php/zz-portfolio.ini /usr/local/etc/php/conf.d/
COPY php/zz-portfolio.conf /usr/local/etc/php-fpm.d/
COPY --from=vendor /app/vendor /app/vendor
COPY mail.php /app/
COPY index.html legalnotice.html privacyPolicy.html /site/
COPY assets /site/assets
COPY scripts /site/scripts
COPY styles /site/styles
# Not root: PHP-FPM runs as www-data and listens on port 9000 only.
USER www-data
# PHP-FPM directly, without the image's shell script in front: the watcher
# on the server expects exactly one program start per container start.
ENTRYPOINT ["php-fpm"]
