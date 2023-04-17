# NotesAI Backend Server

## Routes
### User routes

| Route       | METHOD      | Description                                                                                                                 |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| /register   | POST        | registers a new user into the database, returns a JSON object of the created user or an error                               |
| /login      | POST        | logs in the user if they provide correct details and creates a new session, returns a JSON object with a message or error   |
| /logout     | GET         | logs out the current user and destroys the session, returns a JSON object with a message                                    |
| /:id        | GET         | gets the current users details and returns the username and email as a JSON object                                          |
| /:id        | DELETE      | deletes the current user from the database and returns the deleted user as a JSON object                                    |


### Notes routes
