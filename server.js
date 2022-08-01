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

app.use(cors(corsOption));
app.use(express.json());
app.use(routers);

const server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
