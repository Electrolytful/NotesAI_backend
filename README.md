# NotesAI Backend Server

## Setup
1. Clone repo using either HTTP or SSH link from GitHub
2. In the root directory, run ``` npm i ``` to install all required dependancies
3. Create a database on ElephantSQL or any DBMS of your choice, copy the database url
4. Create a .env file inside the root directory with the values: -PORT='port number you want to use'  -DB_URL=url to the database  -SECRET=random string for the session secret
5. Run ``` npm run setup-db ``` inside the root directory to populate the database with the correct tables
6. Run ``` npm run dev ``` inside the root directory to start the server


## Routes
### User routes  /users

| Route       | METHOD      | Description                                                                                                                 |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| /register   | POST        | registers a new user into the database, returns a JSON object of the created user or an error                               |
| /login      | POST        | logs in the user if they provide correct details and creates a new session, returns the session object or an error          |
| /logout     | GET         | logs out the current user , returns a JSON object with a message                                                            |
| /current    | GET         | gets the logged in users details and returns the username and email as a JSON object                                        |
| /:id        | GET         | gets the users details with the specified id and returns the username and email as a JSON object                            |
| /delete     | DELETE      | deletes the current user from the database and returns the deleted user as a JSON object                                    |


### Notes routes  /notes

| Route       | METHOD      | Description                                                                                                                        |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| /           | GET         | gets all the notes corresponding to the current logged in user, returns an array of notes or an empty array                        |
| /new        | POST        | creates a new note in the database with the logged in users id, returns a JSON object of the created note                          |
| /:id        | GET         | gets the note with the specified id, returns a JSON object of the note or an error if not found                                    |
| /:id        | DELETE      | deletes the note with the specified id, returns a JSON object of the deleted note or an error if not found                         |



### Questions routes  /questions

| Route       | METHOD      | Description                                                                                                                        |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| /           | GET         | gets all the questions corresponding to the current logged in user, returns an array of questions or an empty array                |
| /new        | POST        | creates a new question in the database with the logged in users id, returns a JSON object of the created question                  |
| /:id        | GET         | gets the question with the specified id, returns a JSON object of the question or an error if not found                            |
| /:id        | DELETE      | deletes the question with the specified id, returns a JSON object of the deleted question or an error if not found                 |
