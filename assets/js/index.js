    // --- Works ---
    const wraps = document.querySelectorAll('.video-wrap');
    const allVideos = document.querySelectorAll('video');
    const isHoverDevice = window.matchMedia('(hover: hover)').matches;

    wraps.forEach(wrap => {
        const video = wrap.querySelector('video');
        const thumb = wrap.querySelector('.thumbnail');
        const btn = wrap.querySelector('.play-btn');

        if (isHoverDevice) {
            wrap.addEventListener('mouseenter', () => {
                video.currentTime = 0;
                video.muted = true;
                video.play();
                wrap.classList.add('is-playing');
                thumb.classList.add('is-hidden');
                btn.classList.add('is-hidden');
            });
            wrap.addEventListener('mouseleave', () => {
                video.pause();
                wrap.classList.remove('is-playing');
                thumb.classList.remove('is-hidden');
                btn.classList.remove('is-hidden');
            });
        }

        wrap.addEventListener('click', () => {
            allVideos.forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.currentTime = 0;
                    v.parentElement.querySelector('.thumbnail')?.classList.remove('is-hidden');
                    v.parentElement.querySelector('.play-btn')?.classList.remove('is-hidden');
                }
            });

            if (video.paused) {
                video.play();
                thumb.classList.add('is-hidden');
                btn.classList.add('is-hidden');
            } else {
                video.pause();
                video.currentTime = 0;
                thumb.classList.remove('is-hidden');
                btn.classList.remove('is-hidden');
            }
        });

        video.addEventListener('ended', () => {
            thumb.classList.remove('is-hidden');
            btn.classList.remove('is-hidden');
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const videos = document.querySelectorAll('.video-wrap video');

        videos.forEach(video => {
            let playPromise;

            // マウスが乗った時
            video.parentElement.addEventListener('mouseenter', () => {
                // 再生を実行し、戻り値（Promise）を保存しておく
                playPromise = video.play();
            });

            // マウスが離れた時
            video.parentElement.addEventListener('mouseleave', () => {
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // 再生が正常に開始された後であれば、安全に一時停止できる
                        video.pause();
                    }).catch(error => {
                        // 再生が開始される前に停止しようとしてエラーになっても、
                        // ここでキャッチすればコンソールに赤いエラーは出ない
                        console.log("再生割り込みを防止しました");
                    });
                }
            });
        });
    });