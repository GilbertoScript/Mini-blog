import styles from './PostDetails.module.scss';
import { Link } from 'react-router-dom';

const PostDetails = ({ post }) => {

	return (
		<div>
			<img src={post.image} alt={post.title} />
			<h2>{post.title}</h2>
			<p>{post.createdBy}</p>

			<div>
				{post.tagsArray.map((tag) => (
					
					<p key={tag}>
						<strong>#</strong>{tag}
					</p>
				))}
			</div>

			<Link to={`/posts/${post.id}`} className="btn btn-outline">Ler</Link>
		</div>
	)
}

export default PostDetails;