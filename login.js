
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            const data = await apiRequest("/api/auth/login/", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            if (!data.access) {
                throw new Error("Access token not received.");
            }

            sessionStorage.setItem("access", data.access);

            window.location.href = "customer.html";

        } catch (error) {
            console.error("Login failed:", error);
            alert(error.detail || error.message || "Login failed. Try again.");
        }
    });
});
