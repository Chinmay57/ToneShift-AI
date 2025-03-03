from flask import Flask, render_template, request, jsonify
import openai
import requests
from newspaper import Article
from bs4 import BeautifulSoup

app = Flask(__name__)

# Set up OpenAI API client
openai_client = openai.OpenAI(api_key="Your_OpenAI_KEY_Here")

def extract_article_text(url):
    """Attempts to extract article text using newspaper3k and BeautifulSoup as a fallback."""
    try:
        # First attempt: Using newspaper3k
        article = Article(url)
        article.download()
        article.parse()
        if article.text and len(article.text) > 200:  # Ensure valid extraction
            return article.text[:5000], article.title  # Limit to 5000 characters
    except Exception as e:
        print("Newspaper3k failed:", e)

    try:
        # Second attempt: Using BeautifulSoup for web scraping
        headers = {"User-Agent": "Mozilla/5.0"}  # Mimic a browser request
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            return None, None

        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = soup.find_all("p")  # Extract all paragraphs
        article_text = "\n".join([p.get_text() for p in paragraphs])

        if len(article_text) > 200:  # Ensure valid extraction
            return article_text[:5000], "Extracted Article"
    except Exception as e:
        print("BeautifulSoup failed:", e)

    return None, None  # If both methods fail

def summarize_article(article_text):
    """Summarizes the article using OpenAI."""
    try:
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Summarize the following article in 250+ words with a clear title."},
                {"role": "user", "content": article_text}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print("OpenAI API call failed:", e)
        return "Error generating summary. Please try again."

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    article_url = data.get("url")

    if not article_url:
        return jsonify({"error": "No article URL provided"}), 400

    # Extract text from the article
    article_text, title = extract_article_text(article_url)

    if not article_text:
        return jsonify({"error": "Failed to extract article text. The website may be blocking scrapers."}), 400

    summary = summarize_article(article_text)
    return jsonify({"title": title, "summary": summary})

if __name__ == '__main__':
    app.run(debug=True)
