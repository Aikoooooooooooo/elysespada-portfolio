/* ===================== ROTATION LOGO ===================== */
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


/* ===================== DRAG & DROP (PC + MOBILE) ===================== */
function makeDraggable(win) {
    const titleBar = win.querySelector('.window-titlebar');
    if (!titleBar) return;

    let isDragging = false;
    let offsetX = 0, offsetY = 0;

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

        // Limites pour rester dans l'écran
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

    // MOBILE
    titleBar.addEventListener('touchstart', e => {
        e.preventDefault(); // empêche le scroll
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


/* ===================== FENÊTRES ===================== */
// Rendre toutes les fenêtres draggable + fermer avec bouton
document.querySelectorAll('.window').forEach(win => {
    makeDraggable(win);

    const closeBtn = win.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => win.style.display = 'none');
    }
});


/* ===================== OUVRIR FENÊTRES ===================== */
// via dossier
['about-folder', 'portfolio-folder', 'contact-folder', 'moi-folder', 'musique-folder', 'chat-folder', 'poubelle-folder'].forEach(folderId => {
    const folder = document.getElementById(folderId);
    if (!folder) return;

    // correspondance avec la fenêtre
    const winId = folderId.replace('-folder','-window');
    const win = document.getElementById(winId);
    if (!win) return;

    folder.addEventListener('click', () => {
        win.style.display = 'block';
    });
});

// via boutons (notes d’intention)
document.querySelectorAll('.note-btn').forEach(btn => {
    const noteId = btn.dataset.note + '-window';
    const noteWindow = document.getElementById(noteId);
    if (!noteWindow) return;

    btn.addEventListener('click', () => {
        noteWindow.style.display = 'block';
        makeDraggable(noteWindow); // s'assurer que c'est draggable
    });
});


/* ===================== LECTEUR AUDIO ===================== */
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const pauseBtn = document.getElementById('pause-btn');
const volumeSlider = document.getElementById('volume-slider');

if (audioPlayer) {
    if (playBtn) playBtn.addEventListener('click', () => audioPlayer.play());
    if (pauseBtn) pauseBtn.addEventListener('click', () => audioPlayer.pause());
    if (stopBtn) stopBtn.addEventListener('click', () => { audioPlayer.pause(); audioPlayer.currentTime = 0; });
    if (volumeSlider) volumeSlider.addEventListener('input', e => audioPlayer.volume = e.target.value);
}
