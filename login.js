console.log("LOGIN JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM READY");

    const loginForm = document.getElementById("login-form");

    if (!loginForm) {
        console.error("LOGIN FORM NOT FOUND");
        return;
    }

    console.log("LOGIN FORM FOUND");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("SIGN IN BUTTON CLICKED");

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            const data = await apiRequest("/api/auth/login/", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            sessionStorage.setItem("access", data.access);
            sessionStorage.setItem("refresh", data.refresh);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "ADMIN") {
                window.location.href = "admin.html";
            } else if (data.user.role === "STAFF") {
                window.location.href = "staff.html";
            } else {
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
