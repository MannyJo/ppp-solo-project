# Party Pooper Planner

## Description
PPP is a party planner that sends invitations to the user’s friends or family. The user can add an image, a short description of the party, and the location of the place. This app has a special functionality that helps to prevent the party from being spoiled by the user’s friend who has a big mouth. It is a secret message. The user can set this message to only be seen by friends that the user selects so that the others cannot see this message. Once the user sends the invitation, all the friends who are added by the user will have an email that has a link to view the invitation, and whether the secret message is shown is decided by their email address.


### Prerequisites

This is a node project. Ensure that your browser can run ES6 before opening this program. If you don't have node, you can find it here: https://nodejs.org/en/download/. You will also need PostgreSQL. This project installed it with HomeBrew, using the line
```
brew install postgresql
```
followed by
```
brew services start postgresql
```
You will also need nodemon. Install it globally by using this line
```
npm install -g nodemon
```

### Installing

Once you have node, you can get this repository by forking and cloning or by downloading its zip.

```
git clone *forked repository*.git
```

Next, move into the project directory and install the dependencies with

```
npm install
```

Create a /components/constants/constants.js file and set the value of API_KEY from Google Map API key.
For the time being include
```
API_KEY: 'API_KEY'
```

To set up the database, create a new local database named "ppp". In ppp, run the queries listed in database.sql. And insert Gmail credential information in gmail_credentials table with following query.

```
INSERT INTO "gmail_credentials" ( "name", "content" )
VALUES ('client_id', 'CLIENT_ID'),
		('project_id', 'PROJECT_ID'),
		('auth_uri', 'AUTH_URI'),
		('token_uri', 'TOKEN_URI'),
		('auth_provider_x509_cert_url', 'AUTH_PROVIDER_X509_CERT_URL'),
		('client_secret', 'CLIENT_SECRET'),
		('redirect_uris', 'REDIRECT_URI1, REDIRECT_URI2, ...');
```

## Deployment

Make sure to build your project:
```
npm run build
```


## Heroku Site
You can go to the site with the link below.
Heroku free version doesn't allow to keep images uploaded. User can see their image right after uploading, though.
```
https://party-pooper-planner.herokuapp.com
```

User Account
```
ID : jomansang@gmail.com
PW : user123
```
Admin Account
```
ID : mannyjoking@gmail.com
PW : admin123
```

## Technologies I used
- React
- Node.js
- Express
- Passport
- HTML
- CSS
- Material-UI
- JavaScript
- PostgreSQL
- Google Map API
- Google Gmail API
- Chart.js