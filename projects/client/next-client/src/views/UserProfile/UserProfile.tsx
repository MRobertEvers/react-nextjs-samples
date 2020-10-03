import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import useSWR from 'swr';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { fetchUser } from '../../api/fetch-user';
import { Page } from '../../components/Page';

import styles from './user-profile.module.css';

const UNSPLASH_COLLECTION = '148984';

type UserProfileProps = {
	id: string;
};

export function UserProfile(props: UserProfileProps) {
	const { id } = props;

	const { data, isValidating, error } = useSWR(`/users/${id}`, async (key: string) => {
		return await fetchUser(id);
	});

	const unsplashUrl = `https://source.unsplash.com/collection/${UNSPLASH_COLLECTION}/144x144?${id}`;

	let body;
	if (!data) {
		body = (
			<LoadingIndicator
				style={{
					width: '32px',
					height: '32px',
					margin: 'auto'
				}}
			/>
		);
	} else if (!error) {
		const { name, description } = data;
		body = (
			<>
				<p>
					<span className={styles['user-card-emphasis-h2']}>{name.toUpperCase()}</span>
				</p>
				<p>{description}</p>
			</>
		);
	}
	return (
		<Page title="Profile">
			<div className={styles['user-profile']}>
				<div
					className={styles['user-profile-avatar']}
					style={{
						backgroundImage: `url(${unsplashUrl})`
					}}
				/>
				{body}
			</div>
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<UserProfileProps>> {
	return {
		props: {
			id: context.params.id as string
		}
	};
}
