
import { useState } from 'react';
import './main.css'
import axios from 'axios';

function DownloadPage() {
	const [videoUrl, setvideoUrl] = useState('');
	const [videoSearched, setVideoSearched] = useState('');
	const [videoDownloaded, setVideoDownloaded] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState(0);

	async function searchVideo() {
		const response = await axios.get('http://localhost:5174/video-infos', {
			params: {url: videoUrl},
		})
		if (response.status == 200) {
			setVideoSearched(response.data)
			console.log(videoSearched.thumbnail, 'CUUUU')
		}
		console.log("veio resposne", response.data)
	}

	async function downloadVideo() {
		try {
		  const response = await axios.get('http://localhost:5174/download', {
			params: { url: videoUrl },
			responseType: 'blob', // Importante para baixar arquivos
			onDownloadProgress: (progressEvent) => {
			  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			  console.log('Download progress:', percentCompleted);
			  // Atualizar estado ou fazer algo com o progresso aqui
			},
		  });
	  
		  // Criar URL blob e iniciar o download
		  const url = window.URL.createObjectURL(new Blob([response.data]));
		  const link = document.createElement('a');
		  link.href = url;
		  link.setAttribute('download', `${videoSearched.title}.mp4`);
		  document.body.appendChild(link);
		  link.click();
	  
		  // Marcar que o vídeo foi baixado com sucesso
		  setVideoDownloaded(true);
		} catch (error) {
		  console.error('Error downloading the video:', error);
		}
	  }
	  

	return (
		<>
			<div className='content'>
				<h1>Digite o link do vídeo que deseja baixar</h1>
				<div className='input-link'>
					<input onChange={ (e)=>setvideoUrl(e.target.value) }type="text" placeholder='Digite o link do seu vídeo'/>
					<button onClick={searchVideo}>Buscar Vídeo</button>
				</div>
				{videoSearched && (
					<div className='video-founded'>
						<img src={videoSearched.thumbnail} alt="" />
						<div className='founded-actions'>
							<h3>{videoSearched.title}</h3>
							<button onClick={downloadVideo}>Download VIDEO</button>
							<button>Download AUDIO</button>
						</div>
					</div>
				)}
				{setVideoDownloaded == true && (
					<h1>Video baixado com sucesso!</h1>
				)}
			</div>
		</>
	)
}

export default DownloadPage
