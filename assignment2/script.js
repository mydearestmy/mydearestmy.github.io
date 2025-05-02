
document.addEventListener('DOMContentLoaded', function() {
     const audioPlayer = document.getElementById('audioPlayer');
    const playlist = document.querySelectorAll('#playlist');
     const musicName = document.getElementById('music-name');
     let currentTrack = 0;
    
     function loadTrack(index) {
   audioPlayer.src = playlist[index].getAttribute('data-src');
     musicName.textContent = playlist[index].textContent;
     audioPlayer.play();
     updatePlayPauseIcon();
     }
    
     function updatePlayPauseIcon() {
    const playPauseImg = document.getElementById('play-pause-img');
     if (audioPlayer.paused) {
     playPauseImg.src = 'icons8-play-40.png';
     playPauseImg.alt = 'Play Button';
    } else {
     playPauseImg.src = 'icons8-pause-40.png';
    playPauseImg.alt = 'Pause Button';
     }
     }
    
     document.getElementById('play-pause-btn').addEventListener('click', function() {
     if (audioPlayer.paused) {
     audioPlayer.play();
     } else {
    audioPlayer.pause();
     }
     updatePlayPauseIcon();
     });
    
    document.getElementById('pause').addEventListener('click', function() {
     audioPlayer.pause();
     updatePlayPauseIcon();
    });
    