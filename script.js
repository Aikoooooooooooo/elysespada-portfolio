/* ===== Rotation du logo ===== */
const logo = document.getElementById('logo');
const maxAngle = 15;

document.addEventListener('mousemove', e => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    logo.style.transform = `translate(-50%, -50%) rotateX(${-dy/centerY*maxAngle}deg) rotateY(${dx/centerX*maxAngle}deg)`;
});

document.addEventListener('mouseleave', () => {
    logo.style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)';
});

/* ===== Drag & Drop PC + Mobile ===== */
function makeDraggable(win) {
    const titleBar = win.querySelector('.window-titlebar');
    if (!titleBar) return;

    let isDragging = false, offsetX = 0, offsetY = 0;

    const startDrag = (x, y) => {
        isDragging = true;
        offsetX = x - win.offsetLeft;
        offsetY = y - win.offsetTop;
        win.style.zIndex = 1000;
        titleBar.style.cursor = 'grabbing';
    };

    const drag = (x, y) => {
        if (!isDragging) return;
        let left = x - offsetX;
        let top = y - offsetY;

        left = Math.max(0, Math.min(left, window.innerWidth - win.offsetWidth));
        top = Math.max(0, Math.min(top, window.innerHeight - win.offsetHeight));

        win.style.left = left + 'px';
        win.style.top = top + 'px';
    };

    const endDrag = () => {
        isDragging = false;
        titleBar.style.cursor = 'grab';
        win.style.zIndex = '';
    };

    // PC
    titleBar.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    document.addEventListener('mousemove', e => drag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);

    // Mobile
    titleBar.addEventListener('touchstart', e => {
        e.preventDefault();
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    });
    titleBar.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        drag(touch.clientX, touch.clientY);
    });
    titleBar.addEventListener('touchend', endDrag);
}

/* ===== Gestion des fenêtres ===== */
function setupWindow(win) {
    if (!win) return;

    // Drag + ferme
    makeDraggable(win);

    const closeBtn = win.querySelector('.close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => win.style.display = 'none');
}

/* ===== Initialisation des fenêtres ===== */
document.querySelectorAll('.window').forEach(win => setupWindow(win));

/* ===== Ouvrir fenêtres via dossiers ===== */
['about-folder','portfolio-folder','contact-folder','moi-folder','musique-folder','chat-folder','poubelle-folder'].forEach(folderId => {
    const folder = document.getElementById(folderId);
    if(!folder) return;
    const winId = folderId.replace('-folder','-window');
    const win = document.getElementById(winId);
    if(!win) return;

    folder.addEventListener('click', () => win.style.display = 'block');
});

/* ===== Ouvrir fenêtres via boutons ===== */
document.querySelectorAll('.note-btn').forEach(btn => {
    const noteId = btn.dataset.note + '-window';
    const noteWin = document.getElementById(noteId);
    if(!noteWin) return;

    btn.addEventListener('click', () => {
        noteWin.style.display = 'block';
        setupWindow(noteWin); // s'assure que le drag + ferme fonctionne
    });
});

/* ===== Lecteur audio ===== */
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-slider');

if(audioPlayer) {
    if(playBtn) playBtn.addEventListener('click', () => audioPlayer.play());
    if(pauseBtn) pauseBtn.addEventListener('click', () => audioPlayer.pause());
    if(stopBtn) stopBtn.addEventListener('click', () => { audioPlayer.pause(); audioPlayer.currentTime=0; });
    if(progressBar) progressBar.addEventListener('input', () => audioPlayer.currentTime = progressBar.value);
    if(volumeControl) volumeControl.addEventListener('input', e => audioPlayer.volume = e.target.value);

    audioPlayer.addEventListener('timeupdate', () => {
        if(progressBar) {
            progressBar.max = audioPlayer.duration;
            progressBar.value = audioPlayer.currentTime;
        }
    });
}
