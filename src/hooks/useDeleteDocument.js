import { useState, useEffect, useReducer } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
	loading: null,
	error: null
}

const deleteReducer = (state, action) => {

	switch(action.type) {

		case 'LOADING':
			return { loading: true, error: null };

		case 'DELETED_DOC':
			return { loading: false, error: null };

		case 'ERROR':
			return { loading: false, error: action.payload };

		default:
			return state;
	}
}

export const useDeleteDocument = (docCollection) => {

	const [response, dispatch] = useReducer(deleteReducer, initialState);

	// tratar vazamento de memória
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action) => {

		if(!cancelled) {
			dispatch(action)
		}
	}

	const deleteDocument = async (id) => {

		checkCancelBeforeDispatch({ type: 'LOADING' })

		try {

			// documento que será deletado
			const deletedDocument = await deleteDoc(doc(db, docCollection, id));

			// ajustar possível vazamento de memória
			checkCancelBeforeDispatch({
				type: 'DELETED_DOC',
				payload: deletedDocument
			})

		} catch(error) {

			checkCancelBeforeDispatch({
				type: 'ERROR',
				payload: error.message
			})
		}
	}

	// deal with memory leak
	// useEffect(() => {

	// 	return () => {setCancelled(true)}

	// }, [])

	return { deleteDocument, response }
}