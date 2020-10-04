import { promiseTimeout } from '../utils/promise-timeout';
import { REST_API } from './backend-host';
import { APIUserModel } from './fetch-users-pages';

export type FetchUserResult = APIUserModel;

export async function fetchUser(id: string): Promise<FetchUserResult> {
	try {
		const userResult = await promiseTimeout(
			fetch(`${REST_API}/users/${id}`, {
				method: 'GET'
			}),
			6000
		);
		return userResult.json();
	} catch (e) {
		// TODO:
		return;
	}
}
