
import './main.css'

function DownloadPage() {

	function downloadVideo() {
		console.log("teste")
	}

	return (
		<>
			<div className='content'>
				<h1>Digite o link do vídeo que deseja baixar</h1>
				<div className='input-link'>
					<input type="text" placeholder='Digite o link do seu vídeo'/>
					<button onClick={downloadVideo}>Buscar Vídeo</button>
				</div>
			</div>
		</>
	)
}

export default DownloadPage
