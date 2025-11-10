<script>
    /* ===== Rotation du logo ===== */
    const logo = document.getElementById('logo');
    const maxAngle = 15;
    document.addEventListener('mousemove', e => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const rotateY = (dx / centerX) * maxAngle;
        const rotateX = (-dy / centerY) * maxAngle;
        logo.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    document.addEventListener('mouseleave', () => {
        logo.style.transform = `translate(-50%, -50%) rotateX(0deg) rotateY(0deg)`;
    });

    /* ===== Fonction fenêtres principales ===== */
    function makeWindow(folderId, windowId) {
        const folder = document.getElementById(folderId);
        const windowEl = document.getElementById(windowId);
        const closeBtn = windowEl.querySelector('.close-btn');
        const titleBar = windowEl.querySelector('.window-titlebar');

        // ouverture
        folder.addEventListener('click', () => windowEl.style.display = 'block');

        // fermeture
        closeBtn.addEventListener('click', () => windowEl.style.display = 'none');

        // drag
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        titleBar.addEventListener('mousedown', e => {
            isDragging = true;
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            titleBar.style.cursor = 'grabbing';
        });
        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            windowEl.style.left = x + 'px';
            windowEl.style.top = y + 'px';
        });
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                titleBar.style.cursor = 'grab';
            }
        });
    }

    makeWindow('about-folder', 'about-window');
    makeWindow('portfolio-folder', 'portfolio-window');
    makeWindow('contact-folder', 'contact-window');

    /* ===== Fenêtres Notes d'intention ===== */
    document.querySelectorAll('.note-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const noteId = btn.dataset.note + '-window';
            const noteWindow = document.getElementById(noteId);
            if (noteWindow) noteWindow.style.display = 'block';
        });
    });

    // fermer les notes
    document.querySelectorAll('.note-window .close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.note-window').style.display = 'none';
        });
    });
</script>
