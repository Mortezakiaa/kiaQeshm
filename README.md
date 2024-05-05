## Deploy on IIS windows server 

for deploy on IIS windows server follow the steps below

- install [IISNode module](https://github.com/azure/iisnode/wiki/iisnode-releases) 
- install [URL rewrite module](https://www.iis.net/downloads/microsoft/url-rewrite)
- create folder in ==> { C://inetpub//wwwroot } and copy .next & node-module & iisnode & server.js & web.config inside that
- deploy your backend on iis 
- NOTE : if you have .env file for your api address or secret key , create .env.production and put api inside it