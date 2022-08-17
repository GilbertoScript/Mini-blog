import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';

// hooks
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const Dashboard = () => {

	const { user } = useAuthValue();
	const uid = user.uid;

	const { documents: posts, loading, error } = useFetchDocuments('posts', null, uid);

	const handleDeleteDocument = (id) => {


	}

	if(loading) {
		return <p>...Carregando...</p>
	}

	return (
		<div>
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
					<div>
						<span>Título</span>
						<span>Ações</span>
					</div>

					{posts && posts.map((post) => (

						<div key={post.id}>
							<p>{post.title}</p>
							<div>
								<Link to={`/posts/${post.id}`} className="btn btn-outline">
									Ver
								</Link>
								<Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
									Editar
								</Link>
								<button 
									onClick={() => {handleDeleteDocument(post.id)}}
									className="btn btn-outline btn-danger"
								>
									Excluir
								</button>
							</div>						
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default Dashboard;