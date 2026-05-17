export default async function handler(req, res) {
  try {
    // We fetch the backend URL from the environment, defaulting to the usual local port if not set.
    // Ensure you have set VITE_API_URL in your Vercel project settings to your actual backend URL.
    const backendUrl = process.env.VITE_API_URL || "http://localhost:8080";
    
    // Ping the backend root URL which returns a simple 200 OK string ("N1Solution Backend API is running gracefully!")
    const response = await fetch(backendUrl);
    
    if (response.ok) {
      res.status(200).json({ status: "success", message: "Backend pinged successfully", url: backendUrl });
    } else {
      res.status(response.status).json({ status: "error", message: `Backend responded with status: ${response.status}` });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
