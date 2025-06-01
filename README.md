* What the app does
* Local-only summarization (via Ollama)
* How to try it with mock data
* UI features like filtering, search, and table view

---

````markdown
# 🧠 Web Scraper Dashboard (Frontend)

This React app allows users to enter any public URL and view a summarized analysis of the webpage using AI. The results include:

- Title
- Page summary
- Key points
- Expanded summaries per point
- Tags/topics
- Reading time and metadata

---

## ✨ Features

- 🔗 Accepts any public URL
- 🧠 Summarizes the content using a locally running LLM model via **Ollama**
- 🧪 Supports **mock data mode** to demo the UI without needing backend/API
- 📋 Filter key points by topic and search terms
- 🗂 Notion-like tabular display of results
- 🧹 Reset filters or clear data with one click

---

## ⚠️ Ollama-Based Summarization (Local-Only)

> This app uses an open-source LLM like `mistral` or `llama3` via [Ollama](https://ollama.com), which currently runs only on your local machine.

To get full summarization features working:

1. Install Ollama from [ollama.com](https://ollama.com)
2. Pull a model (e.g.):
   ```bash
   ollama pull mistral
````

3. Start the model:

   ```bash
   ollama run mistral
   ```
4. Run the backend server (`http://localhost:8080`)
5. Use this frontend to input URLs and see results

🔌 This avoids OpenAI or other paid APIs and works fully offline!

---

## 🚀 Try It With Mock Data (No Setup Needed)

Click the **“Try with Mock Data”** button to instantly load a sample summary and explore all frontend features.

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/web-scraper-dashboard.git
cd web-scraper-dashboard/frontend

npm install
npm run dev
```

The app runs on `http://localhost:5173` (or your Vite port).

> Ensure your backend is running at `http://localhost:8080` for live scraping.

---

## 🛠 Technologies Used

* React
* Vite
* Fetch API for backend calls
* Tailwind CSS or basic CSS (optional)
* Custom components: `Note`, `Table`

---

## 📁 Folder Structure

```
frontend/
├── App.jsx
├── component/
│   ├── Table.jsx
│   └── Note.jsx
├── constant.js (mock data)
├── App.css
```

---

## 🔮 Future Improvements

* 🌍 Add OpenAI fallback mode
* 💾 Allow export to Markdown or PDF
* 📊 Summary comparison for multiple URLs
* ☁️ Cloud-based Ollama support (once available)

---

## 📝 License

MIT