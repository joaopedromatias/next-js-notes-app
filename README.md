# NextJS Note App 📝

This is a study purpose application built for practicing **NextJS**

### Pre Renderization ⚡

All the pages are **pre-rendered** with **Server Side Rendering**, which means that all pre-renderization runs on each users request

### Dynamic Routing 🛣️

The project features **dynamic routing** based on the note id 

The notes documents create on the UI are kept on the file system. If it was a production project, it would need to be switched to a database for performance and security issues.

### Auth & Security 🔒

When the user gets into the application for the first time, a **Json Web Token** is generated. The notes of that single user will then be stored on a folder inside the `/notes` based on the **JWT signature**.

When the user gets into the application after having a token, the application verify if it is a valid token.

The token is stored on a HttpOnly cookie on the client side.

All the users inputs are encoded, so special characters are not rawly saved into the file system.

### API 

The project has **3 NextJS API routes** to run server side code in order to interact with the file system and manage the notes. These routes are deployed as **serverless functions**.

### Style 🎨

For the stylization I used Styled Components, which is a CSS-in-JS library.