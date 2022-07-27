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

		

	}, [docCollection, search, uid, cancelled])


}
