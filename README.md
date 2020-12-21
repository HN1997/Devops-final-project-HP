## 1 - List of all the work performed

1. Create a web application 
* We have built our own application using nodejs and redis with CRUD user functionalities.
* We have implemented unit tests for each CRUD operations : 
  * Creating a user 
  * Get a user (check if he exists or not)
  * Updating a user (check if he exists or not)
  * Deleting a user (check if he exists or not)

2. Apply CI/CD pipeline
* We have used Travis CI which is building successfully our app (.travis.yml) each time we push to the repository.
* We have used Heroku which deploys our app (and put the reference in .travis.yml) after Travis run successfully.

4. Build Docker image of your application
* We have a Dockerfile for building the project, and we can build it with the command : ```docker build -t hn0402/devops_final_docker .```
* The image is pushed to Docker Hub with the command : ```docker push hn0402/devops_final_docker```
* We have a .dockerignore to ignore all unnecessary files

5. Make container orchestration using Docker Compose 
* We added docker-compose.yml file which allows us to start our application directly in a container, just type this command (assuming docker-compose is installed) : ```docker-compose up```

## 2 - Instructions
1. Installation
  * [Install NodeJS](https://nodejs.org/en/download/)
  * [Install Redis](https://redis.io/download)
  * Go to the root directory of the application (where `package.json` file located) and run:
  ```
  npm install 
  ```

2. Usage

3. Testing 

## 3 - All the necessary links with the platforms and tools integrated:

* Travis CI:
  You can see that that travis is well integrated to the project with the green check image next to the commit button.

* Heroku : You can open the application by going to this link (You can't interact with it because we didn't setup redis in Heroku):
  https://devops-nodejs-hugopierre.herokuapp.com/ 

* Docker Hub : You can check our image pushed to Docker Hub on this link : https://hub.docker.com/repository/docker/hn0402/devops_final_docker

## 4 - Author

- Hugo Navillod : hugo.navillod@edu.ece.fr
- Pierre Camugli : pierre.camugli@edu.ece.fr
- ING4 - SI - Gr03

