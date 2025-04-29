# MTrac - Movie, Show, and Book Tracker

MTrac is a Flask-based web application that allows users to search for movies, TV shows, and books, view details, and explore recommendations. It integrates with external APIs like TMDB and OpenLibrary to provide dynamic and up-to-date content.

## Purpose
The purpose of MTrac is to provide users with a centralized platform to discover and track their favorite movies, TV shows, and books. It offers a clean and responsive interface for seamless browsing and searching.

## Features
- **Search Functionality**: Search for movies, TV shows, or books using keywords.
- **Dynamic API Integration**: Fetches data from TMDB and OpenLibrary APIs for accurate and real-time results.
- **Category Pages**: Separate pages for movies, shows, and books with curated recommendations and genres.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Modal Details View**: Displays detailed information about selected items in a modal.
- **404 Handling**: Graceful handling of invalid page requests.

## Usage
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Flask-app-1
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your API keys:
     ```
     TMDB_API_KEY=<your_tmdb_api_key>
     GOODREADS_API_KEY=<your_goodreads_api_key>
     ```

4. Run the Flask app:
   ```bash
   flask run
   ```

5. Open the app in your browser at `http://127.0.0.1:5000`.

## Tech Stack
- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **APIs**:
  - [TMDB API](https://www.themoviedb.org/documentation/api) for movies and TV shows.
  - [OpenLibrary API](https://openlibrary.org/developers/api) for books.
- **Styling**: Custom CSS with responsive design.
- **Environment Management**: Python `dotenv`.

---
<br>

Project Timeline & Progress: [Trello board](https://trello.com/b/VDpSvVhu/mtrac).

Prototype Design: [Figma](https://www.figma.com/proto/6f427QtVx5pyMF28piynW1/MovieTracker?node-id=4-15&p=f&t=er9p0g6Y1DqRy6SV-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A15).


## Acknowledgments
- TMDB and OpenLibrary for their APIs.
- Flask for providing a lightweight and flexible web framework.
