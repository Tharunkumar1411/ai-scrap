import { useState } from 'react'
import './App.css'
import Table from './component/Table'
import { BASE_URL } from './utils/constant'

function App() {
  const [inputText, setInputText] = useState('')
  const [submittedText, setSubmittedText] = useState('')
  const [scrapedData, setScrapedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    topic: '',
    searchTerm: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmittedText(inputText)
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${BASE_URL}/api/scrape?url=${inputText}`, {
        method: 'GET',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const data = await response.json()
      setScrapedData(data?.structured)
    } catch (error) {
      console.error('Error fetching scraped data:', error)
      setError('Failed to fetch data. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }
    setInputText('')
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const filteredKeyPoints = scrapedData?.key_points?.filter(point => {
    const matchesTopic = !filters.topic || 
      scrapedData.topics?.some(topic => 
        topic.toLowerCase()?.includes(filters.topic?.toLowerCase())
      )
    
    const matchesSearch = !filters.searchTerm || 
      point.toLowerCase()?.includes(filters.searchTerm?.toLowerCase()) ||
      (scrapedData.summary_for_keypoint[point] && 
       scrapedData.summary_for_keypoint[point]?.toLowerCase()?.includes(filters.searchTerm?.toLowerCase()))
    
    return matchesTopic && matchesSearch
  }) || []

  const clearFilters = () => {
    setFilters({ topic: '', searchTerm: '' })
  }

  const clearData = () => {
    setScrapedData(null)
    setSubmittedText('')
    setError('')
  }

  return (
    <>
      <h1>Web Scraper Dashboard</h1>
      
      {/* URL Input Form */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter website URL to scrape..."
            required
            style={{ 
              padding: '8px 12px', 
              marginRight: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minWidth: '300px'
            }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Scraping...' : 'Scrape URL'}
          </button>
        </form>

        {loading && (
          <p style={{ marginTop: '16px', color: '#666' }}>
            Scraping data, It will take 2 to 3 minutes. please wait...
          </p>
        )}
        
        {submittedText && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Scraped URL: <strong>{submittedText}</strong>
          </p>
        )}
        
        {error && (
          <p style={{ marginTop: '16px', color: 'red' }}>
            Error: {error}
          </p>
        )}
      </div>

      {/* Data Display Section */}
      {scrapedData && (
        <div className="card" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Scraped Content Analysis</h2>
            <button onClick={clearData} style={{ padding: '6px 12px', fontSize: '12px' }}>
              Clear Data
            </button>
          </div>

          {/* Summary Section */}
          <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>{scrapedData.title}</h3>
            <p style={{ margin: '0 0 12px 0', lineHeight: '1.5', color:"#000" }}>{scrapedData.summary}</p>
            
            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666' }}>
              <span><strong>Reading Time:</strong> {scrapedData.reading_time_minutes} min</span>
              <span><strong>Topics:</strong> {scrapedData.topics?.join(', ')}</span>
              <span><strong>Timestamp:</strong> {new Date(scrapedData.timestamp)?.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Filter Section */}
          <div style={{ marginBottom: '20px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Filters</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Topic:</label>
                <select 
                  value={filters.topic}
                  onChange={(e) => handleFilterChange('topic', e.target.value)}
                  style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">All Topics</option>
                  {scrapedData.topics?.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Search:</label>
                <input
                  type="text"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  placeholder="Search key points..."
                  style={{ padding: '6px', color:"#fff", borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
                />
              </div>
              
              <button 
                onClick={clearFilters}
                style={{ padding: '6px 12px', fontSize: '12px', marginTop: '16px' }}
              >
                Clear Filters
              </button>
            </div>
            
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              Showing {filteredKeyPoints?.length} of {scrapedData.key_points?.length} key points
            </div>
          </div>

          {/* Key Points Table */}
         <Table scrapedData={scrapedData} filteredKeyPoints={filteredKeyPoints} />

          {/* Source Info */}
          {/* <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
            <strong>Source:</strong> <a href={scrapedData.source_url} target="_blank" rel="noopener noreferrer">
              {scrapedData.source_url}
            </a>
          </div> */}
        </div>
      )}
    </>
  )
}

export default App