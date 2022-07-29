import styles from './PostDetails.module.scss';
import imgNotFound from '../../assets/notfound.svg';

import { Link } from 'react-router-dom';

const PostDetails = ({ post }) => {

	return (
		<div className={styles.post_details}>

			<img 
				src={post.image} 
				alt={post.title} 
				onError={({ currentTarget }) => {
				    currentTarget.onerror = null;
				    currentTarget.src = `${imgNotFound}`;
				    currentTarget.height = 300;
				}}
			/>

			<div className={styles.card_content}>
				<h2>{post.title}</h2>

				<p className={styles.createdby}>
					{post.createdBy}
				</p>

				<div className={styles.tags}>
					{post.tagsArray.map((tag) => (
						
						<p key={tag}>
							<strong>#</strong>{tag}
						</p>
					))}
				</div>

				<Link to={`/posts/${post.id}`} className="btn btn-outline">Ler</Link>
			</div>
		</div>
	)
}

export default PostDetails;