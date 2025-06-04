//script.js for ECHO-SHARP
//---------------------------------------------------------------------------------------                                  song-constant ---------------------------------------------------------------------------------------
const songs = [
    {
        title: "Jana Samjhona",
        artist: "Tulsi Kumar",
        audio: "/audio/128-Jaana Samjho Na - Bhool Bhulaiyaa 3 128 Kbps.mp3",
        cover: "/song cover/JANA SAMJHONA .jpeg",
        duration: "03:32",
    },
    {
        title: "Yimmy Yimmy",
        artist: "Shreya Ghoshal",
        audio: "/audio/Yimmy Yimmy - Shreya Ghoshal 320 Kbps.mp3",
        cover: "/song cover/YIMMY-YIMMY.jpeg",
        duration: "03:31",
    },
    {
        title: "Payal Glory",
        artist: "Honey Singh",
        audio: "/audio/Payal Glory 320 Kbps.mp3",
        cover: "/song cover/payal.jpg",
        duration: "04:03",
    },
    {
        title: "Soulmate",
        artist: "Arijit X Badsha",
        audio: "/audio/Soulmate - Ek Tha Raja 320 Kbps.mp3",
        cover: "/song cover/SOULMATE.jpeg",
        duration: "04:03",
    },
    {
        title: "Nadaaniyan",
        artist: "Unknown",
        audio: "/audio/Nadaaniyan Akshath 320 Kbps.mp3",
        cover: "/song cover/nadaaniyan-Akshath.jpg",
        duration: "04:03",
    },
    {
        title: "Ordinary Person",
        artist: "Anirudh Ravi",
        audio: "/audio/Ordinary-Person-MassTamilan.dev.mp3",
        cover: "/song cover/ORDINERY .JPEG",
        duration: "04:03",
    },
    {
        title: "Aaj Ki Raat",
        artist: "Shreya Ghoshal",
        audio: "/audio/Aaj Ki Raat - Stree 2 320 Kbps.mp3",
        cover: "/song cover/Aaj Ki Raat - Stree 2 .jpg",
        duration: "04:03",
    },
    {
        title: "Badass Leo",
        artist: "Anirudh Ravi",
        audio: "/audio/Badass - Leo (Hindi) 320 Kbps.mp3",
        cover: "/song cover/BADASS.jpeg",
        duration: "04:03",
    },
    {
        title: "Ready Chal",
        artist: "Anirudh Ravi",
        audio: "/audio/Ready Chal - Leo (Hindi) 320 Kbps.mp3",
        cover: "/song cover/NAA READY.jpeg",
        duration: "04:03",
    },
    {
        title: "teri batao main",
        artist: "raghav,tanishk",
        audio: "/audio/tbauj.mp3",
        cover: "/song cover/- Teri Baaton Mein Aisa Uljha Jiya .jpg",
        duration: "02:32",
    },
    {
        title: "tujhe kitna chahein aur hum",
        artist: "Anirudh",
        audio: "/audio/Tujhe Kitna Chahein .mp3",
        cover: "/song cover/kabir.jpg",
        duration: "04:23",
    },
    {
        title: "Tum Se",
        artist: "Raghav",
        audio: "/audio/Tum Se .mp3",
        cover: "/song cover/Tum Se -.jpg",
        duration: "04:22",
    },
];

//---------------------------------------------------------------------------------------                                  declaring buttons ---------------------------------------------------------------------------------------
let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();
const playButton = document.querySelector('.play-button');
const songTitle = document.querySelector('.description h5');
const songArtist = document.querySelector('.description p');
const songCover = document.querySelector('.song-info img');
const progressBar = document.querySelector('.active-line');
const currentDuration = document.querySelector('.progress p:nth-child(1)');
const totalDuration = document.querySelector('#duration');
const musicListContainer = document.querySelector('.music-list .items');

//---------------------------------------------------------------------------------------                                  logic for buttons ---------------------------------------------------------------------------------------
function renderSongs(songArray) {
    musicListContainer.innerHTML = '';
    songArray.forEach((song, index) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
            <div class="info">
                <p>${index + 1}</p>
                <img src="${song.cover}" alt="${song.title} cover" />
                <div class="details">
                    <h5>${song.title}</h5>
                    <p>${song.artist}</p>
                </div>
            </div>
            <div class="actions">
                <p>${song.duration}</p>
                <div class="icon play-icon" data-index="${index}">
                    <i class="bx bxs-right-arrow"></i>
                </div>
                <i class="bx bxs-plus-square"></i>
            </div>
        `;
        musicListContainer.appendChild(item);
    });

    //-------------------------------------------------------------------------------                             Add event listeners for play icons
    // --------------------------------------------------------------------------------
    document.querySelectorAll('.play-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const songIndex = parseInt(e.currentTarget.getAttribute('data-index'));
            currentSongIndex = songIndex;
            loadSong(songs[currentSongIndex]);
            playSong();
        });
    });
}

function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songCover.src = song.cover;
    audio.src = song.audio;
    totalDuration.textContent = song.duration;

    //-----------------------------------------------------------------------------------
    //                Reset progress bar and current time
     //----------------------------------------------------------------------------------
    progressBar.style.width = '0%';
    currentDuration.textContent = "00:00";
}

function playSong() {
    audio.play();
    isPlaying = true;
    playButton.classList.remove('bxs-right-arrow');
    playButton.classList.add('bx-pause');
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playButton.classList.remove('bx-pause');
    playButton.classList.add('bxs-right-arrow');
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function shuffleSongs() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    renderSongs(songs);
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentDuration.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('ended', nextSong);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

playButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

document.querySelector('.bx-first-page').addEventListener('click', previousSong);
document.querySelector('.bx-last-page').addEventListener('click', nextSong);

// Shuffle button (add event listener)
const shuffleButton = document.querySelector('.bx-transfer-alt');
shuffleButton.addEventListener('click', () => {
    shuffleSongs();
    currentSongIndex = 0;
    loadSong(songs[currentSongIndex]);
    playSong();
});

// Search functionality
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm));
    renderSongs(filteredSongs);
    if (filteredSongs.length > 0) {
        currentSongIndex = songs.indexOf(filteredSongs[0]);
        loadSong(filteredSongs[0]);
    }
});

// Sidebar toggle functionality for mobile
const menuOpenBtn = document.getElementById('menu-open');
const menuCloseBtn = document.getElementById('menu-close');
const sidebar = document.querySelector('.sidebar');

menuOpenBtn.addEventListener('click', () => {
    sidebar.style.left = '0';
});

menuCloseBtn.addEventListener('click', () => {
    sidebar.style.left = '-100%';
});

// Initialize
renderSongs(songs);
loadSong(songs[currentSongIndex]);
