const getApiUrl = () => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:8080";
    return url.replace(/\/$/, ""); // Strip any trailing slashes to prevent 404 double-slash errors
};

const config = {
    apiUrl: getApiUrl(),
};

export default config;