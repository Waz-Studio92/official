const scrollBtns = document.querySelectorAll('.top-link, .link-btn');

window.addEventListener('scroll', () => {
    scrollBtns.forEach((btn) => {
        if (window.scrollY > 300) {
            btn.classList.add('is-show');
        } else {
            btn.classList.remove('is-show');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const options = {
        root: null,
        rootMargin: "-10% 0px", // 少し画面に入ってから発火させる
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // 一度表示されたら監視を解除（リソース節約）
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // .reveal クラスを持つ要素をすべて監視対象にする
    const targets = document.querySelectorAll(".reveal");
    targets.forEach(target => observer.observe(target));
});


document.addEventListener('DOMContentLoaded', () => {

    const activityLogs = [

        {
            date: "2026.03.24",
            type: "feat",
            msg: "画像を圧縮し再アップロードした"
        },

        {
            date: "2026.03.23",
            type: "feat",
            msg: "ABOUTセクションのスキル構成をアップデート"
        },

        {
            date: "2026.03.20",
            type: "fix",
            msg: "コンタクトフォームのバリデーションを修正"
        },

        {
            date: "2026.03.15",
            type: "work",
            msg: "新作MV『グッバイ宣言』をWORKSに追加"
        },

        {
            date: "2026.02.26",
            type: "sys",
            msg: "公式サイトをNext.jsへ移行開始"
        }

    ];

    // ここを小文字の logContainer で統一
    const logContainer = document.getElementById('log-container');

    if (logContainer) {
        activityLogs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.innerHTML = `
                <span class="log-date">${log.date}</span>
                <span class="log-type type-${log.type}">${log.type}</span>
                <span class="log-msg">${log.msg}</span>
            `;
            logContainer.appendChild(logItem);
        });
    }

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

    // --- Contact ---
    const form = document.querySelector("form");
    // HTMLに合わせて user_email から email に統一
    const emailInput = form ? form.querySelector('input[name="email"]') : null;

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (form && emailInput) {
        form.addEventListener("submit", function (e) {
            let hasError = false;
            const inputs = form.querySelectorAll("input, select");

            inputs.forEach(input => {
                const field = input.closest(".field");
                if (!field) return;
                const error = field.querySelector(".error-message");
                if (!error) return;

                if (!input.value.trim()) {
                    error.classList.add("active");
                    input.classList.add("error");
                    hasError = true;
                } else {
                    const sibling = (input.name === 'family-name') ? field.querySelector('input[name="first-name"]') :
                        (input.name === 'first-name') ? field.querySelector('input[name="family-name"]') : null;

                    if (!sibling || sibling.value.trim()) {
                        error.classList.remove("active");
                    }
                    input.classList.remove("error");
                }
            });

            if (emailInput.value && !isValidEmail(emailInput.value)) {
                const error = emailInput.closest(".field").querySelector(".error-message");
                error.textContent = "正しいメールアドレスを入力してください";
                error.classList.add("active");
                emailInput.classList.add("error");
                hasError = true;
            }

            if (hasError) {
                e.preventDefault();
            }
        });

        emailInput.addEventListener("input", () => {
            const field = emailInput.closest(".field");
            if (!field) return;
            const error = field.querySelector(".error-message");
            if (!error) return;

            if (!emailInput.value.trim()) {
                error.textContent = "入力してください";
                error.classList.add("active");
                emailInput.classList.add("error");
            } else if (!isValidEmail(emailInput.value)) {
                error.textContent = "メール形式が正しくありません";
                error.classList.add("active");
                emailInput.classList.add("error");
            } else {
                error.textContent = "";
                error.classList.remove("active");
                emailInput.classList.remove("error");
            }
        });
    }
});