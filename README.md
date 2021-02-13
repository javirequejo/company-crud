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

