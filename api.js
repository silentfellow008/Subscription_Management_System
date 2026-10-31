const API_BASE_URL = "http://192.168.1.101:8000"

async function apiRequest(endpoint, options = {}) {
    const token = sessionStorage.getItem("access");

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
    };

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        { ...options, headers }
    );

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}