import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
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

const UNSPLASH_COLLECTION = '148984';
type UserProfileBodyProps = {
	userId: string;
	name: string;
	description: string;
	address: string;
};
function UserProfileBody(props: UserProfileBodyProps) {
	const { name, description, address, userId } = props;

	const [editName, setEditName] = useState(name);
	const [editAddress, setEditAddress] = useState(address);
	const [editDescription, setEditDescription] = useState(description);

	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={styles['user-profile-contents']}>
			<h2>
				<span>{name.toUpperCase()}</span>
			</h2>
			<div className={styles['user-profile-input-container']}>
				<div>
					<InputLabel htmlFor="name">Name</InputLabel>
					<TextInputWithIndicators
						className={styles['user-profile-input']}
						indicator={editName === name ? null : 'alert'}
						value={editName || ''}
						onChange={(e) => {
							const newValue = e.target.value;
							setEditName(newValue);
						}}
					/>
				</div>
				<div>
					<InputLabel htmlFor="location">Location</InputLabel>
					<TextInputWithIndicators
						className={styles['user-profile-input']}
						indicator={editAddress === address ? null : 'alert'}
						value={editAddress || ''}
						onChange={(e) => {
							const newValue = e.target.value;
							setEditAddress(newValue);
						}}
					/>
				</div>
				<div>
					<InputLabel htmlFor="description">Description</InputLabel>
					<TextInputWithIndicators
						className={styles['user-profile-input']}
						indicator={editDescription === description ? null : 'alert'}
						value={editDescription || ''}
						onChange={(e) => {
							const newValue = e.target.value;
							setEditDescription(newValue);
						}}
					/>
				</div>
			</div>
			<div className={styles['user-profile-input-container-footer']}>
				<Button
					style={{ margin: '0' }}
					onClick={async () => {
						setIsLoading(true);
						await fetchModifyUser(userId, editName, '', editAddress, editDescription);
						setIsLoading(false);
						mutate(`/users/${userId}`);
					}}
				>
					{!isLoading ? (
						'Save'
					) : (
						<LoadingIndicator style={{ width: '24px', height: '24px', margin: 'auto' }} />
					)}
				</Button>
				<Button
					style={{ margin: '0' }}
					onClick={() => {
						setEditName(name);
						setEditAddress(address);
						setEditDescription(description);
					}}
				>
					Reset
				</Button>
			</div>
		</div>
	);
}

type UserProfileProps = {
	id: string;
};

export function UserProfile(props: UserProfileProps) {
	const { id } = props;
	const router = useRouter();
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
