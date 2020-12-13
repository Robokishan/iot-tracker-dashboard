# docker build -t iot-dashboard -f Dockefile .
# for development testing
# docker run -d -p 3000:3000 -v $PWD:/usr/src/app --name iot-dashboard -ti iot-dashboard /bin/bash
FROM node:12
WORKDIR /usr/src/app
COPY package.json .
COPY .env .env
RUN npm install --silent
RUN npm install react-scripts@3.2.0 -g --silent
RUN npm install -g axios
ADD public /usr/src/app/public
ADD src /usr/src/app/src
EXPOSE 3000
CMD ["npm", "start"]