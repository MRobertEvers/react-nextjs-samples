import styles from '../user-profile.module.css';
import { getUnsplashImage } from '../../../utils/get-unsplash-image';

const UNSPLASH_COLLECTION = '148984';

type UserProfileAvatarProps = {
	id: string;
};
export function UserProfileAvatar(props: UserProfileAvatarProps) {
	const { id } = props;
	const unsplashUrl = getUnsplashImage(id);

	return (
		<div
			className={styles['user-profile-avatar']}
			style={{
				backgroundImage: `url(${unsplashUrl})`
			}}
		/>
	);
}
