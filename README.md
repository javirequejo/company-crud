### 1 - Duplicated email address
I have reorganized the project structure to have a service and a repository.
The user controller calls to the user service, and this service manages all the business logic. 
The service calls to the repository, that manages all the interaction with DB.
This structure can be useful as our project scales.

Now we are creating new users from the repository, that is in charge of checking if the input email exists in DB.
If the email exists, we throw a HTTP exception with a message. If not, we create the user and return it.

