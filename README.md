### Setup
docker pull mongo
docker network create OpenBox

### Start MongoDB
docker run --network OpenBox mongo
OR
docker run -p 27017:27017 --network OpenBox mongo

### Start Node Server
docker build -t openbox .

docker run -it -p 8042:8042 --network OpenBox openbox

### Ngrok Port Hosting
./ngrok http -region eu 8042