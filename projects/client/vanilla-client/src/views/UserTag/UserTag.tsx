import * as React from 'react';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';

import { Page } from '../../components/Page';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { IconButton } from '../../components/Button/IconButton';
import ArrowBackIcon from '../../components/icons/ArrowBackIcon';

import styles from './user-slogans.module.css';

type UserSloganProps = {
	userId: string;
	tagId: string;
};

export function UserTag(props: UserSloganProps) {
	const { userId, tagId } = props;

	const router = useHistory();

	const { data, error } = useSWR(`/tag/${tagId}`, async (key: string) => {
		// return await fetchTag(tagId);
		return {} as any;
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
		const { description, dateCreated } = data;
		body = <div>{description}</div>;
	}

	return (
		<Page title="Tags">
			<div className={styles['user-tag']}>
				<IconButton
					icon={ArrowBackIcon}
					style={{
						borderRadius: '50%',
						width: '64px',
						height: '64px',
						border: 'none',
						position: 'absolute'
					}}
					onClick={() => {
						router.push(`/user/${userId}`);
					}}
				/>
				{body}
			</div>
		</Page>
	);
}
