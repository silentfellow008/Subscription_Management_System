document.addEventListener("DOMContentLoaded", () => {
    const passwordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])(?=\S{8,}).*$/;

    function validatePassword(password) {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[^A-Za-z0-9\s]/.test(password),
            valid: passwordPattern.test(password)
        };
    }

    // Registration page
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        const passwordInput =
            document.getElementById("register-password");

        const confirmInput =
            document.getElementById("confirm-password");

        const message =
            document.getElementById("password-message");

        const matchMessage =
            document.getElementById("confirm-password-message");

        function updatePasswordFeedback() {
            const result = validatePassword(passwordInput.value);

            if (message) {
                const requirements = [
                    [result.length, "At least 8 characters"],
                    [result.uppercase, "At least one uppercase letter"],
                    [result.number, "At least one number"],
                    [result.special, "At least one special character"]
                ];

                message.innerHTML = requirements.map(([passed, text]) =>
                    `<li class="${passed ? "requirement-met" : ""}">
                        ${passed ? "✓" : "○"} ${text}
                    </li>`
                ).join("");
            }

            updateConfirmFeedback();
        }

        function updateConfirmFeedback() {
            if (!matchMessage) return;

            if (!confirmInput.value) {
                matchMessage.textContent = "";
                return;
            }

            if (passwordInput.value === confirmInput.value) {
                matchMessage.textContent = "Passwords match.";
                matchMessage.className = "validation-success";
            } else {
                matchMessage.textContent = "Passwords do not match.";
                matchMessage.className = "validation-error";
            }
        }

        passwordInput.addEventListener("input", updatePasswordFeedback);
        confirmInput.addEventListener("input", updateConfirmFeedback);

        registerForm.addEventListener("submit", (event) => {
            const result = validatePassword(passwordInput.value);

            if (!result.valid) {
                event.preventDefault();
                passwordInput.setCustomValidity(
                    "Your password does not meet all the requirements."
                );
                passwordInput.reportValidity();
                return;
            }

            passwordInput.setCustomValidity("");

            if (passwordInput.value !== confirmInput.value) {
                event.preventDefault();
                confirmInput.setCustomValidity(
                    "The passwords do not match."
                );
                confirmInput.reportValidity();
                return;
            }

            confirmInput.setCustomValidity("");

            // The form is valid, but account creation still requires
            // the Django backend to be connected.
        });

        passwordInput.addEventListener("input", () => {
            passwordInput.setCustomValidity("");
        });

        confirmInput.addEventListener("input", () => {
            confirmInput.setCustomValidity("");
        });

        updatePasswordFeedback();
    }

    // Password-reset page, if it contains a new-password form.
    const resetForm = document.getElementById("new-password-form");

    if (resetForm) {
        const passwordInput =
            document.getElementById("new-password");

        const confirmInput =
            document.getElementById("confirm-new-password");

        resetForm.addEventListener("submit", (event) => {
            if (!passwordInput || !confirmInput) return;

            const result = validatePassword(passwordInput.value);

            if (!result.valid) {
                event.preventDefault();
                passwordInput.setCustomValidity(
                    "Your password does not meet all the requirements."
                );
                passwordInput.reportValidity();
                return;
            }

            passwordInput.setCustomValidity("");

            if (passwordInput.value !== confirmInput.value) {
                event.preventDefault();
                confirmInput.setCustomValidity(
                    "The passwords do not match."
                );
                confirmInput.reportValidity();
                return;
            }

            confirmInput.setCustomValidity("");
        });

        const resetPasswordInput =
            document.getElementById("new-password");

        const resetConfirmInput =
            document.getElementById("confirm-new-password");

        if (resetPasswordInput) {
            resetPasswordInput.addEventListener("input", () => {
                resetPasswordInput.setCustomValidity("");
            });
        }

        if (resetConfirmInput) {
            resetConfirmInput.addEventListener("input", () => {
                resetConfirmInput.setCustomValidity("");
            });
        }
    }
});