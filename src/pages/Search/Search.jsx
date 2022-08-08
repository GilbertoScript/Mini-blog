import styles from './Search.module.scss';

import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';

import PostDetails from '../../components/PostDetails/PostDetails';

const Search = () => {

	const query = useQuery();
	const search = query.get('q');

	const { documents: posts, loading } = useFetchDocuments('posts', search);

	return (
		<div className={styles.search_container}>
			<h1>Resultados da busca</h1>
			<div>
				{loading && <p>... Carregando ...</p>}

				{posts && posts.map((post) => (
					<>
						<PostDetails key={post.id} post={post} />
						<Link to="/" className="btn btn-dark">Voltar</Link>
					</>
				))}

				{posts && posts.length === 0 && (
					<div className={styles.noposts}>
						<p>Não foram encontrados posts a partir da sua busca</p>
						<Link to="/" className="btn btn-dark">Voltar</Link>
					</div>
				)}
			</div>	
		</div>
	)
}

export default Search;