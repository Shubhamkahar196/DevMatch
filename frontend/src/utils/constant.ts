// const BASE_URL = "http://localhost:8000"
// const BASE_URL = "/api";
const BASE_URL = location.hostname === "localhost" ? "http://localhost:8000" : "/api";
export default BASE_URL