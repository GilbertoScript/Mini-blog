import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	// tratar vazamento de memória
	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {

		async function loadData() {

			if(cancelled) return;

			setLoading(true);

			const collectionRef = await collection(db, docCollection);

			// tratando a busca de dados
			try {

				let q;

				// busca
				// dashboard

				if(search) {

					q = await query(
						collectionRef, 
						where('tagsArray', 'array-contains', search), 
						orderBy('createdAt', 'desc')
					);

				} else {

					q = await query(collectionRef, orderBy('createdAt', 'desc'));
				}

				await onSnapshot(q, (querySnapshot) => {

					setDocuments(
						querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
				})

				setLoading(false);

			} catch(error) {

				console.log(error);

				setError(error.message);
				setLoading(false);
			}
		}

		loadData();

	}, [docCollection, search, uid, cancelled])

	// deal with memory leak
	useEffect(() => {

		return () => {setCancelled(true)}

	}, [])

	return { documents, loading, error };
}
