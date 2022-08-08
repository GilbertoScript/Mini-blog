import styles from './Post.module.scss';

import { useParams } from 'react-router-dom';

const Post = () => {

	const { id } = useParams();

	return (
		<>
			<h1>Post</h1>
			{id}
		</>
	)
}

export default Post;