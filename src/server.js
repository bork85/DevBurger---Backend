import 'dotenv/config';
import './database/index.js';
import app from './app.js';
app.listen(process.env.PORT || 3001, () => console.log('Server is running...'));