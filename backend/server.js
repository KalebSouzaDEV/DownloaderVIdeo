const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = 5174;

app.use(cors());

app.get('/video-infos', async (req, res) => {
    try {
        const info = await ytdl.getInfo(req.query.url);
        const title = info.videoDetails.title;
        const thumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
            console.log('cuu', title, thumbnail)
        res.json({ title, thumbnail });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching video info');
    }
});

app.get('/download', async (req, res) => {
    try {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(req.query.url, {
          format: 'mp4'
        }).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error downloading video');
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});