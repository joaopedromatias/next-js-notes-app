# NextJS Note App 📝

### This is an application built for practicing `NextJS`

## Demonstration 📺

https://user-images.githubusercontent.com/90068133/202041482-c485bd64-c866-4418-a561-6d370f8f2b33.mov

## Pre Renderization ⚡

All the pages are **pre-rendered** with **Server Side Rendering**, which means that the pre-renderization runs on each user request. If it was an application with static data (like a blog), the right thing to do would be to use the **Static Site Generation** for performance improvements (so the pre-renderization would only happend at the build time).

## Dynamic Routing 🛣️

The project features **dynamic routing** based on the note id. 

Since it's a local running application for practicing purpose, the notes documents created on the UI are kept on the file system. If it was a production project, it would need to be placed a database.

## Auth & Security (Json Web Token) 🔒

When the user gets into the application for the first time, a **Json Web Token** is generated. The notes of that single user will then be stored on a file inside `/notes/jwt_token`.

When the user gets into the application after having a token, the application verify if it is a valid token.

The token is stored on a HttpOnly cookie on the client side. It is then passed to the server by HTTP.

All the user inputs are encoded, so special characters are not rawly saved into the file system.

## API 

The project has **3 NextJS API routes** to run server side code in order to interact with the file system and manage the notes. These routes are deployed as **serverless functions**.

## Style 🎨

For the stylization I used Styled Components, which is a CSS-in-JS library.