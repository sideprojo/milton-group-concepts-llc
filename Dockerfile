FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN printf 'server {\n\
  listen 8080;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
\n\
  location = / {\n\
    try_files /index.html =404;\n\
  }\n\
  location = /index.html {\n\
    try_files /index.html =404;\n\
  }\n\
  location ~ ^/(about|services|contact)/?$ {\n\
    try_files /index.html =404;\n\
  }\n\
\n\
  location /api/ {\n\
    proxy_pass https://mgc-external-site-254657731107.us-west1.run.app;\n\
    proxy_http_version 1.1;\n\
    proxy_ssl_server_name on;\n\
    proxy_set_header Host mgc-external-site-254657731107.us-west1.run.app;\n\
    proxy_set_header X-Forwarded-Host $host;\n\
    proxy_set_header X-Forwarded-Proto https;\n\
    proxy_set_header X-MGC-Proxy 1;\n\
    proxy_redirect https://mgc-external-site-254657731107.us-west1.run.app/ /;\n\
  }\n\
\n\
  location ~ ^/(auth|login|request-access|portal|employee-login|staff-login|newsletter|consultation|consultation-form|mobile|mobile-control|onboarding|onboarding-portal|workspace|member-portal|agile|agile-board|access-admin|command|admin-command|apps|finance|academy|commerce|chronos-lab|chronos|data-hub|agent-studio|earth-3d|vr-deck|integrations|sam-radar|trust-center)(/|$) {\n\
    proxy_pass https://mgc-external-site-254657731107.us-west1.run.app;\n\
    proxy_http_version 1.1;\n\
    proxy_ssl_server_name on;\n\
    proxy_set_header Host mgc-external-site-254657731107.us-west1.run.app;\n\
    proxy_set_header X-Forwarded-Host $host;\n\
    proxy_set_header X-Forwarded-Proto https;\n\
    proxy_set_header X-MGC-Proxy 1;\n\
    proxy_redirect https://mgc-external-site-254657731107.us-west1.run.app/ /;\n\
  }\n\
\n\
  location / {\n\
    try_files $uri @portal_backend;\n\
  }\n\
\n\
  location @portal_backend {\n\
    proxy_pass https://mgc-external-site-254657731107.us-west1.run.app;\n\
    proxy_http_version 1.1;\n\
    proxy_ssl_server_name on;\n\
    proxy_set_header Host mgc-external-site-254657731107.us-west1.run.app;\n\
    proxy_set_header X-Forwarded-Host $host;\n\
    proxy_set_header X-Forwarded-Proto https;\n\
    proxy_set_header X-MGC-Proxy 1;\n\
    proxy_redirect https://mgc-external-site-254657731107.us-west1.run.app/ /;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

