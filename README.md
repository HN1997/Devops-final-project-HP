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
* We have a Dockerfile for building the project. This is pushed to docker hub and will be pulled and executed in docker-compose file.
* The image is pushed to Docker Hub with the command : ```docker push hn0402/devops_final_docker```
* We have a .dockerignore to ignore all unnecessary files

5. Make container orchestration using Docker Compose 
* We added docker-compose.yml file which allows us to start our application directly in a container

6. Make container orchestration using Kubernetes 
* We have 3 files in /k8s : 
  * devops-final-docker-pv.yaml to create a PersistentVolume
  * devops-final-docker-pvc.yaml to create a PersistentVolumeClaim 
  * deployment.yaml which will create one deployment with for our application, one pod for redis associated with the volumes, one service for our application. 

## 2 - Instructions
1. Installation
  * [Install NodeJS](https://nodejs.org/en/download/)
  * [Install Redis](https://redis.io/download)
  * Clone the project 
  ```
  git clone https://github.com/HN1997/Devops-final-project-HP.git
  ```
  * Go to the root directory of the application (where `package.json` file located) and run:
  ```
  npm install 
  ```
  * [Install Docker](https://www.docker.com/products/docker-desktop)
  * [Install docker-compose](https://docs.docker.com/compose/install/)
  * You can create an image of the application by running : 
  ```
  docker build -t hn0402/devops_final_docker .
  ```
  Now, you can check that the image has been successfully built by running ```docker images```
  * [Install Kubernetes cluster using Minikube](https://www.youtube.com/watch?v=bhBSlnQcq2k&t=12498s)
  Now, to set up the application in kubernetes, run those commands:
  ```
  kubectl apply -f devops-final-docker-pv.yaml
  kubectl apply -f devops-final-docker-pvc.yaml
  kubectl apply -f deployment.yaml
  ```

2. Usage and Testing
  * The application in a terminal : in the root directory of the application, you can run
  ```
  npm start
  ```
  Now go to `localhost:3000`. In the app, you can add a user, find a user, update and delete a user (not beautiful but you can easily understand how to perform those CRUD operations)
  * The application with docker-compose : You can run the same application with the command
  ```
  docker-compose up --build
  ```
  And now open your web browser and go to `localhost:3000`.
  * The application with kubernetes : run this command and the application will open in your default web browser:
  ```minikube service devops-final-docker-service```

## 3 - All the necessary links with the platforms and tools integrated:

* Travis CI:
  You can see that that travis is well integrated to the project with the green check image next to the commit button.

* Heroku : You can open the application by going to this link (You can't interact with it because we didn't setup redis in Heroku, but you can navigate through the different pages):
  https://devops-nodejs-hugopierre.herokuapp.com/ 

* Docker Hub : You can check our image pushed to Docker Hub on this link : https://hub.docker.com/repository/docker/hn0402/devops_final_docker

## 4 - Author

- Hugo Navillod : hugo.navillod@edu.ece.fr
- Pierre Camugli : pierre.camugli@edu.ece.fr
- ING4 - SI - Gr03

