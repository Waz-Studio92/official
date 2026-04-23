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