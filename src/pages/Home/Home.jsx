import styles from './Home.module.scss';

import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import PostDetails from '../../components/PostDetails/PostDetails';

const Home = () => {

	const [query, setQuery] = useState('');
	const { documents: posts, loading } = useFetchDocuments('posts');

	const handleSubmit = (e) =>  {

		e.preventDefault();
	}

	return (
		<div className={styles.home}>
			<h1>Veja os nossos posts mais recentes</h1>

			<form onSubmit={handleSubmit} className={styles.search_form}>
				<input 
					type="text" 
					placeholder="Ou busque por tags..." 
					onChange={(e) => {setQuery(e.target.value)}}
				/>
				<button className="btn btn-dark">Pesquisar</button>
			</form>

			<div>
				{loading && <p>... Carregando ...</p>}

				{posts && posts.map((post) => (

					<PostDetails key={post.id} post={post} />
				))}

				{posts && posts.length === 0 && (

					<div className={styles.noposts}>
						
						<p>Não foram encontrados posts</p>
						<Link to="/posts/create" className="btn">Criar primeiro post</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home;