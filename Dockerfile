# Use the official PHP-Apache base image
FROM php:8.1-apache

# Copy the HTML and PHP files to the Apache web root
COPY html/ /var/www/html/

# Set permissions for the web server
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Enable PHP extensions needed for MySQL
RUN docker-php-ext-install mysqli

# Expose port 80 for the Apache server
EXPOSE 80