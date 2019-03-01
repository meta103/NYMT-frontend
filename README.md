# Project Name

## Description

The ****** app will change the way people exchanges business cards by simply scanning a QR code, but will also help you to keep track of the follow-up after the first meeting with your potential customer or provider. 

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start saving business cards
-  **Login:** As a user I can login to the platform so that I can save business cards and follow-up opportunities
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Contacts** As a user I can scan a QR code and add the business card of the code owner.
-  **List Contatcs** As a user I want to see all the contacs that I have.
-  **Add a task** As a user I want to add a to do and link it to a contact 
-  **List tasks** As a user I want to see all my pending tasks.

## Backlog

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list events the user is attending

Geo Location:
- add geolocation to the matchs
- show a map where you can see the places where you have matched every contact.

Scan QR code
- native scan for the QR code

CRM features
- Implement CRM features like reminders and calendar
  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent| public | landing page|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to homepage after logout, expire session |
| `get`  | `/home` | QRCodePageComponent| public | shows my QR code and basic details|
| `get`  | `/contacts` | ContactsListComponent| public | shows a list of all the contacts that I have made|
| `post`  | `/contacts` | ContactsCreateComponent| public | Add a contact to your list by scanning the QR|
| `get`  | `/contacts/:id` | ContactDetailsComponent| public | shows the details of the contact|
| `post`  | `/contacts/:id/newtask` | NewTaskComponent| user only | shows a form for create a new task related to the contact|
| `get`  | `/tasks` | TasksListComponent| user only | shows a list of all the tasks that I have|
| `delete` | `/tasks/:id` | na | user only | delete a task when done|
| `get` | `/profile/:id` | ProfilePageComponent | public | my details|
| `post` | `/profile/:id/edit` | EditProfilePageComponent | user only | edit the details of my business card|


## Components

- Navbar component
- Lower bar component
- Search component(backlog)
- Users Card component
- Task Card component


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
  - editprofile.edit(user)
  - contacts.findContact(contactId)
  - contacts.addContact(contactUserIdAndContacts)
  - contacts.showContactsList(userObject)
  - tasks.create(task)
  - tasks.showTasksList(userId)

# Server

## Models

User model

```
email - { type: String, required: true }
password - { type: String, required: true }
name - String
surname - String
jobtitle - String
phone - String
address - String
company - String
linkedin - String
contacts - [ObjectID<User._id>]
```

Task model

```
owner - [ObjectID<User._id>] // required
title - { type: String, required: true }
action - { type: String, enum: ['email', 'call'] }
to - [ObjectID<User._id>]
date - { type: Date, default: Date.now }
notes - String
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - email
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- GET /profile/me
  - body:
    - my business card
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session
- PUT /profile/me/edit
  - body:
    - Form to edit my business card
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session
- GET /contacts
  - body:
    - display a list of contacts
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session
- GET /contacts/:id
  - body:
    - display the details of the contact
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session
- GET /tasks
  - body:
    - display a list of pending tasks
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session
- POST /tasks/new
  - body:
    - display a form to submit a new task
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session
- GET /tasks/:id
  - body:
    - display the details of the task
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session

  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/j0qOeVZc) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)