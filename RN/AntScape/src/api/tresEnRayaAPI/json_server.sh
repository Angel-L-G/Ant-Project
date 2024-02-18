#ponemos la carpeta img en public ( realmente puede ser otro sitio si luego lo configuramos pero es la ruta que se espera)


#Lanzamos el comando estableciendo la ruta del json y de la carpeta para ficheros estáticos ( img, css, js,...)
json-server --watch fakeserver/partidas.json --host 192.168.0.12 --port 3000