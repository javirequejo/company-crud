Companies CRUD app using Typescript, NestJS and MySQL to create an API with users and companies.

### Duplicated email address

I have reorganized the project structure to have a service and a repository.
The user controller calls to the user service, and this service manages all the business logic. 
The service calls to the repository, that manages all the interaction with DB.
This structure can be useful as our project scales.

Now we are creating new users from the repository, that is in charge of checking if the input email exists in DB.
If the email exists, we throw a HTTP exception with a message. If not, we create the user and return it.

### New feature for companies

I have created a new module, entity, controller, repository and service for a company.
Also I added validation to the input objects for creating new companies and users, so you will receive an HTTP error with a message if you make a bad request.

The company entity has a OneToMany relationship with users. If you want to create a new company, you can pass a userIds array on the body indicating the user ids to associate them (see [Postman documentation](https://documenter.getpostman.com/view/6461272/TWDRszKH) for more info). Each user only can have one company.

### Customer question
##### Database
We would need to create two main tables in the database for this feature: reviews and reminders. These entities would have a **many to one relationship** with users and the same relationship with companies, that is, a user could have associated many reviews or reminders as they want, but each of one would have only one user.

-Reviews: This entity would be a representation of the review created by the user. In a first approach, each one would have to store the user who created it, the company which the user is reviewing, the description with the review text, and the creation date.

-Reminders: This entity would act as a representation of each reminder. It would have to store the user associated, the company which it's necessary to review, a creation date, an execution date that represents the shipping date of this reminder, a public identification code which allows identifying this entity outside our application (i.e. in the frontend), and a state, which contains the potential state of this reminder, i.e. created, shipped and canceled.

##### Backend
In the backend, we are going to manage these two entities stored creating all the business logic necessary for this. At this time, we have our backend structured in these entities that represent a piece of this business logic and most of them are stored in our database, i.e. users, companies, etc. We would need to follow the next steps:

1 - Creation of the necessary structure for reviews and reminders:
    - Entity: it represents the database table in the code.
    - Controller: it manages the possible routes we can call from the frontend to interact with these entities.
    - Service: it contains the business logic that we want to apply.
    - Repository: it's the connection point between the code and each table.

2 - Creation of a reminder: this reminder would be created at the creation of a company. We would call the reminder service from the company service passing the company and the user. The reminder service would create the first reminder with these data and setting the shipping date two days later.

3 - Flow to manage the reminders. We would need a system able to send the pending reminders and create new ones. For this, we would need to have a cron job in our server, that it's a task scheduler that runs periodically i.e. each day at the same time, and this could be calling our service to manage our reminders. 
This service would search in our reminders table from the DB the ones with the same shipping date and send the users an email using node mailer, which is a library to send emails. We would have a small service in charge of sending emails, emails designed using HTML and the data necessary from the reminder entity. The most important field in this email would be a link created to bring the user to the frontend platform, where he could log in and write the review. 
Once sent this email, the reminder service would have to change the old reminder's state to sent and create a new reminder with a shipping date seven days later.

4 - Flow to manage the reviews. We would have to expose a route to create a new review from the frontend. This route would be protected by user authentication to avoid the creation of reviews without user. The service would be in charge of creating the review using the repository and once done, would call the reminder service to tell that has to cancel all the pending reminders to avoid sending new emails.
Also, we would need to create another route to get the necessary information for creating the frontend screen where the user can create the review. We would receive an identification code and the service could search in our database by this id to send information to the frontend as the user, the company to review, or other fields.

##### Frontend
In the frontend, we would have to develop the necessary screens in our platform or application to allow the users to create new reviews.

1 - Login - Our users come to the platform by the email link mentioned before. Here we would have to check if we have an existing platform with authentication where users can log in. Otherwise, we could send a public identification code in the link to create this screen dynamically, redirect them to a small website without login to allow the user to put the review.

2 - Screen to create the review - Starting from this identification code of the reminder mentioned before, we could call the backend with this id to ask for the necessary information. With this data, we could load our screen with the company information.
In this screen, we would have a form, where the user can write the review and submit it to the backend by clicking the necessary button, which would post a call to the backend with the same identification code and the review text.

##### Clarifications
The main points to clarify are:

- Is it the user authentication flow created? Otherwise, we could create this flow using public identification codes, but it would be strongly advised to create an authentication system to secure our system and make the reviews more reliable. This wouldn't be a problem if we already have a user platform.

- Is it the frontend platform created? If it's, it would be that simple as creating a new screen to write the review. Otherwise, we could create a small website with only the review screen from scratch.