# Veratrak back-end technical challenge

## 1 Database design

**Task**: Design and create an importable SQL file with the following conditions:

- Store username, email, password and avatar
- Store a list of roles names (e.g. admin, moderator)
- Store relation between users and roles if many roles can belong to many users

## 2 Coding

**Task**: Create RESTful API endpoints in the backend folder using NestJS and Typeorm to:

- create roles by saving it's name
- list all roles
- create a new user with the fields name, email, pass, avatar and assigning at least 2 roles
- list all users including the roles relation

> Note: No file upload required.

Run the SQL generated in the first task to create the necessary tables.

Add Typeorm connection to the database and create necessary models to create queries.

## 3 AWS services

**Task**: Please write a list below of the AWS services you would use to deploy and host above software.
