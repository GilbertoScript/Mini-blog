import { useState, useEffect, useReducer } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
	loading: null,
	error: null
}

const insertReducer = (state, action) => {

	switch(action.type) {

		case 'LOADING':
			return { loading: true, error: null };

		case 'INSERTED_DOC':
			return { loading: false, error: null };

		case 'ERROR':
			return { loading: false, error: action.payload };

		default:
			return state;
	}
}

export const useInsertDocument = (docCollection) => {

	const [response, dispatch] = useReducer(insertReducer, initialState);

	// tratar vazamento de memória
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action) => {

		if(!cancelled) {
			dispatch(action)
		}
	}

	const insertDocument = async (document) => {

		checkCancelBeforeDispatch({ type: 'LOADING' })

		try {

			// documento que será inserido
			const newDocument = {...document, createdAt: Timestamp.now()};

			// resultado da inserção
			const insertedDocument = await addDoc(
				collection(db, docCollection),
				newDocument
			);

			// ajustar possível vazamento de memória
			checkCancelBeforeDispatch({
				type: 'INSERTED_DOC',
				payload: insertedDocument
			})

		} catch(error) {

			checkCancelBeforeDispatch({
				type: 'ERROR',
				payload: error.message
			})
		}
	}

	// deal with memory leak
	useEffect(() => {

		return () => {setCancelled(true)}

	}, [])

	return { insertDocument, response }
}