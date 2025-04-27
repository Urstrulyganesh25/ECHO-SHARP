// alert('WELCOME TO ECHO-SHARP');
// Sample songs data
const songs = [
    {
        title: "Jana Samjhona",
        artist: "tulsi kumar..",
        audio: "/audio/128-Jaana Samjho Na - Bhool Bhulaiyaa 3 128 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/JANA SAMJHONA .jpeg", // Replace with your cover image path
        duration: "04:03",
    },

    {
        title: "Yimmy-yimmy",
        artist: "shreya Ghoshal",
        audio: "/audio/Yimmy Yimmy - Shreya Ghoshal 320 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/YIMMY-YIMMY.jpeg", // Replace with your cover image path
        duration: "04:03"
    },
    {
        title: "Payal-Glory",
        artist: "Honey-singh",
        audio: "/audio/Payal Glory 320 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/payal.jpg", // Replace with your cover image path
        duration: "04:03"
    },
    {
        title: "Soulmate",
        artist: "ArijitXbadsha",
        audio: "/audio/Soulmate - Ek Tha Raja 320 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/SOULMATE.jpeg", // Replace with your cover image path
        duration: "04:03"
    },
    {
        title: "NADANIYAAN",
        artist: "UNKNOWN",
        audio: "/audio/Nadaaniyan Akshath 320 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/nadaaniyan-Akshath.jpg", // Replace with your cover image path
        duration: "04:03"
    },
    {
        title: "ORDINERY PORSON",
        artist: "ANIRUDH RAVI...",
        audio: "/audio/Ordinary-Person-MassTamilan.dev.mp3", // Replace with your audio file path
        cover: "/song cover/ORDINERY .JPEG", // Replace with your cover image path
        duration: "04:03"
    },
    {
        title: "AJJ KI RAAT",
        artist: "SHREYA GHOSHAL",
        audio: "/audio/Aaj Ki Raat - Stree 2 320 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/Aaj Ki Raat - Stree 2 .jpg", // Replace with your cover image path
        duration: "04:03"
    },
    {
        title: "BADASS-LEO",
        artist: "ANIRUDH RAVI...",
        audio: "/audio/Badass - Leo (Hindi) 320 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/BADASS.jpeg", // Replace with your cover image path
        duration: "04:03"
    },
    {
        title: "READY-CHALL",
        artist: "ANIRUDH RAVI...",
        audio: "/audio/Ready Chal - Leo (Hindi) 320 Kbps.mp3", // Replace with your audio file path
        cover: "/song cover/NAA READY.jpeg", // Replace with your cover image path
        duration: "04:03"
    },
    // 
    {
        title: "Ajj ki Raat",
        artist: "Shreyaa",
        duration: "03:48",
        cover: "/song cover/Aaj Ki Raat - Stree 2 .jpg",
        audio: "/audio/Aaj Ki Raat - Stree 2 320 Kbps.mp3" // Replace with actual audio file path
    },
    {
        title: "Nadaniya",
        artist: "Anuv",
        duration: "02:51",
        cover: "/song cover/nadaaniyan-Akshath.jpg",
        audio: "/audio/Nadaaniyan Akshath 320 Kbps.mp3" // Replace with actual audio file path
    },
    {
        title: "Jolly-o-Jimkhana",
        artist: "Anirudh Ravi",
        duration: "04:35",
        cover: "/song cover/1200x1200bf-60 (1).jpg",
        audio: "/audio/.mp3" // Replace with actual audio file path
    },
    {
        title: "Jolly-o-Jimkhana",
        artist: "Anirudh Ravi",
        duration: "04:35",
        cover: "/song cover/1200x1200bf-60 (1).jpg",
        audio: "/audio/.mp3" // Replace with actual audio file path
    },
    {
        title: "Jolly-o-Jimkhana",
        artist: "Anirudh Ravi",
        duration: "04:35",
        cover: "/song cover/.jpg",
        audio: "audio/.mp3" // Replace with actual audio file path
    },
    {
        title: "Jolly-o-Jimkhana",
        artist: "Anirudh Ravi",
        duration: "04:35",
        cover: "/song cover/.jpg",
        audio: "/audio/.mp3" // Replace with actual audio file path
    },
    // Add more songs as needed
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();
const playButton = document.querySelector('.play-button');
const songTitle = document.querySelector('.description h5');
const songArtist = document.querySelector('.description p');
const songCover = document.querySelector('.song-info img');
const progressBar = document.querySelector('.active-line');
const currentDuration = document.querySelector('.progress p:nth-child(1)');

// logic for play pause buttons

// Add an event listener to the button
playButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play(); // Play the audio
        playButton.classList.remove('bxs-right-arrow'); // Remove play icon
        playButton.classList.add('bx-pause'); // Add pause icon
    } else {
        audio.pause(); // Pause the audio
        playButton.classList.remove('bx-pause'); // Remove pause icon
        playButton.classList.add('bxs-right-arrow'); // Add play icon
    }
});

// Load the current song
function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songCover.src = song.cover;
    audio.src = song.audio;
    currentDuration.textContent = song.duration;
    totalDuration.textContent = song.duration;

    // Reset progress bar
    progressBar.style.width = '50%';
    currentDuration.textContent = "00:00"; // Reset current duration
    progressBar.style.width = '50%';
    totalDuration.textContent = "00:00"; // Reset current duration
}



// Play next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong('autoplay');
}

// Play previous song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong('autoplay');
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentDuration.textContent = formatTime(audio.currentTime);
    totalDuration.textContent = formatTime(audio.totalTime);
});

// Format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event listeners
playButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

document.querySelector('.bx-first-page').addEventListener('click', previousSong);
document.querySelector('.bx-last-page').addEventListener('click', nextSong);

// Search functionality
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchTerm));
    // Update the UI with filtered songs (you can create a function to render the songs)
    console.log(filteredSongs); // For demonstration, log the filtered songs
});

// Initialize the first song
loadSong(songs[currentSongIndex]);

// Update the audio element when the song ends
audio.addEventListener('ended', nextSong);


fetch('/audio/songs')
    .then(response => response.json())
    .then(data => {
        console.log(songs);
        // Update your UI with the music data
    })
    .catch(error => console.error('Error fetching music data:', error));