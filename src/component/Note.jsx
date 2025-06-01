export default function Note() {
    return(
        <div>
        <h2>⚠️ Local-Only Summarization</h2>
        <p>
          This feature uses an open-source AI model via <strong>Ollama</strong>, running locally on your machine.
          <br />
          To use:
          <ol style={{listStyle: "none"}}>
            <li>Install <a href="https://ollama.com" target="_blank" rel="noreferrer" className="underline text-blue-600">Ollama</a></li>
            <li>Run a model like: <code className="bg-gray-200 px-1">ollama run mistral</code></li>
            <li>Ensure Ollama is running at <code>http://localhost:11434</code></li>
          </ol>
        </p>
      </div>

    )
}