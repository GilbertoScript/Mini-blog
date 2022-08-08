import styles from './Post.module.scss';

import { useParams } from 'react-router-dom';
import { useFetchSingleDocument } from '../../hooks/useFetchSingleDocuments';

const Post = () => {

	const { id } = useParams();
	const { document: post, loading } = useFetchSingleDocument('posts', id)

	return (
		<>
			{loading && (<p>Carregando post...</p>)}
			{post && (
				<>
					<h1>{post.title}</h1>
				</>
			)}
		</>
	)
}

export default Post;