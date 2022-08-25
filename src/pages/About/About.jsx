import styles from './About.module.scss';
import { Link } from 'react-router-dom';
import aboutUs from '../../assets/about.svg'

const About = () => {

	return (
		<section className={styles.about}>

			<div className={styles.firstColumn}>
				<h2>Sobre o Mini <span>Blog</span></h2>
				<p>
					Mini Blog - Cadastre-se e comece a postar hoje mesmo!<br />
					Dia-a-dia, almoço, viagens, o que você quiser!<br /><br />

					Este projeto consiste basicamente em uma aplicação ReactJs <br />
					para o Front-end e Firebase para Back-end/banco de dados.
				</p>
				<Link to="/posts/create" className="btn">
					Crie um post!
				</Link>
			</div>

			<div className={styles.imageColumn}>
				<img src={aboutUs} alt="Sobre nós" height="350" />
			</div>				
		</section>
	)
}

export default About;