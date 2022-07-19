import styles from './CreatePost.module.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

import SpinnerButton from '../../components/SpinnerButton/SpinnerButton';

const CreatePost = () => {

	// States do post
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [body, setBody] = useState('');
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState('');

	const { user } = useAuthValue();

	const { insertDocument, response } = useInsertDocument('posts');
	const navigate = useNavigate();

	const handleSubmit = (e) => {

		e.preventDefault();
		setFormError('');

		// validar url da imagem
		try {

			new URL(image);

		} catch(error) {

			console.log(error);
			setFormError('A imagem precisa ser uma URL.');
		}

		// criar novo array de tags a partir de cada virgula e formatar
		const tagsArray = tags.split(',').map((tag) => { tag.trim().toLowerCase() });

		// checar todos os valores
		if(!title || !image || !body || !tags) {

			setFormError('Por favor preencha todos os campos!');
		}

		if(formError) return;

		insertDocument({
			title,
			image,
			body,
			tagsArray,
			uid: user.uid,
			createdBy: user.displayName
		})

		// redirecionar para a home
		navigate('/');
	}

	return (
		<div className={styles.createPost}>
			<h2>Criar post</h2>
			<p>Escreva sobre o que quiser, e compartilhe seu conhecimento!</p>

			<form onSubmit={handleSubmit}>
				
				<label>
					<span>Título: </span>
					<input 
						type="text" 
						name="title" 
						required
						placeholder="Pense em um bom título" 
						onChange={(e) => {setTitle(e.target.value)}}
						value={title}
					/>
				</label>
				<label>
					<span>URL da imagem: </span>
					<input 
						type="url" 
						name="image" 
						required
						placeholder="Insira uma imagem que representa o seu post" 
						onChange={(e) => {setImage(e.target.value)}}
						value={image}
					/>
				</label>
				<label>
					<span>Conteúdo do post: </span>
					<textarea 
						name="body" 
						required 
						placeholder="Insira o conteúdo do post"
						onChange={(e) => {setBody(e.target.value)}}
						value={body}
					></textarea>	
				</label>
				<label>
					<span>Tags para o post: </span>
					<input 
						type="text" 
						name="tags" 
						required
						placeholder="Insira as tags separadas por vírgula" 
						onChange={(e) => {setTags(e.target.value)}}
						value={tags}
					/>
				</label>

				{!response.loading && (<button className="btn">Cadastrar</button>)}
				{response.loading && (<SpinnerButton />)}

				{response.error && (<p className="error">{response.error}</p>)}
				{formError && (<p className="error">{formError}</p>)}
			</form>
		</div>
	)
}

export default CreatePost;