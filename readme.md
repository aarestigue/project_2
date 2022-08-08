# WWK

(https://github.com/louisrabit/read-me/blob/main/LICENSE) --- mudar para badge 

# About the project

Problems: 
Organize Karaoke days
Give everyone a chance to pick their favorite music
Avoid staying with only one type of music for too long

Our solution:
WWK is a tool that makes karaoke party organization easier. 
Everyone at the party can choose their favorite music to sing and not have to worry about the order being respected!
This tool is recommended for all karaoke lovers and friends. With extras, the app will provide share, public and save the moments of intense fun.


# ROUTES

|   Method   | Route                                  | Description                                | Request - body  |
| -----------| -------------------------------        | -----------------------------------------  |---------------- |
| John       | /                                      | Home                                       |                 |
| GET        | /login                                 | Renders login form view.                   |                 |
| POST       | /login                                 | Sends login data to the serve              |                 |
| GET        | /signup                                | Renders sign up form data to the server    |                 |
| POST       | /signup                                | Sends login data to the serve              |                 |
| GET        | /:id/profile                           | Shows profile page.                        |                 |
| GET        | /:id/profile/update                    | Renders update form.                        |                 |
| POST       | /:id/profile/update                    | Shows the updated profile.                  |                 |
| POST       | /:id/profile/favorites                 | Renders 5 songs played the most             |                 |
| POST       | /:id/profile/delete                    | Private. Deletes user's profile             |                 |
| POST       | /:id/profile/playlists/create          | Renders the form to create a playlist       |                 |
| POST       | /:id/profile/playlists                 | Renders all the user's created playlists    |                 |
| GET        | /:id/profile/playlists/playlistId      | Renders one playslist details               |                 |
| POST       | /:id/profile/playlists/playlistId/edit | Adds new songs to a playlist                |                 |
| GET        | /:id/profile/playlistId/delete         | Removes a playlist                          |                 |
| POST       | /:id/profile/parties                   | Renders all the parties the user is part of |                 |
| GET        | /:id/profile/parties/create            | Renders the form to create a party          |                 |
| GET        | /:id/profile/parties/partieId          | Renders the detail one party.               |                 |
| POST       | /:id/profile/parties/partieId/edit     | Adds new songs to the party                 |                 |
| POST       | /:id/profile/parties/partieId/invite   | Add new users to the party.                 |                 |
| POST       | /:id/profile/parties/partieId/videos   | Renders all videos posted for one party     |                 |
| POST       | /:id/profile/parties/partieId/videos/create   | Renders a form to post videos from the party      |                 |
| POST       | /:id/profile/parties/partieId/videos/videoId  | See details and comments of a video             |                 |
| GET        | /:id/profile/partiesId/delete          | Removes one party.                         |                 |
| POST       | /:id/profile/followers                 | Renders all the followers from one user              |                 |
| POST       | /:id/profile/following                 | Renders all the users one user follows             |                 |
| GET        | /parties/partieId                      | Renders one party details            |                 |

 
 
# MVP Requirements

## User stories

- 404 - The user sees , 404 page, he goes to a page that doesn't exist.
- 500 - The user sees , error page when the superteam screws  up .
- Homepage - The user can access the homepage if he logs in and signs up .
- Sign up - The user will be able to sign up .
- Login - The user will be able to log in because he has his own account.
- Logout - The user can log out of the website to ensure that no one can access my account
- Profile - Image , user , description(optional)
- Favorite list - The user would have a favorites list where he can update or delete songs , albums .
- Edit user - As a user I want to be able to edit my profile.
- Result - The user can filter the list of albums/songs according to my preferences.


# Extra points 
 - web access without account login
- Share music .
- Have a followers 
- Private or public account 
- Have a Board with most popular songs ( implement cookies)
- Implement passport 
- Join people  in 1 room to sing the same song . 
- Able to post is own record songs 
- Have coments 
- Live stream 
 
# Getting Start ( what the user needs to have acess/ use the app)
The user to be able to use the platform will have the option to register if he wants, first to create a personal account, and also have an option without authorization of entry, will have limited access to use it .


# Models

Profile model { name , email , password , favorites } 
Playlist
Party
Song
Post

# Technologies

## Back end

- Javascript
 - Node.js

## Front end

- HTML / CSS / Javascript

## Frameworks 

- Bootstrap
- node.js
- express.js


## Implantação em produção

- Banco de dados: Postman , Mongoose


## Cloud-based hosting

- GitHub

## Software Controller

- Git

# Developer operator 

- Visual Studio Code

# Packages 

- npm ironlaucher
- npx

# API"s

(https://www.karafun.es/developers/)
(https://developers.google.com/identity/sign-in/web/sign-in)


# Backlog

![](https://trello.com/b/Ni3giVKf/ironhackproject)

 
 ### Git
 
(The url to your repository and to your deployed project)



### Slides

(url for slides)


# Contributors

Andrea Arestigue -  [Linkedin]() - [Git Hub]()

Luis Coelho - [Linkedin](https://www.linkedin.com/in/luis-coelho-23936222a/) - [Git Hub](https://github.com/louisrabit)
