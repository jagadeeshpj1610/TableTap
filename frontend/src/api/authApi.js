const defaultApi = import.meta.env.VITE_API_URL;

const login = async (role, password) => {
    const response = await fetch(`${defaultApi}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, password })
    })
    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || "Login failed")
    }
    return response.json()
}

export { login }