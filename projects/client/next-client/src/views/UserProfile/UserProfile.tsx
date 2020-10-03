import { Page } from '../../components/Page';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import styles from './user-profile.module.css';

const UNSPLASH_COLLECTION = '148984';

type UserProfileProps = {
	id: string;
};

export function UserProfile(props: UserProfileProps) {
	const { id } = props;

	const unsplashUrl = `https://source.unsplash.com/collection/${UNSPLASH_COLLECTION}/144x144?${id}`;

	return (
		<Page title="Profile">
			<div className={styles['user-profile']}>
				<div
					className={styles['user-profile-avatar']}
					style={{
						backgroundImage: `url(${unsplashUrl})`
					}}
				/>
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
