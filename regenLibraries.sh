sudo docker-compose down &&
cd api &&
sudo rm package-lock.json;
sudo rm -R node_modules;

pwd;
ls -la &&
cd ..;
sudo docker volume ls;
sudo docker volume prune;
#echo "sudo docker volume rm <Name f the volume>"
sudo docker-compose up -d --build;
