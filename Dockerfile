FROM node:10.20.1

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

# RUN apt-get update && apt-get install make
# RUN apt-get update && \
#     apt-get upgrade -y && \
#     apt-get install -y git

# RUN apt-get install python
RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 5000

CMD [ "serve", "-s","-l","tcp://0.0.0.0", "dist" ]