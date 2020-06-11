ng build --prod --output-path docs --base-href /
docker build -t qbteam/stalker-admin .
docker run -p 5741:80 -d --name stalker-admin qbteam/stalker-admin