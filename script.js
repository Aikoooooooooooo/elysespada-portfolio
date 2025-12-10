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

/* ===== Fonction drag ===== */
function enableDrag(el) {
    let isDragging = false, offsetX = 0, offsetY = 0;
    const parent = el.closest('.window');

    el.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - parent.offsetLeft;
        offsetY = e.clientY - parent.offsetTop;
        parent.style.position = 'absolute';
        parent.style.zIndex = 1000;
        el.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        const maxX = window.innerWidth - parent.offsetWidth;
        const maxY = window.innerHeight - parent.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        parent.style.left = x + 'px';
        parent.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            el.style.cursor = 'grab';
            parent.style.zIndex = '';
        }
    });
}

/* ===== Fonction pour rendre une fenêtre manipulable ===== */
function makeWindow(windowEl) {
    const closeBtn = windowEl.querySelector('.close-btn');
    const titleBar = windowEl.querySelector('.window-titlebar');

    if (closeBtn) closeBtn.addEventListener('click', () => windowEl.style.display = 'none');
    if (titleBar) enableDrag(titleBar);
}

/* ===== Fenêtres principales ===== */
['about-window', 'portfolio-window', 'contact-window'].forEach(id => {
    const folderId = id.replace('-window','') + '-folder';
    const folder = document.getElementById(folderId);
    const win = document.getElementById(id);

    if(folder && win){
        folder.addEventListener('click', () => win.style.display = 'block');
        makeWindow(win);
    }
});

/* ===== Notes d'intention ===== */
document.querySelectorAll('.note-btn').forEach(btn => {
    const noteId = btn.dataset.note + '-window';
    const noteWindow = document.getElementById(noteId);
    if(noteWindow){
        btn.addEventListener('click', () => noteWindow.style.display = 'block');
        makeWindow(noteWindow);
    }
});

/* ===== Fonction pour rendre une fenêtre draggable et fermable ===== */
function setupWindow(win) {
    if(!win) return;

    const titleBar = win.querySelector('.window-titlebar');
    const closeBtn = win.querySelector('.close-btn');

    // Fermer la fenêtre
    if(closeBtn) {
        closeBtn.addEventListener('click', () => win.style.display = 'none');
    }

    // Drag via la barre de titre
    if(titleBar) {
        let isDragging = false, offsetX = 0, offsetY = 0;

        titleBar.addEventListener('mousedown', e => {
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            titleBar.style.cursor = 'grabbing';
            win.style.zIndex = 1000; // mettre devant les autres fenêtres
        });

        document.addEventListener('mousemove', e => {
            if(!isDragging) return;
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            // garder la fenêtre dans l'écran
            x = Math.max(0, Math.min(x, window.innerWidth - win.offsetWidth));
            y = Math.max(0, Math.min(y, window.innerHeight - win.offsetHeight));

            win.style.left = x + 'px';
            win.style.top = y + 'px';
        });

        document.addEventListener('mouseup', () => {
            if(isDragging) {
                isDragging = false;
                titleBar.style.cursor = 'grab';
            }
        });
    }
}

const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');

// Play / Pause
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = '❚❚';
    } else {
        audioPlayer.pause();
        playBtn.textContent = '►';
    }
});

// Mettre à jour la barre de progression
audioPlayer.addEventListener('timeupdate', () => {
    progressBar.max = audioPlayer.duration;
    progressBar.value = audioPlayer.currentTime;
});

// Changer la position de lecture
progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = progressBar.value;
});

// Contrôle du volume
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

    // Mobile drag
    win.querySelector('.window-titlebar').addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - win.offsetLeft;
        offsetY = touch.clientY - win.offsetTop;
        win.style.zIndex = 1000;
    });

    win.querySelector('.window-titlebar').addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        win.style.left = touch.clientX - offsetX + 'px';
        win.style.top = touch.clientY - offsetY + 'px';
    });

    win.querySelector('.window-titlebar').addEventListener('touchend', () => {
        isDragging = false;
    });
});


