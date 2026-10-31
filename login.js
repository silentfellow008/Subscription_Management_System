
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

            // Save JWT tokens
            sessionStorage.setItem("access", data.access);
            sessionStorage.setItem("refresh", data.refresh);

            // Save user details
            sessionStorage.setItem("user", JSON.stringify(data.user));

            // Redirect according to role
            if (data.user.role === "ADMIN") {
                window.location.href = "admin.html";
            } 
            else if (data.user.role === "STAFF") {
                window.location.href = "staff.html";
            } 
            else {
                window.location.href = "customer.html";
            }

        } catch (error) {
            console.error("Login error:", error);

            alert(
                error.email?.[0] ||
                error.password?.[0] ||
                error.detail ||
                error.non_field_errors?.[0] ||
                "Login failed. Please check your credentials."
            );
        }
    });
});
