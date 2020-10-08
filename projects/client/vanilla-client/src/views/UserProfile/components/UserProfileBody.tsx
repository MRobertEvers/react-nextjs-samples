import * as React from 'react';
import { useState } from 'react';
import { mutate } from 'swr';
import { Button } from '../../../components/Button/Button';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { fetchModifyUser } from '../../../api/fetch-modify-user';
import { InputLabel } from '../../../components/TextInput/TextInputLabel';
import { TextInputWithIndicators } from '../../../components/TextInput/TextInputWithIndicators';

import styles from '../user-profile.module.css';
import { useHistory } from 'react-router-dom';

type UserProfileBodyProps = {
	userId: string;
	name: string;
	description: string;
	address: string;
	tags: Array<{ tagId: string; description: string }>;
};
export function UserProfileBody(props: UserProfileBodyProps) {
	const { name, description, address, userId, tags } = props;

	const router = useHistory();

	const [editName, setEditName] = useState(name);
	const [editAddress, setEditAddress] = useState(address);
	const [editDescription, setEditDescription] = useState(description);

	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={styles['user-profile-contents']}>
			<h2>
				<span>{name.toUpperCase()}</span>
			</h2>
			<div className={styles['user-profile-tag-container']}>
				{tags.map((tag) => {
					return (
						<div
							className={styles['user-profile-tag']}
							onClick={() => {
								router.push(`/user/${userId}/tags/${tag.tagId}`);
							}}
						>
							{tag.description}
						</div>
					);
				})}
			</div>
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
