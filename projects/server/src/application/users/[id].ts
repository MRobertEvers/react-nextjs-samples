import { Router } from 'express';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { Database } from '../../database/database';

export function userApi(database: Database) {
	const { User } = database;

	const app = Router();

	app.use(bodyParser.json());
	app.options('/users/:id', async (req: Request, res: Response) => {
		res.status(200);
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
		res.send();
	});
	app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		next();
	});
	app.get('/users/:id', async (req: Request, res: Response) => {
		const { id } = req.params;

		const user = await User.findOne({
			where: {
				UserId: parseInt(id)
			}
		});

		res.status(200);
		res.send(JSON.stringify(user.toJSON()));
	});

	app.post('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		next();
	});
	app.post('/users/:id', async (req: Request, res: Response) => {
		const { id } = req.params;
		const { name, dob, address, description } = req.body;
		if (!name) {
			res.sendStatus(400);
			return;
		}

		const [user, isNew] = await User.upsert({
			UserId: id,
			Name: name,
			DOB: dob,
			Address: address,
			Description: description
		});

		res.status(204);
	});
	return app;
}
