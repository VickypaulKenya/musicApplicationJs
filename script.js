const allMusic = [
    {
        artist: "Eko_Dydda",
        name: "Vidole",
        src: "songs/Eko_Dydda_-_VIDOLE__Official_Music_Video_(128k).mp3",
        img: "Thumbnails/dydda.jpeg"
    },
    {
        artist: "Carol Gift",
        name: "Chonga gi loo",
        src: "songs/CHONGA_GI_LOO..By_Carol_Gift(128k).mp3",
        img: "Thumbnails/carol.jpeg"
    },
    {
        artist: "Liam Pyne Ft Quavo",
        name: "Strip That Down",
        src: "county song/Liam Payne - Strip That Down (Official Video) ft. Quavo.mp3",
        img: "Thumbnails/Lyam ft quavo.jpeg"
    },
    {
        artist: "Akon",
        name: "Body on me",
        src: "county song/Akon ft Ashanti Body on me.mp3",
        img: "Thumbnails/akon.jpeg"
    },
    {
        artist: "Ed-Sheeran",
        name: "Photograph",
        src: "county song/Ed Sheeran - Photograph (Official Music Video).mp3",
        img: "Thumbnails/Ed Sheeran.jpeg"
    },
    {
        artist: "Ed-Sheeran",
        name: "I dont care",
        src: "county song/I Dont Care - Ed Sheeran & Justin Bieber (Acoustic Cover).mp3",
        img: "Thumbnails/ed.jpeg"
    },
    {
        artist: "Darius Rucker",
        name: "Alright",
        src: "county song/Darius Rucker - Alright (Eugeen Remix).mp3",
        img: "Thumbnails/Darius.jpeg"
    },
    {
        artist: "Brown Sugar ft LiL Wayne",
        name: "Single",
        src: "songs/Brown Sugar (feat. Lil Wayne) - Single.mp3",
        img: "Thumbnails/brown sugar.jpeg"
    }
];

const wrapper = document.querySelector(".wrapper");
const musicImg = document.querySelector(".img-box");
const    musicName = document.querySelector(".song-details .name");
const    musicArtist = document.querySelector(".song-details .artist");
const    mainAudio = document.querySelector("#main-audio");
const    playPauseBtn = document.querySelector(".play-pause");
const    allMusics = document.querySelector("#all-songs");
const    musicList = document.querySelector(".music-list");
const    allSongs = document.querySelector(".allSongs");
const    close = document.querySelector("#close");
const    prevBtn = document.querySelector("#prev");
const    nextBtn = document.querySelector("#next");
const    progressArea = document.querySelector(".progress-area");
const    progressBar = document.querySelector(".progress-bar");

let musicIndex = 0;
let isPlaying = false;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    createMusicList();
});

function loadMusic(indexNumb) {
    if (!allMusic[indexNumb]) return;
    const music = allMusic[indexNumb];
    musicName.textContent = music.name;
    musicImg.src = music.img;
    musicArtist.textContent = music.artist;
    mainAudio.src = music.src;

}

function playMusic() {
    mainAudio.play();
    playPauseBtn.src = "controls/pause.png";
    isPlaying = true;
}

function pauseMusic() {
    mainAudio.pause();
    playPauseBtn.src = "controls/play.png";
    isPlaying = false;
}

playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

function createMusicList() {
    allSongs.innerHTML = "";
    allMusic.forEach((music, index) => {
        let newLi = document.createElement("li");
        newLi.innerHTML = `
            <div class="row" data-index="${index}">
                <img src="${music.img}" alt="${music.name}"/>
                <span>${music.artist}</span>
                <p>${music.name}</p>
            </div>
        `;
        newLi.addEventListener("click", () => {
            musicIndex = index;
            loadMusic(musicIndex);
            playMusic();
        });
        allSongs.appendChild(newLi);
    });
}

allMusics.addEventListener("click", () => {
    musicList.classList.toggle("music-list-show");
});

close.addEventListener("click", () => {
    musicList.classList.toggle("music-list-show");
});

function nextMusic() {
    musicIndex = (musicIndex + 1) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
}

nextBtn.addEventListener("click", () => {
    nextMusic();
});

function prevMusic() {
    musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length;
    loadMusic(musicIndex);
    playMusic();
}

prevBtn.addEventListener("click", () => {
    prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let musicCurrentTime = wrapper.querySelector(".current");
    let musicDuration = wrapper.querySelector(".duration");
       
    let progressWidth = (currentTime / duration);
    progressBar.style.width = `${progressWidth*100}%`;
    
    mainAudio.addEventListener("loadeddata", () => {
        ///update---- duration----//

        let audioDuration = mainAudio.duration;
        let totalHors = Math.floor(audioDuration / 3600);
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        let tm = totalMin < 10 ? "0" + totalMin : totalMin;
        let ts = totalSec < 10 ? "0" + totalSec : totalSec;
        let th = totalHors < 10 ? "0" + totalHors : totalHors;
        musicDuration.innerHTML = th + ":" + tm + ":" + ts;
    });
      
      ///------ calculate currentTime'------///
      let currentHrs = Math.floor(currentTime / 3600);
      let currentMin = Math.floor(currentTime / 60)
      let currentSec = Math.floor(currentTime % 60)
      let tmin = currentMin < 10 ? "0" + currentMin : currentMin;
      let tsec = currentSec < 10 ? "0" + currentSec : currentSec;
      let thrs = currentHrs < 10 ? "0" + currentHrs : currentHrs;
      musicCurrentTime.innerHTML = thrs + ":" + tmin + ":" + tsec;
});


progressArea.addEventListener("click", (e) => {
    let progressWidthValue = progressArea.clientWidth;
    let clickedProgressPosition = e.offsetX;
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedProgressPosition / progressWidthValue) * songDuration;
    playMusic();
});

mainAudio.addEventListener("ended", () => {
    nextMusic();
});
