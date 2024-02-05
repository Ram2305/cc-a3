# Initialize Node
```bash
npm init
```
# Installing pacakges, ORM & database driver
```bash
npm i mysql express nodemon sequelize mysql2 dotenv    

npm install --save-dev jest supertest
```

# Update Package.json
```json
"scripts": {
    "test": "jest",
    "start": "nodemon index.js"
  },
  "jest": {
    "testEnvironment": "node"
  },
```


# Check Databases available & port connection
```bash
# Databases check (give mysql password)
mysql -h localhost -u root -p -e "SHOW DATABASES;"

# MySql Process check (give your system pasword)
sudo lsof -iTCP -sTCP:LISTEN -n -P | grep mysqld
```

# API Enpoints testing for /healthz
##  GET Request
```bash
#without payload
curl -vvvv http://localhost:3307/healthz

#with payload
curl -X GET http://localhost:3307/healthz -H "Content-Type: application/json" -d '{"name": "Rama Raju"}'
```

## PUT Request check for 405 
```bash
#without payload
curl -vvvv -XPUT http://localhost:3307/healthz

#with payload
curl -X PUT 'http://localhost:3307/healthz' -H 'Content-Type: application/json' -d '{"name": "Rama Raju"}'

```

## POST Request check for 405
```bash
#without payload 
curl -X POST 'http://localhost:3307/healthz'

#with payload
curl -X POST 'http://localhost:3307/healthz' -H 'Content-Type: application/json' -d '{"name": "Rama Raju"}'
```

## DELETE Request check for 405
```bash
curl -X DELETE 'http://localhost:3307/healthz'
```

## PATCH Request check for 405
```bash
#without payload
curl -X PATCH 'http://localhost:3307/healthz'

#with payload
curl -X PATCH 'http://localhost:3307/healthz' -H 'Content-Type: application/json' -d '{"name": "Rama Raju"}'
```


## Query Parameters Check
```bash
curl -X GET 'http://localhost:3307/healthz?name=ram&neuid=003'
```
# Unit Test using jest
```bash
npm test
```
# Stop the mysql process
```bash
sudo pkill mysqld
```
# Restart the mysql process
```bash
sudo /usr/local/mysql/support-files/mysql.server restart
```