import express from 'express';

//Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome!');
});

/* A middleware that will be called if the route is not found. */
app.use(notFoundMiddleware);
/* A middleware that will be called if an error occurs. */
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));