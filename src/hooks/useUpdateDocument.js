import { useState, useEffect, useReducer } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
	loading: null,
	error: null
}

const updateReducer = (state, action) => {

	switch(action.type) {

		case 'LOADING':
			return { loading: true, error: null };

		case 'UPDATED_DOC':
			return { loading: false, error: null };

		case 'ERROR':
			return { loading: false, error: action.payload };

		default:
			return state;
	}
}

export const useUpdateDocument = (docCollection) => {

	const [response, dispatch] = useReducer(updateReducer, initialState);

	// tratar vazamento de memória
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action) => {

		if(!cancelled) {
			dispatch(action)
		}
	}

	const updateDocument = async (id, data) => {

		checkCancelBeforeDispatch({ type: 'LOADING' })

		try {

			const docRef = await doc(db, docCollection, id);
			const updatedDocument = await updateDoc(docRef, data);

			// ajustar possível vazamento de memória
			checkCancelBeforeDispatch({
				type: 'INSERTED_DOC',
				payload: updatedDocument
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

	return { updateDocument, response }
}