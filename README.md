# Appointment manager

Hi! 

This is an web app to manage clinical appointments.
It implements a RESTful api server developed in **Node.js** with UI in **React.js** and Docker-Compose to manage enviroments.

#Some of Dependencies
* EsLint to Standard JS code guides
* Express to build api
* JWT to api authentication
* Material UI to visual/web interface
* Postgres DB with Sequelize ORM to data storage

## How to use:

#### Docker && docker-compose installation instructions:

Install docker and docker-compose in your host machine:
* Follow Docker installation guide: https://docs.docker.com/engine/installation
* Follow Docker-compose installation guide: https://github.com/docker/compose/releases


#### Build and start your app

At first time run:
* $ docker-compose build

and create db

* $ docker-compose -f /path/to/docker-compose.dev.yml up migrate  

After that just run:
* $ docker-compose -f /path/to/docker-compose.dev.yml up api web   

This will start, client, server and db in developer mode, using nodemon to keep tracking server-side changes and updates.

With server running it will be disponible at http://localhost:3000
And full app will be disponible at http://localhost:8080

To preview system usabilituy images from screenshots can be found in docs folder

Feel free to send issues or pull requests 
