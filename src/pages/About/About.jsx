import styles from './About.module.scss';
import { Link } from 'react-router-dom';
import aboutUs from '../../assets/about.svg'

const About = () => {

	return (
		<section className={styles.about}>

			<div className={styles.firstColumn}>
				<h2>Sobre o Mini <span>Blog</span></h2>
				<p>
					Este projeto consiste basicamente em uma aplicação ReactJs para o Front-end <br />
					e Firebase para Back-end/banco de dados.
				</p>
				<Link to="/posts/create" className="btn">
					Criar post
				</Link>
			</div>

			<div>
				<img src={aboutUs} alt="Sobre nós" height="250" />
			</div>				
		</section>
	)
}

export default About;