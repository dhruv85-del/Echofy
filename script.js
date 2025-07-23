// Static list of audio files for GitHub Pages
const songs = [
  "295.mp3",
  "naina.mp3",
  "Aashiq Tera .mp3",
  "We Rollin .mp3",
  "bandana.mp3",
  "Saiyaara.mp3",
  "On Top.mp3",
  "apna bana le.mp3",
  "Lalkara.mp3",
  "Water - Diljit Dosanjh.mp3"
];
// Static list of images for each song (same order as songs array)
const songImages = [
  "images/img1.webp",
  "images/img6.webp",
  "images/img8.jpg",
  "images/img7.jpg",
  "images/img4.jpeg",
  "images/img5.jpg",
  "images/img3.jpeg",
  "images/img2.jpg",
  "images/img9.jpg",
  "images/img10.webp"
];
const defaultSongImage = 'images/logo.jpg';

async function main() {
    // let songs = await getSongs(); // REMOVE dynamic fetch
    console.log(songs);
    let songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = ""; // Clear previous song list
    let currentAudio = null;
    let currentSongIndex = -1;

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function updateSongTime(current, duration) {
        const songtimeDiv = document.querySelector('.playbar .songtime');
        if (songtimeDiv) {
            songtimeDiv.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
        }
        // Update new progress bar and times
        const currentSpan = document.querySelector('.progress-current');
        const totalSpan = document.querySelector('.progress-total');
        if (currentSpan) currentSpan.textContent = formatTime(current);
        if (totalSpan) totalSpan.textContent = formatTime(duration);
        const barFill = document.querySelector('.progress-bar-fill');
        if (barFill && duration > 0) {
            barFill.style.width = `${(current / duration) * 100}%`;
        }
    }

    function clearSongTime() {
        const songtimeDiv = document.querySelector('.playbar .songtime');
        if (songtimeDiv) {
            songtimeDiv.textContent = '';
        }
        // Clear new progress bar and times
        const currentSpan = document.querySelector('.progress-current');
        const totalSpan = document.querySelector('.progress-total');
        if (currentSpan) currentSpan.textContent = '0:00';
        if (totalSpan) totalSpan.textContent = '0:00';
        const barFill = document.querySelector('.progress-bar-fill');
        if (barFill) barFill.style.width = '0%';
    }

    function playSongAtIndex(index, songs) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentSongIndex = index;
        currentAudio = new Audio(`audios/${songs[index]}`);
        currentAudio.play();
        // Update playbar song info
        const songinfoDiv = document.querySelector(".playbar .songinfo");
        if (songinfoDiv) {
            songinfoDiv.textContent = songs[index].replace(/\.[^/.]+$/, "").replaceAll("%20", " ");
        }
        // Optionally update play/pause button state
        updatePlayPauseIcon(true);
        // Show duration when loaded
        currentAudio.addEventListener('loadedmetadata', function() {
            updateSongTime(currentAudio.currentTime, currentAudio.duration);
        });
        // Update time as song plays
        currentAudio.addEventListener('timeupdate', function() {
            updateSongTime(currentAudio.currentTime, currentAudio.duration);
        });
        // When song ends, auto play next
        currentAudio.onended = function() {
            if (currentSongIndex < songs.length - 1) {
                playSongAtIndex(currentSongIndex + 1, songs);
            } else {
                updatePlayPauseIcon(false);
                clearSongTime();
            }
        };
    }

    function updatePlayPauseIcon(isPlaying) {
        // Always select the second play/pause button in the playbar
        const playPauseBtn = document.querySelectorAll('.songbutton img')[1];
        if (playPauseBtn) {
            if (isPlaying) {
                playPauseBtn.src = "pause.svg";
                playPauseBtn.alt = "pause";
            } else {
                playPauseBtn.src = "play.svg";
                playPauseBtn.alt = "play";
            }
        } else {
            console.error('Play/Pause button image not found in playbar!');
        }
    }

    // Manual mapping from song name (trimmed, without .mp3, lowercased) to image path
    const songImageMap = {
        '295': 'images/img1.webp',
        'aashiq tera': 'images/img2.jpg',
        'apna bana le': 'images/img3.jpeg',
        'bandana': 'images/img4.jpeg',
        'lalkara': 'images/img5.jpg',
        'naina': 'images/img6.webp',
        'on top': 'images/img7.jpg',
        'saiyaara': 'images/img8.jpg',
        'water - diljit dosanjh': 'images/img9.jpg',
        'we rollin': 'images/img10.webp'
        // Add more mappings as needed
    };

    function updatePlaybarSongImageByIndex(index) {
        const img = document.querySelector('.playbar-song-img');
        if (img) {
            img.src = songImages[index] || defaultSongImage;
        }
    }

    songs.forEach((song, index) => {
        let li = document.createElement("li");
        li.className = "song-list-item";

        // Music SVG
        let musicLogo = document.createElement("span");
        musicLogo.className = "music-logo";
        musicLogo.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-file-earmark-music' viewBox='0 0 16 16'><path d='M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.6 2.6 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377s.974-.134 1.338-.377c.36-.24.662-.628.662-1.123V8.89l2-.5z'/><path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z'/></svg>`;
        li.appendChild(musicLogo);

        // Song Info
        let songInfo = document.createElement("span");
        songInfo.className = "song-info";
        let songName = document.createElement("span");
        songName.className = "song-name";
        songName.textContent = song.replace(/\.[^/.]+$/, "").replaceAll("%20", " ");
        songInfo.appendChild(songName);
        li.appendChild(songInfo);

        // Play Button
        let playBtn = document.createElement("button");
        playBtn.className = "play-song-btn";
        playBtn.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-play-circle' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16'/><path d='M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445'/></svg>`;
        playBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            playSongAtIndex(index, songs);
        });
        li.appendChild(playBtn);

        songUL.appendChild(li);
    });

    // Playbar controls
    const songButtonImgs = document.querySelectorAll('.songbutton img');
    const prevBtn = songButtonImgs[0];
    const playPauseBtn = songButtonImgs[1];
    const nextBtn = songButtonImgs[2];

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSongIndex > 0) {
                playSongAtIndex(currentSongIndex - 1, songs);
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentSongIndex < songs.length - 1) {
                playSongAtIndex(currentSongIndex + 1, songs);
            }
        });
    }
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (currentAudio) {
                if (currentAudio.paused) {
                    currentAudio.play();
                    updatePlayPauseIcon(true);
                    animatePlayPauseIcon(true);
                } else {
                    currentAudio.pause();
                    updatePlayPauseIcon(false);
                    animatePlayPauseIcon(false);
                }
            } else if (songs.length > 0) {
                playSongAtIndex(0, songs);
            }
        });
    }

    // Seeking functionality
    const progressBg = document.querySelector('.progress-bar-bg');
    if (progressBg) {
        progressBg.addEventListener('click', function(e) {
            if (currentAudio && currentAudio.duration) {
                const rect = progressBg.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;
                currentAudio.currentTime = percent * currentAudio.duration;
            }
        });
    }

    // Show song list in a container
    const songListDiv = document.getElementById("song-list");
    if (songListDiv) {
        songListDiv.innerHTML = ""; // Clear previous
        songs.forEach((url, i) => {
            const songItem = document.createElement("div");
            songItem.textContent = `Song ${i + 1}: ${url.split('/').pop()}`;
            songListDiv.appendChild(songItem);
        });
    }

    // Play first song if available
    if (songs.length > 0) {
        var audio = new Audio(songs[0]);
        audio.play();
    } else {
        console.log("No songs found!");
    }

    // Card play button feature: play song when card play button is clicked
    function normalizeTitle(title) {
        return title.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function findSongIndexByTitle(title, songs) {
        const normTitle = normalizeTitle(title);
        for (let i = 0; i < songs.length; i++) {
            let base = songs[i].replace(/\.[^/.]+$/, '');
            base = decodeURIComponent(base).trim();
            if (normalizeTitle(base).includes(normTitle)) {
                return i;
            }
        }
        return -1;
    }

    document.querySelectorAll('.card').forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        const h2 = card.querySelector('h2');
        if (playBtn && h2) {
            playBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Find and play the song by card title
                const idx = findSongIndexByTitle(h2.textContent, songs);
                if (idx !== -1) {
                    playSongAtIndex(idx, songs);
                } else {
                    alert('Song not found for this card!');
                }
            });
        }
    });
}
main();

// Add volume slider to playbar
function addVolumeSlider() {
    const playbar = document.querySelector('.playbar');
    if (!playbar || playbar.querySelector('.volume-container')) return;
    const volumeContainer = document.createElement('div');
    volumeContainer.className = 'volume-container';
    volumeContainer.style.display = 'flex';
    volumeContainer.style.alignItems = 'center';
    volumeContainer.style.gap = '8px';
    volumeContainer.style.marginLeft = '18px';
    const volumeIcon = document.createElement('span');
    volumeIcon.innerHTML = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M9 4.5v7a.5.5 0 0 1-.757.429L5.825 10H3.5A1.5 1.5 0 0 1 2 8.5v-1A1.5 1.5 0 0 1 3.5 6h2.325l2.418-1.929A.5.5 0 0 1 9 4.5z"/></svg>`;
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.01;
    volumeSlider.value = 1;
    volumeSlider.className = 'volume-slider';
    volumeSlider.style.width = '80px';
    volumeContainer.appendChild(volumeIcon);
    volumeContainer.appendChild(volumeSlider);
    playbar.appendChild(volumeContainer);
    volumeSlider.addEventListener('input', function() {
        if (currentAudio) currentAudio.volume = parseFloat(volumeSlider.value);
    });
}
addVolumeSlider();

// Highlight currently playing song in library
function highlightCurrentSong(index) {
    const items = document.querySelectorAll('.song-list-item');
    items.forEach((li, i) => {
        if (i === index) {
            li.classList.add('playing');
        } else {
            li.classList.remove('playing');
        }
    });
}

// Animate play/pause icon
function animatePlayPauseIcon(isPlaying) {
    const playPauseBtn = document.querySelector('.songbutton img[alt="play"], .songbutton img[alt="pause"]');
    if (playPauseBtn) {
        playPauseBtn.style.transition = 'transform 0.2s cubic-bezier(0.4,0,0.2,1)';
        playPauseBtn.style.transform = 'scale(1.2)';
        setTimeout(() => { playPauseBtn.style.transform = 'scale(1)'; }, 200);
    }
}

// Mute/unmute and volume slider logic
let lastVolume = 1;
const muteBtn = document.querySelector('.mute-btn');
const muteIcon = document.querySelector('.mute-btn .mute-icon');
const volumeSlider = document.querySelector('.volume-slider');

function setAudioVolume(vol) {
    if (currentAudio) {
        currentAudio.volume = vol;
    }
    if (volumeSlider) {
        volumeSlider.value = vol;
    }
    if (muteIcon) {
        if (vol > 0) {
            muteIcon.innerHTML = '<path d="M9 4.5v7a.5.5 0 0 1-.757.429L5.825 10H3.5A1.5 1.5 0 0 1 2 8.5v-1A1.5 1.5 0 0 1 3.5 6h2.325l2.418-1.929A.5.5 0 0 1 9 4.5z"/>';
        } else {
            muteIcon.innerHTML = '<path d="M9 4.5v7a.5.5 0 0 1-.757.429L5.825 10H3.5A1.5 1.5 0 0 1 2 8.5v-1A1.5 1.5 0 0 1 3.5 6h2.325l2.418-1.929A.5.5 0 0 1 9 4.5z"/><path d="M13.536 14.01a.75.75 0 0 1-1.06 0l-10-10a.75.75 0 1 1 1.06-1.06l10 10a.75.75 0 0 1 0 1.06z"/>';
        }
    }
}

if (muteBtn && volumeSlider) {
    muteBtn.addEventListener('click', function() {
        if (currentAudio) {
            if (currentAudio.volume > 0) {
                lastVolume = currentAudio.volume;
                setAudioVolume(0);
            } else {
                setAudioVolume(lastVolume || 1);
            }
        }
    });
    volumeSlider.addEventListener('input', function() {
        if (currentAudio) {
            setAudioVolume(parseFloat(volumeSlider.value));
            if (currentAudio.volume > 0) {
                lastVolume = currentAudio.volume;
            }
        }
    });
}

// When a new song is played, set its volume to the last used value and update slider/icon
function playSongAtIndex(index, songs) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentSongIndex = index;
    currentAudio = new Audio(`audios/${songs[index]}`);
    setAudioVolume(lastVolume); // Set volume and update slider/icon
    currentAudio.play();
    // Update playbar song info
    const songinfoDiv = document.querySelector(".playbar .songinfo");
    if (songinfoDiv) {
        songinfoDiv.textContent = songs[index].replace(/\.[^/.]+$/, "").replaceAll("%20", " ");
    }
    updatePlayPauseIcon(true);
    animatePlayPauseIcon(true);
    highlightCurrentSong(index);
    updatePlaybarSongImageByIndex(index);
    // Show duration when loaded
    currentAudio.addEventListener('loadedmetadata', function() {
        updateSongTime(currentAudio.currentTime, currentAudio.duration);
    });
    // Update time as song plays
    currentAudio.addEventListener('timeupdate', function() {
        updateSongTime(currentAudio.currentTime, currentAudio.duration);
    });
    // When song ends, auto play next
    currentAudio.onended = function() {
        if (currentSongIndex < songs.length - 1) {
            playSongAtIndex(currentSongIndex + 1, songs);
        } else {
            updatePlayPauseIcon(false);
            animatePlayPauseIcon(false);
            clearSongTime();
        }
    };
}

// Keyboard shortcuts
window.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
        e.preventDefault();
        if (currentAudio) {
            if (currentAudio.paused) {
                currentAudio.play();
                updatePlayPauseIcon(true);
                animatePlayPauseIcon(true);
            } else {
                currentAudio.pause();
                updatePlayPauseIcon(false);
                animatePlayPauseIcon(false);
            }
        } else if (songs.length > 0) {
            playSongAtIndex(0, songs);
        }
    } else if (e.code === 'ArrowRight') {
        if (currentAudio && currentAudio.duration) {
            currentAudio.currentTime = Math.min(currentAudio.currentTime + 5, currentAudio.duration);
        }
    } else if (e.code === 'ArrowLeft') {
        if (currentAudio) {
            currentAudio.currentTime = Math.max(currentAudio.currentTime - 5, 0);
        }
    } else if (e.code === 'ArrowUp') {
        if (currentSongIndex > 0) {
            playSongAtIndex(currentSongIndex - 1, songs);
        }
    } else if (e.code === 'ArrowDown') {
        if (currentSongIndex < songs.length - 1) {
            playSongAtIndex(currentSongIndex + 1, songs);
        }
    }
});

// Touch support for progress bar
const progressBg = document.querySelector('.progress-bar-bg');
if (progressBg) {
    progressBg.addEventListener('touchstart', function(e) {
        if (currentAudio && currentAudio.duration && e.touches.length === 1) {
            const rect = progressBg.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const percent = x / rect.width;
            currentAudio.currentTime = percent * currentAudio.duration;
        }
    });
}

// AUTH MODAL LOGIC
function showAuthModal(tab) {
    document.getElementById('auth-modal-overlay').style.display = 'block';
    document.getElementById('auth-modal').style.display = 'block';
    setAuthTab(tab || 'login');
}
function hideAuthModal() {
    document.getElementById('auth-modal-overlay').style.display = 'none';
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('auth-error').textContent = '';
}
function setAuthTab(tab) {
    const loginTab = document.getElementById('auth-tab-login');
    const signupTab = document.getElementById('auth-tab-signup');
    const loginForm = document.getElementById('auth-form-login');
    const signupForm = document.getElementById('auth-form-signup');
    if (tab === 'login') {
        loginTab.style.color = '#fff';
        signupTab.style.color = '#b3b3b3';
        loginForm.style.display = '';
        signupForm.style.display = 'none';
    } else {
        loginTab.style.color = '#b3b3b3';
        signupTab.style.color = '#fff';
        loginForm.style.display = 'none';
        signupForm.style.display = '';
    }
}
function setLoggedIn(username) {
    localStorage.setItem('echofy-username', username);
    updateAuthHeader();
    hideAuthModal();
}
function setLoggedOut() {
    localStorage.removeItem('echofy-username');
    updateAuthHeader();
}
function updateAuthHeader() {
    const headerBtns = document.querySelector('.header .buttons');
    if (!headerBtns) return;
    headerBtns.innerHTML = '';
    const username = localStorage.getItem('echofy-username');
    if (username) {
        const userSpan = document.createElement('span');
        userSpan.textContent = username;
        userSpan.style.marginRight = '16px';
        userSpan.style.fontWeight = '600';
        userSpan.style.color = 'var(--accent)';
        headerBtns.appendChild(userSpan);
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.addEventListener('click', setLoggedOut);
        headerBtns.appendChild(logoutBtn);
    } else {
        const signupBtn = document.createElement('button');
        signupBtn.textContent = 'Signup';
        signupBtn.addEventListener('click', function() { showAuthModal('signup'); });
        const loginBtn = document.createElement('button');
        loginBtn.textContent = 'Login';
        loginBtn.addEventListener('click', function() { showAuthModal('login'); });
        headerBtns.appendChild(signupBtn);
        headerBtns.appendChild(loginBtn);
    }
}
// Modal event listeners
window.addEventListener('DOMContentLoaded', function() {
    updateAuthHeader();
    document.getElementById('auth-modal-close').onclick = hideAuthModal;
    document.getElementById('auth-modal-overlay').onclick = hideAuthModal;
    document.getElementById('auth-tab-login').onclick = function() { setAuthTab('login'); };
    document.getElementById('auth-tab-signup').onclick = function() { setAuthTab('signup'); };
    document.getElementById('auth-form-login').onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        if (!username || !password) {
            document.getElementById('auth-error').textContent = 'Please enter username and password.';
            return;
        }
        // For demo: accept any username/password
        setLoggedIn(username);
    };
    document.getElementById('auth-form-signup').onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value;
        if (!username || !password) {
            document.getElementById('auth-error').textContent = 'Please enter username and password.';
            return;
        }
        // For demo: accept any username/password
        setLoggedIn(username);
    };
});