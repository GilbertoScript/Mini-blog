import { 
	getAuth, 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signOut 
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	// Cleanup - lidar com vazamento de memória
	const [cancelled, setCancelled] = useState(false);

	const auth = getAuth();

	function checkIfIsCancelled() {
		if(cancelled) {
			return;
		}
	}
}