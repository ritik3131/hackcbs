
# Hackcbs 5.0

HackCBS 5.0, a legacy being carried forward by like-minded individuals aims to collaborate the intellects of programmers, designers, application developers, tech-geeks, and newbies in the world of programming for the intensive development of a hack.

# Introduction
We are introducing AR in an education platform. We will provide a method to real-time render 3D models within the real world, currently by using marker-based methods. Seeing the potential growth in the Metaverse, our platform will be able to utilize such innovations to the fullest in a core human necessity i.e. education.

# Members of the team

### Nibble Grabbers :

- Rishvic Pushpakaran
- Ritik Gupta
- Chinmay Negi
- Prateek Singh

# Theme 
Edtech + AR/VR

# Tech Stack
MERN + Elasticsearch (mirrored with MongoDB) so as to increase search speed.

ARJS for AR Integration
# Getting Started

First, install the dependencies using:

```bash
npm install in backend and client both
# or
yarn install
```

Second, add environment variable in .env

Third, run the development server using:

```bash
npm start in backend and client both
# or
yarn start
```
## Shipped Features

- Created an online platform where one can post course videos, images or text as a creater and can also view the content of other users.

- App has been authenticated and authorized using Google Oauth.

- This app will show the list of courses on the landing page along with likes, dislikes and thumbnail.

- For accessing courses the user clicks explore button to navigate to the course page where he can see the overview of course with all the sections.

- Course content, which is stored in MongoDB, is regularly synced to an Elasticsearch instance so as to improve search latency.

- The user can migrate to individual sections to see the contents of that sections and is also allowed to like dislike and ask the questions.

- Every sections comes along with a Q and A section.

- App also includes the user profile page for accessing and editing the user details.

- Backend authorization is maintained by passport.js and JWT Tokens; for the frontend, Context API is used to maintain this.

- One of the main highlight of the app includes AR integration which is in beta mode and can be further upgraded for various awesome hacks.

- AR integration for now includes the ability of rendering various 3D models on Hiro/Kanji markers.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![](https://hackcbs.tech/assets/img/logo_final.png)
