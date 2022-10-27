const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying = false;

const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Electric Chill Machine',
		artist: 'Jacinto Design'
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army (Remix)',
		artist: 'Jacinto Design'
	},
	{
		name: 'jacinto-3',
		displayName: 'Good Night, Disco Queen',
		artist: 'Jacinto Design'
	},
	{
		name: 'metric-1',
		displayName: 'Front Row(Remix)',
		artist: 'Metric/Jacinto Design'
	}

]


function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play','fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause','fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}



// event listener

playBtn.addEventListener('click', () => ((isPlaying ? pauseSong() : playSong())));



// manipulate Dom
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;	
}


let songIndex = 0;
loadSong(songs[songIndex]);

function prevSong() {
	songIndex--;
	if(songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if(songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// event listener

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);