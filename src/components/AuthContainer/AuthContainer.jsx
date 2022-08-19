import './AuthContainer.scss';

const AuthContainer = ({ children }) => {

	return (
		<div className="authContainer">
			{children}
		</div>
	)
}

export default AuthContainer;