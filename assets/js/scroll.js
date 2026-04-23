const scrollBtns = document.querySelectorAll(".top-link, .link-btn");

window.addEventListener('scroll', () => {
    scrollBtns.forEach((btn) => {
        if (window.scrollY > 300) {
            btn.classList.add('is-show');
        } else {
            btn.classList.remove('is-show');
        }
    });
});

const options={
    threshold:0
};

document.addEventListener("DOMContentLoaded", () => {
    const options = {
        root: null,
        rootMargin: "-10% 0px", // 少し画面に入ってから発火させる
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // 一度表示されたら監視を解除（リソース節約）
                observer.unobserve(entry.target);
            }else {
                entry.target.classList.remove("active");
            }
        });
    }, options);

    // .reveal クラスを持つ要素をすべて監視対象にする
    const targets = document.querySelectorAll(".reveal");
    targets.forEach(target => observer.observe(target));
});