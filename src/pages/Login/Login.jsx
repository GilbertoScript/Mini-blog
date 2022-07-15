import styles from './Login.module.scss'
import loginImg from '../../assets/login.svg'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import SpinnerButton from '../../components/SpinnerButton/SpinnerButton'

const Login = () => {

	// States do form
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { login, error: authError, loading } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const user = {
			email,
			password
		}

		const res = await login(user);

		console.log(res);
		setEmail('');
		setPassword('');
	}

	// Mapear se o erro do firebase mudou
	useEffect(() => {

		if(authError) {
			setError(authError);
		}

	}, [authError])

	return (
		<div className={styles.login}>
			<div className={styles.formBox}>

				<div className={styles.imageColumn}>
					<img src={loginImg} alt="Imagem de login" />
				</div>

				<div className={styles.formColumn}>
					<h1>Entrar</h1>
					<p>Faça o login para poder utilizar o sistema!</p>

					{error && (<p className="error">{error}</p>)}

					<form onSubmit={handleSubmit}>

						<label>
							<span>E-mail:</span>
							<input 
								type="email" 
								name="email" 
								placeholder="Digite seu e-mail"
								value={email}
								onChange={(e) => {setEmail(e.target.value)}}
								required 
							/>
						</label>

						<label>
							<span>Senha:</span>
							<input 
								type="password" 
								name="password" 
								placeholder="Digite sua senha"
								value={password}
								onChange={(e) => {setPassword(e.target.value)}}
								required 
							/>
						</label>

						{!loading && (<button className="btn">Entrar</button>)}
						{loading && (<SpinnerButton />)}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login;