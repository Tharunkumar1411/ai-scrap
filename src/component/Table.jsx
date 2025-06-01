
function Table({ scrapedData, filteredKeyPoints }) {
    return(
        <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', color:"#000", textAlign: 'left', border: '1px solid #ddd', width: '30%' }}>
                Key Point
              </th>
              <th style={{ padding: '12px', color:"#000", textAlign: 'left', border: '1px solid #ddd', width: '70%' }}>
                Summary
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredKeyPoints?.length > 0 ? (
              filteredKeyPoints?.map((point, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px', border: '1px solid #ddd', verticalAlign: 'top' }}>
                    <strong>{point}</strong>
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', lineHeight: '1.4' }}>
                    {scrapedData.summary_for_keypoint[point] || 'No summary available'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ padding: '20px', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No key points match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}

export default Table;