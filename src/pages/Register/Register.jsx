import styles from './Register.module.scss'
import registerImg from '../../assets/register.svg'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {

	// States do form
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const { createUser, error: authError, loading } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const user = {
			displayName,
			email,
			password
		}

		if(password !== confirmPassword) {
			setError('As senhas precisam ser iguais!');
			return;
		}

		const res = await createUser(user);

		console.log(res);

		setDisplayName('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	}

	// Mapear se o erro do firebase mudou
	useEffect(() => {

		if(authError) {
			setError(authError);
		}

	}, [authError])

	return (
		<div className={styles.register}>
			<div className={styles.formBox}>

				<div className={styles.imageColumn}>
					<img src={registerImg} alt="Imagem de cadastrar" />
				</div>

				<div className={styles.formColumn}>
					<h1>Cadastre-se para postar</h1>
					<p>Crie seu usuário e compartilhe suas histórias!</p>

					{error && (<p className="error">{error}</p>)}

					<form onSubmit={handleSubmit}>
						<label>
							<span>Nome:</span>
							<input 
								type="text" 
								name="displayName" 
								placeholder="Nome do usuário"
								value={displayName}
								onChange={(e) => {setDisplayName(e.target.value)}}
								required 
							/>
						</label>

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

						<label>
							<span>Confirmação de senha:</span>
							<input 
								type="password" 
								name="confirmPassword" 
								placeholder="Confirme sua senha"
								value={confirmPassword}
								onChange={(e) => {setConfirmPassword(e.target.value)}}
								required 
							/>
						</label>

						{!loading && (<button className="btn">Cadastrar-se</button>)}
						{loading && (<button className="btn" disabled>Aguarde...</button>)}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register;