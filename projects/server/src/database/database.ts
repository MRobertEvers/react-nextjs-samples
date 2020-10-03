import { Sequelize } from 'sequelize';
import { User, DefineUserModel } from './tables/user';
export class Database {
	private db: Sequelize;

	public User: typeof User;

	constructor(sqlite: string) {
		this.db = new Sequelize({
			dialect: 'sqlite',
			storage: sqlite
		});

		this.User = DefineUserModel(this.db);

		this.User.sync({ force: false });
	}

	public async queryUsersPage(pageStart: number, pageSize: number, filter: string) {}
}
