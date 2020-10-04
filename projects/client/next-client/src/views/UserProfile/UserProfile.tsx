import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import useSWR, { mutate } from 'swr';

import { LoadingIndicator } from '../../components/LoadingIndicator';
import { fetchUser } from '../../api/fetch-user';
import { Page } from '../../components/Page';
import { InputLabel } from '../../components/TextInput/TextInputLabel';
import { TextInputWithIndicators } from '../../components/TextInput/TextInputWithIndicators';

import styles from './user-profile.module.css';
import { Button } from '../../components/Button/Button';
import ArrowBackIcon from '../../components/icons/ArrowBackIcon';
import { IconButton } from '../../components/Button/IconButton';
import { useRouter } from 'next/dist/client/router';
import { fetchModifyUser } from '../../api/fetch-modify-user';
import { UserProfileBody } from './components/UserProfileBody';
import { UserProfileAvatar } from './components/UserProfileAvatar';

type UserProfileProps = {
	id: string;
};

export function UserProfile(props: UserProfileProps) {
	const { id } = props;
	const router = useRouter();
	const { data, error } = useSWR(`/users/${id}`, async (key: string) => {
		return await fetchUser(id);
	});

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
		const { name, description, address } = data;
		body = <UserProfileBody userId={id} name={name} description={description || ''} address={address || ''} />;
	}
	return (
		<Page title="Profile">
			<div className={styles['user-profile']}>
				<div>
					<IconButton
						icon={ArrowBackIcon}
						style={{
							borderRadius: '50%',
							width: '64px',
							height: '64px',
							border: 'none'
						}}
						onClick={() => {
							router.push('/');
						}}
					/>
				</div>
				<UserProfileAvatar id={data?.userId || ''} />
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
