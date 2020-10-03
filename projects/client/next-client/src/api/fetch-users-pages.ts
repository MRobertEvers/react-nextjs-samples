import { promiseTimeout } from '../utils/promise-timeout';
import { REST_API } from './backend-host';

export interface APIUserModel {
	// I'm going to minimally require that the client ALWAYS
	// requests the id and the name...
	id: string;
	name: string;
	dob?: string;
	address?: string;
	description?: string;
	createdAt?: number;
	updatedAt?: number;
}

export interface FetchGetPagesResult {
	users: APIUserModel[];
	nextToken: string;
}

export async function fetchGetPages(pageStart: number, numUsers: number, filter = ''): Promise<FetchGetPagesResult> {
	const query = new URLSearchParams();
	query.append('pageStart', pageStart.toString());
	query.append('pageSize', numUsers.toString());
	if (filter) {
		query.append('filter', filter);
	}

	try {
		const pagesResult = await promiseTimeout(
			fetch(`${REST_API}?${query.toString()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}),
			6000
		);
		return pagesResult.json();
	} catch (e) {
		// TODO:
		return;
	}
}
