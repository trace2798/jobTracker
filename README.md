# jobTracker
Full Stack Application with MongoDB, Express, React and NodeJS.

It is a full-stack application is developed using React and Node.js. The front-end is designed from scratch and features multiple pages, including Landing, Error, Register, and Dashboard, with routing facilitated through React Router 6. To ensure a seamless user experience, a global context is created using the createContext and useContext hooks, alongside a global state using the useReducer hook, and a global Alert component.

The server application is built from scratch and leverages ES6 Modules, nodemon package, and a MongoDB database hosted on the Atlas cloud. To ensure robust functionality, the server also includes routes and controllers, thorough testing on POSTMAN, email validation, error handling using the "express-async-errors" package, password hashing, and JWT authentication and authorization.

The front-end and server applications are integrated through the "concurrently" package and proxy setup in create-react-app. Advanced features such as programmatically navigating using React Router 6, persisting data in local storage, comparing passwords, setting up nested pages and protected routes, implementing logout functionality, programmatically setting the JWT token in Postman, and various Axios configurations are also implemented.

Moreover, moment.js is utilized for efficient date and time handling. Complete CRUD functionality, along with permissions on the server, is implemented, with mock data created using Mockaroo and the database populated. To enhance the user interface, attractive charts and cards are incorporated, with search/filter functionality and pagination set up on both the server and front-end.
