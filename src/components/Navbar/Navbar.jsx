import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';

const Navbar = () => {

	const { user } = useAuthValue();
	const { logout } = useAuthentication();

	return (
		<nav className={styles.navbar}>
			<NavLink to="/" className={styles.brand}>
				<img src={logo} alt="Logo do Mini Blog" height="30" />
			</NavLink>

			<ul className={styles.links_list}>
				<li>
					<NavLink 
						to="/" 
						className={({isActive}) => (isActive ? styles.active : '')}
					>
						Home
					</NavLink>
				</li>
				{!user && (
					<>
						<li>
							<NavLink 
								to="/login" 
								className={({isActive}) => (isActive ? styles.active : '')}
							>
								Login
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/register" 
								className={({isActive}) => (isActive ? styles.active : '')}
							>
								Cadastrar
							</NavLink>
						</li>
					</>
				)}

				{user && (
					<>
						<li>
							<NavLink 
								to="/posts/create" 
								className={({isActive}) => (isActive ? styles.active : '')}
							>
								Criar post
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/dashboard" 
								className={({isActive}) => (isActive ? styles.active : '')}
							>
								Dashboard
							</NavLink>
						</li>
					</>
				)}
				<li>
					<NavLink 
						to="/about" 
						className={({isActive}) => (isActive ? styles.active : '')}
					>
						Sobre
					</NavLink>
				</li>
				{user && (
					<li>
						<button onClick={logout}>Sair</button>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navbar;