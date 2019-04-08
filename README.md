# Veratrak back-end technical challenge

This test is created for you to complete autonomously and to the best of your knowledge.

Please feel free to clone the provided repo for a quick start or alternatively create your own docker environment.

## Goal

To understand your experience regarding data management, coding and infrastructure knowledge please aim to complete all 3 tasks below.

Spend as much time needed but ideally we would like to see your solution within 24 hours.

## Rules

We wanted to create a useful, real-life test so please use the NestJS and Typeorm.

Use best practice and follow RESTful standards.

We have to be able to run your code and call the endpoints.

Upload your code to a public GIT repository.

Please explain your approach in a README file.

## Tasks

### 1. Database design

**Task**: Design and create an importable SQL file with the following conditions:

- Store username, email, password and avatar
- Store a list of roles names (e.g. admin, moderator)
- Store relation between users and roles to support many roles belonging to many users

### 2. Coding

**Task**: Create RESTful API endpoints in the backend folder using NestJS and Typeorm to:

- create roles by saving its name
- list all roles
- create a new user with the fields name, email, pass, avatar and assign at least 2 roles
- list all users including the roles relation

> Note: No file upload required.

Run the SQL generated in the first task to create the necessary tables.

Add Typeorm connection to the database and create necessary models to create queries.

### 3. AWS services

**Task**: Please write a list below of the AWS services you would use to deploy and host *the* software described above.
