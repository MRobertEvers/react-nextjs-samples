import express from 'express';

import { Database } from './database/database';
import { usersApi } from './application/users';
import { userApi } from './application/users/[id]';

const PORT = 4040;

const db = new Database('database.sqlite');

const app = express();

app.use(usersApi(db));
app.use(userApi(db));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
