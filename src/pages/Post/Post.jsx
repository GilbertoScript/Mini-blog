import styles from './Post.module.scss';
import imgNotFound from '../../assets/notfound.svg';

import { useParams } from 'react-router-dom';
import { useFetchSingleDocument } from '../../hooks/useFetchSingleDocuments';

const Post = () => {

	const { id } = useParams();
	const { document: post, loading } = useFetchSingleDocument('posts', id)

	return (
		<div className={styles.post_container}>
			{loading && (<p>Carregando post...</p>)}
			{post && (
				<div>
					<h1>{post.title}</h1>
					<img 
						src={post.image} 
						alt={post.title} 
						onError={({ currentTarget }) => {
						    currentTarget.onerror = null;
						    currentTarget.src = `${imgNotFound}`;
						    currentTarget.height = 300;
						}}
					/>
					<p className={styles.body}>{post.body}</p>
					<h3>Este post trata sobre:</h3>
					<div className={styles.tags}>
						{post.tagsArray.map((tag) => (

							<p key={tag}>
								<strong>#</strong>{tag}
							</p>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Post;