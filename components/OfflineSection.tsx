'use client'

export default function OfflineSection() {
  const handleDownload = () => {
    // Implement offline data download logic
    console.log('Downloading forecast data...')
  }

  return (
    <div className="offline-section">
      <h2><i className="fas fa-cloud-download-alt"></i> Offline Access</h2>
      <button className="download-btn" onClick={handleDownload}>
        <i className="fas fa-download"></i>
        Download Forecast Data
      </button>
      <div className="status">
        <div className="status-dot"></div>
        <span>Last updated: 5 min ago</span>
      </div>
    </div>
  )
}