
<h1  align="center">Welcome to iOT Tracker Dashboard 👋</h1>

<p>

<img  alt="Version"  src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />

<a  href="#"  target="_blank">

<img  alt="License: Kishan Joshi"  src="https://img.shields.io/badge/License-Kishan Joshi-yellow.svg" />

</a>

<a  href="https://twitter.com/robokishan"  target="_blank">

<img  alt="Twitter: robokishan"  src="https://img.shields.io/twitter/follow/robokishan.svg?style=social" />

</a>

</p>

  

> This is IOT TRACKING DASHBOARD FOR LOW POWER DEVICES. We can also add widgets for home automation projects. I have been adding more protocols into it. Soon it will fully fledged System to operate drones as well from the dashboard without touching the Remote of drone. or any other robots.

## Prerequisites

 First Deploy [iot-backend](https://github.com/Robokishan/iot-tracker-backend) on machine. You can use   Docker to deploy but then you need to edit api server point to gateway of docker environment which is mostly 172.17.0.1

 

## Install

  

```sh

npm install

```

  

## Usage

  

```sh

npm run start

```


# Docker build

 
### First build Docker image
```
docker build -t iot-dashboard -f Dockefile .
```
### For development
```
docker run -d -p 3000:3000 -v $PWD:/usr/src/app --name iot-dashboard -ti iot-dashboard /bin/bash
```
### For Production
```
docker run --rm -p 3000:3000 --name iot-dashboard -ti iot-dashboard
```
## Author

 
👤 **Kishan Joshi**

  

* Website: https://kishanjoshi.dev

* Twitter: [@robokishan](https://twitter.com/robokishan)

* Github: [@robokishan](https://github.com/robokishan)

* LinkedIn: [@robokishan](https://linkedin.com/in/robokishan)

* Youtube: [@robokishan](https://youtube.com/robokishan)

  

## Show your support

  

Give a ⭐️ if this project helped you!
