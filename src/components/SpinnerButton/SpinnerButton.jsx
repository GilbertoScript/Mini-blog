import styles from './SpinnerButton.module.scss';

const SpinnerButton = () => {

	return (
		<>
			<button className={`${styles.spinnerButton} btn`}>
				<div className={styles.spinner}></div>	
			</button>	
		</>
	)
}

export default SpinnerButton;