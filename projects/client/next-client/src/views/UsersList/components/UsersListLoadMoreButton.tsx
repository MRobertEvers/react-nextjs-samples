import { useDispatch } from 'react-redux';
import {
	useSelectUsersListFilter,
	useSelectUsersListIsLoadMoreAvailable,
	useSelectUsersListNextToken,
	useSelectUsersListIsLoadingUsers
} from '../redux/users-list.selectors';
import { LoadingIndicator } from '../../../components/LoadingIndicator/LoadingIndicator';
import { Button } from '../../../components/Button/Button';

import styles from './users-list-body.module.css';

export function UsersListLoadMoreButton(props: React.PropsWithChildren<{}>) {
	const { children } = props;

	const isLoadMoreAvailable = useSelectUsersListIsLoadMoreAvailable();
	const filter = useSelectUsersListFilter();
	const nextToken = useSelectUsersListNextToken();
	const isLoadingUsers = useSelectUsersListIsLoadingUsers();

	return (
		<Button
			id={styles['load-more-button']}
			disabled={!isLoadMoreAvailable || isLoadingUsers || !!filter}
			onClick={(e) => {
				// getNextPage(nextToken, '');
			}}
		>
			{!isLoadingUsers ? (
				children
			) : (
				<LoadingIndicator style={{ width: '24px', height: '24px', margin: 'auto' }} />
			)}
		</Button>
	);
}
