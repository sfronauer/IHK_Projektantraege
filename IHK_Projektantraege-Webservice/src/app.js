import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import checkJwt from './middleware/checkJwt.js';
import errorHandling from './middleware/globalErrorHandling.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '120mb' }));
app.use(checkJwt);
app.use(errorHandling);
app.use('/IHK_Projektantraege', routes);

const port = 3001;

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});

export default app;
