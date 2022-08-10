import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routers from './routes/index.js';

dotenv.config();
const corsOption = {
  origin: '*',
};
const app = express();
const server = http.createServer(app);

app.use(cors(corsOption));
app.use(express.json());
app.use(routers);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
