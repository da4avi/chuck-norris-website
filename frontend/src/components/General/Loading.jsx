import "./styles/loading.css";
import loading from "/public/loading.webp";

export default function Loading({ allPage }) {
  const loadingStyle = allPage === true ? { height: "100vh" } : {};

  return (
    <div className="loading-full-page-container" style={loadingStyle}>
      <img
        src={loading}
        className="loading-full-page"
        width={40}
        height="auto"
        alt="Loading..."
      />
    </div>
  );
}
