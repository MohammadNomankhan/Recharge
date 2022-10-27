const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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


function updateProgressBar(e) {
	const {duration, currentTime} = e.srcElement;
	const liveProgress = (currentTime/duration) * 100;
	progress.style.width = `${liveProgress}%`

	// update duration
	const durationMinutes = Math.floor(duration/60);
	let durationSeconds = Math.floor(duration % 60);
	if(durationSeconds < 10) {
		durationSeconds = `0${durationSeconds}`;
	}
	if (durationSeconds) {
		durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
	}

	// update current time
	let currentMinutes = Math.floor(currentTime/60);
	let currentSeconds = Math.floor(currentTime % 60);

	if (currentSeconds < 10) {
		currentSeconds = `0${currentSeconds}`;
	} 
	if (currentSeconds) {
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const {duration} = music;
	music.currentTime = (clickX / width) * duration;
}


// event listnener for progress bar
music.addEventListener('timeupdate', updateProgressBar);

// event listener for update current time
progressContainer.addEventListener('click',setProgressBar);

// event listener for next song when current ends
music.addEventListener('ended', nextSong);