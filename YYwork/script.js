// 导航功能
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // 更新按钮状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 更新部分显示
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // 视频播放器功能
    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playButton = container.querySelector('.center-play-button');
        const progressBar = container.querySelector('.progress-bar');
        const progressContainer = container.querySelector('.progress-container');
        const volumeControl = container.querySelector('.volume-control');
        const volumeSlider = container.querySelector('.volume-slider');
        const volumeLevel = container.querySelector('.volume-level');
        const volumeIcon = container.querySelector('.volume-icon');
        const timeDisplay = container.querySelector('.time-display');
        const fullscreenButton = container.querySelector('.fullscreen');
        const controls = container.querySelector('.video-controls');

        // 播放/暂停
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.style.display = 'none';
                controls.classList.add('active');
            } else {
                video.pause();
                playButton.style.display = 'flex';
                controls.classList.remove('active');
            }
        });

        // 双击全屏
        container.addEventListener('dblclick', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                container.requestFullscreen();
            }
        });

        // 进度条更新
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // 更新时间显示
            const currentMinutes = Math.floor(video.currentTime / 60);
            const currentSeconds = Math.floor(video.currentTime % 60);
            const totalMinutes = Math.floor(video.duration / 60);
            const totalSeconds = Math.floor(video.duration % 60);
            
            timeDisplay.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')} / ${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
        });

        // 点击进度条跳转
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        // 音量控制
        volumeControl.addEventListener('mouseenter', () => {
            volumeSlider.style.width = '60px';
        });

        volumeControl.addEventListener('mouseleave', () => {
            if (!volumeControl.matches(':hover')) {
                volumeSlider.style.width = '0';
            }
        });

        volumeSlider.addEventListener('click', (e) => {
            const rect = volumeSlider.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.volume = pos;
            volumeLevel.style.width = `${pos * 100}%`;
        });

        volumeIcon.addEventListener('click', () => {
            if (video.volume > 0) {
                video.volume = 0;
                volumeLevel.style.width = '0';
            } else {
                video.volume = 1;
                volumeLevel.style.width = '100%';
            }
        });

        // 全屏按钮
        fullscreenButton.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                container.requestFullscreen();
            }
        });

        // 视频结束时显示播放按钮
        video.addEventListener('ended', () => {
            playButton.style.display = 'flex';
            controls.classList.remove('active');
        });

        // 鼠标移动时显示/隐藏控制栏
        let controlsTimeout;
        container.addEventListener('mousemove', () => {
            controls.classList.add('active');
            clearTimeout(controlsTimeout);
            controlsTimeout = setTimeout(() => {
                if (!video.paused) {
                    controls.classList.remove('active');
                }
            }, 3000);
        });
    });
}); 