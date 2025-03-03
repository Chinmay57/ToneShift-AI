# ToneShift AI

## Overview

ToneShift AI is a web application that summarizes articles and adapts the tone of the summary based on user preferences. It provides concise and tailored summaries, catering to different audience styles, making information more engaging and accessible.

## Features

- **Article Summarization**: Enter an article link and get a summarized version.
- **Tone Selection Panel**: Choose from different tones to adjust the style of the summary.
  - **Default** → Original Summarized Text
  - **Informative Analyst** → For professionals and news seekers
  - **The Debater** → For critical thinkers and opinionated audiences
  - **Curious Conversationalist** → For discussions and participation
  - **The Internet Culture** → For younger, internet-savvy audiences
  - **The Entertainer** → Fun and digestible for casual readers
  - **The Storyteller** → For those who enjoy drama and narratives
- **Dynamic UI**: A dark-mode interface with an intuitive layout.
- **AI-Powered Tone Shifting**: Uses OpenAI API to modify the summary’s tone.
- **No Data Storage**: The app does not store user inputs or summaries.

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **API**: OpenAI API

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/toneshift-ai.git
   cd toneshift-ai
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install all necessary dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Generate your own OpenAI API Key from [OpenAI](https://platform.openai.com/signup/).
5. Set up API Key:
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
6. Run the application in virtual environment mode:
   ```sh
   python app.py
   ```
7. Open your browser and go to `http://127.0.0.1:5000/`.

## Debugging & Troubleshooting

- If dependencies are missing, run:
  ```sh
  pip install -r requirements.txt
  ```
- If virtual environment activation fails on Windows, try:
  ```sh
  Set-ExecutionPolicy Unrestricted -Scope Process
  .\venv\Scripts\activate
  ```
- If the API key is incorrect, ensure it is correctly stored in the `.env` file and restart the application.
- Check Flask logs for errors using:
  ```sh
  python app.py
  ```

## Future Enhancements

- Add support for direct text input instead of only URLs.
- Improve UI/UX with animations and enhanced responsiveness.
- Explore additional AI models for better summarization and tone adaptation.

## License

This project is licensed under the MIT License.

## Contributors

- **Chinmay Shingare** - [GitHub](https://github.com/Chinmay57)

