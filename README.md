# tvojklub

mongo installaton instructions

1) download and install docker (windows/linux depending on your operatons sytem)
2) open terminal and positions yourself in backend\docker folder
3) run command: docker-compose up -d
4)in PowerShell run command docker ps -a   // to check if engines in docker are running;
5) to restart engines in docker run docker restart $(docker ps -a -q);
6) open  http://localhost:8081;
7) create new base tvojklub in Mongo Express;

