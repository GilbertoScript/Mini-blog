import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';

// hooks
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {

	const { user } = useAuthValue();
	const uid = user.uid;

	// Carregar documentos
	const { documents: posts, loading, error } = useFetchDocuments('posts', null, uid);

	// Excluir documento
	const { deleteDocument } = useDeleteDocument('posts');

	if(loading) {
		return <p>...Carregando...</p>
	}

	return (
		<div className={styles.dashboard}>
			<h1>Dashboard</h1>
			<p>Gerencie os seus posts</p>
			{posts && posts.length === 0 ? (

				<div className={styles.noposts}>
					<p>Não foram encontrados posts!</p>
					<Link to="/posts/create" className="btn">
						Crie seu primeiro post
					</Link>
				</div>
			) : (
				<>
					<div className={styles.posts_header}>
						<span>Título</span>
						<span>Ações</span>
					</div>

					{posts && posts.map((post) => (

						<div key={post.id} className={styles.post_row}>
							<p>{post.title}</p>
							<div>
								<Link to={`/posts/${post.id}`} className="btn btn-outline">
									Ver
								</Link>
								<Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
									Editar
								</Link>
								<a 
									onClick={() => {deleteDocument(post.id)}}
									className="btn btn-danger btn-outline"
								>
									Excluir
								</a>
							</div>						
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default Dashboard;