import styles from './Search.module.scss';

import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

const Search = () => {

	const query = useQuery();
	const search = query.get('q')

	return (
		<>
			<h2>Resultados da busca</h2>
			<p>{search}</p>
		</>
	)
}

export default Search;