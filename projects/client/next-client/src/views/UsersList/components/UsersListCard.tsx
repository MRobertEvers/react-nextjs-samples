import { useDispatch } from 'react-redux';
import useHover from '../../../hooks/useHover';
import EditIcon from '../../../components/icons/EditIcon';
import { concatClassNames } from '../../../utils/concat-classnames';
import { UserCard } from '../../../components/UserCard/UserCard';
import type { APIUserModel } from '../redux/users-list.types';

import bodyStyles from './users-list-body.module.css';
import iconStyles from './users-list-card-icon.module.css';

interface UsersListCardProps {
	user: APIUserModel;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toDateDisplayFormat(timestamp: number | string): string {
	if (!timestamp) {
		return '';
	}
	let date;
	if (typeof timestamp === 'string') {
		date = new Date(timestamp);
	} else {
		date = new Date(timestamp * 1000);
	}
	return `${date.getDate().toString().padStart(2, '0')} ${MONTHS[date.getMonth()]} ${date.getFullYear().toString()} `;
}

export function UsersListCard(props: UsersListCardProps) {
	const { user } = props;
	const [hoverRef, isHovered] = useHover();

	let flareClassName = bodyStyles['users-list-card-flare'];
	if (isHovered && user.createdAt) {
		flareClassName += ` ${bodyStyles['users-list-card-flare-hover']}`;
	}

	let userFlare = (
		<span className={flareClassName} style={{ float: 'right' }}>
			<span style={{ paddingRight: '6px' }}>created</span>
			<span className={bodyStyles['user-card-emphasis']}>{toDateDisplayFormat(user.createdAt)}</span>
		</span>
	);

	return (
		<div className={iconStyles['user-card-grid-element']}>
			<EditIcon
				className={
					isHovered
						? concatClassNames(
								iconStyles['users-list-card-edit'],
								iconStyles['users-list-card-edit-visible']
						  )
						: iconStyles['users-list-card-edit']
				}
			/>
			<UserCard
				cardRef={hoverRef}
				flare={userFlare}
				name={user.name}
				description={user.description}
				id={user.id}
				onClick={(e) => {
					// getShowUser(user);
				}}
			/>
		</div>
	);
}
