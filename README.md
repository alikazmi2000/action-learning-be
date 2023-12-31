<h1>-- Read Me --</h1><br>
Project: <b>Backend</b>
# My Node.js Backend

This is the repository for the backend of our awesome Node.js application.

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

Follow these steps to get the backend up and running using Docker:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/alikazmi2000/action-learning-be.git
cd your-nodejs-backend

Create a .env file:
Copy the contents of .env.example to a new file named .env and fill in the necessary environment variables for your application.
```
## Build the Docker image:

```bash
docker build -t action-learning-be .
```

## Run MongoDB as a Docker container:
```bash
docker-compose up -d mongodb
```

## Run Backend
```bash
docker-compose up -d backend
```
## To show services

```bash
docker-compose ps
```

## To Stop Application
```bash
docker-compose down

```

