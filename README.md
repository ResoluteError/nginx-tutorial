# Getting Started

## 1. Prerequisites

- Running server
- Ability to SSH into your server
- Exposed public ports 80 and 443
- DNS records set to point to your server's IP address
- NodeJS and Git installed on the server

## 2. NGINX Installation

Follow these Steps: [NGINX Installation Guide](https://nginx.org/en/linux_packages.html#Ubuntu)

## 3. Static Site Hosting

1. Install NGINX
1. Start NGINX via `sudo systemctl start nginx`
1. Open your host URL in the browser (**Important:** Use http, **not** https)
1. Add your host URL to the `server_name` via `sudo nano /etc/nginx/conf.d/default.conf` (check the template [default.confd](./default.conf) for reference)
1. Validate your NGINX config via `sudo nginx -t`
1. Restart NGINX via `sudo systemctl restart nginx`

## 4. Setup SSL

1. Install Certbot via `sudo apt-get install certbot python3-certbot-nginx`
1. Start the certification process: `sudo certbot --nginx -d [YOUR_HOST_URL]` (append as many `-d [HOST_URL]` as are pointing to your server)
1. If the certificate was generated, but could not be installed, manually update your `/etc/nginx/conf.d/default.conf` to match [default.ssl.conf](./default.ssl.conf) up to line 34 _(Don't forget to update the placeholders!)_
1. Validate your NGINX config via `sudo nginx -t`
1. Restart NGINX via `sudo systemctl restart nginx`

## 5. Setup Reverse Proxy

1. Install the dependencies in `nginx-tutorial/basic-api`
1. Start a tmux session `tmux new -s apisession`
1. Run `npm run prod`
1. Detach you tmux session `[CTRL + B] >> D`
1. Open your `/etc/nginx/conf.d/default.conf`
1. Add the following to your existing https server block:

```
   location /api {
   proxy_pass http://127.0.0.1:3000;
   }

```

7. Validate your NGINX config via `sudo nginx -t`
8. Restart NGINX via `sudo systemctl restart nginx`

## 6. Setup Load Balancer

1. Install the dependencies in `nginx-tutorial/basic-service`
1. Start a tmux session `tmux new -s servicesession`
1. Run `npm run prod`
1. Detach you tmux session `[CTRL + B] >> D`
1. Open your `/etc/nginx/conf.d/default.conf`
1. Add the following at the very bottom of the file:

```
upstream basicService {
    server 127.0.0.1:4000;
    server 127.0.0.1:4001;
}

server {
  listen 3333;
  location / {
    proxy_pass http://basicService;
  }
}
```

7. Validate your NGINX config via `sudo nginx -t`
8. Restart NGINX via `sudo systemctl restart nginx`

## 7. Misc

[Website Template Source](https://templatemo.com/tm-578-first-portfolio)
