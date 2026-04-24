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

const targets = document.querySelectorAll("#hero,#home,#about,#works,#service,#price,#qa,#contact")
    {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-active");
                } else {
                    entry.target.classList.remove("is-active");
                }
            });
        }, {
            threshold: .2
        });
        
        // .reveal クラスを持つ要素をすべて監視対象にする
        targets.forEach(t => {
            observer.observe(t)
        });
    }