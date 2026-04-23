//全ての.video-wrapを取得する
const wraps = document.querySelectorAll('.video-wrap');
const isHoverDevice = window.matchMedia('(hover: hover)').matches;

const options = {
    root: null,
    rootMargin: "-10px 0px",
    threshold: 0
}

const observer = new IntersectionObserver ((entries) => {
    entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        const thumb = entry.target.querySelector('.thumbnail');

        if (!entry.isIntersecting) {
            video.pause();
            video.currentTime = 0;
            thumb.classList.remove('is-hidden');
        }
    });
}, options);


//wrapsに対してforEachを使い、個別のwrapを取り出す
wraps.forEach(wrap => {

    //あらかじめ、このwrapの中にあるパーツを特定しておく
    const thumb = wrap.querySelector('.thumbnail');
    const video = wrap.querySelector('video');

    observer.observe(wrap);

    //取り出した「個別のwrap」にEventListenerを登録する
    if (isHoverDevice) {
        
        wrap.addEventListener('mouseenter', () => {
            // 今触っているwrapのthumbだけにクラスをつける
            thumb.classList.add('is-hidden');
            video.play();
        });

        wrap.addEventListener('mouseleave', () => {
            // 離れたら戻す
            thumb.classList.pause()
            thumb.classList.remove('is-hidden');
        });
        
    }
    wrap.addEventListener('click', () => {
        if (video.paused) {
            // 止まってたら再生
            video.play();
            // クリックで再生したときもサムネは隠す
            thumb.classList.add('is-hidden');
        }else {
            // 動いたら停止
            video.pause();
            video.currentTime = 0; //巻き戻し
            thumb.classList.remove('is-hidden');
        }
    });
});
