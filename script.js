<script>
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

    el.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        el.style.position = 'absolute';
        el.style.zIndex = 1000;
        el.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;

        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        const parent = el.parentElement;
        const maxX = parent.offsetWidth - el.offsetWidth;
        const maxY = parent.offsetHeight - el.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        el.style.left = x + 'px';
        el.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            el.style.cursor = 'grab';
            el.style.zIndex = '';
        }
    });
}

/* ===== Fenêtres principales ===== */
function makeWindow(folderId, windowId) {
    const folder = document.getElementById(folderId);
    const windowEl = document.getElementById(windowId);
    const closeBtn = windowEl.querySelector('.close-btn');
    const titleBar = windowEl.querySelector('.window-titlebar');

    folder.addEventListener('click', () => windowEl.style.display = 'block');
    closeBtn.addEventListener('click', () => windowEl.style.display = 'none');

    enableDrag(titleBar); // drag seulement via la barre de titre
}

/* Création des fenêtres */
makeWindow('about-folder', 'about-window');
makeWindow('portfolio-folder', 'portfolio-window');
makeWindow('contact-folder', 'contact-window');

/* ===== Notes d'intention ===== */
document.querySelectorAll('.note-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const noteWindow = document.getElementById(btn.dataset.note + '-window');
        if(noteWindow) noteWindow.style.display = 'block';
    });
});

document.querySelectorAll('.note-window .close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.note-window').style.display = 'none';
    });
});

</script>
