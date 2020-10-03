import { Page } from '../../components/Page';

import styles from './user-profile.module.css';

export function UserProfile() {
	return (
		<Page title="Profile">
			<div className={styles['users-list']}>
				<div className={styles['users-list-infinite-scroll-container']}>Hello</div>
			</div>
		</Page>
	);
}
