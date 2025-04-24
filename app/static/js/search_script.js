function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function chooseMedia() {
  const mediaType = getQueryParam("media");
  const query = getQueryParam("q");

  if (!query) {
    document.getElementById("output").innerHTML =
      "<p>No search term provided.</p>";
    return;
  }

  document.getElementById("output").innerHTML = "Loading...";

  switch (mediaType) {
    case "books":
      fetchBooks(query);
      break;
    case "movies":
      fetchMovies(query);
      break;
    case "shows":
      fetchShows(query);
      break;
    default:
      document.getElementById("output").innerHTML =
        "<p>Invalid media type.</p>";
  }
}

function fetchBooks(query) {
  fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => displayResults(data.docs, "book"))
    .catch((error) => console.log("Error fetching books:", error));
}

function fetchMovies(query) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&api_key=${TMDB_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => displayResults(data.results, "movie"))
    .catch((error) => console.log("Error fetching movies:", error));
}

function fetchShows(query) {
  fetch(
    `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
      query
    )}&api_key=${TMDB_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => displayResults(data.results, "show"))
    .catch((error) => console.log("Error fetching shows:", error));
}

function displayResults(items, type) {
  document.getElementById("output").innerHTML = "";

  if (!items || items.length === 0) {
    document.getElementById(
      "output"
    ).innerHTML = `<p>No ${type}s found.</p>`;
    return;
  }

  items.forEach((item) => {
    let title = "";
    let cover = "";
    let meta = "";
    let description = "";

    if (type === "book") {
      title = item.title;
      meta = item.author_name ? item.author_name[0] : "Unknown Author";
      cover = item.cover_edition_key
        ? `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`
        : "https://via.placeholder.com/150?text=No+Cover";
      description = item.first_publish_year
        ? `First Published: ${item.first_publish_year}`
        : "No additional details available.";
    } else if (type === "movie") {
      title = item.title;
      meta = `Release Date: ${item.release_date || "N/A"}`;
      cover = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://via.placeholder.com/150?text=No+Cover";
      description = item.overview || "No description available.";
    } else if (type === "show") {
      title = item.name;
      meta = `First Air Date: ${item.first_air_date || "N/A"}`;
      cover = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://via.placeholder.com/150?text=No+Cover";
      description = item.overview || "No description available.";
    }

    document.getElementById("output").innerHTML += `
      <div class="media-card" onclick="openModal('${title}', '${meta}', '${cover}', '${description}')">
        <div class="card-image">
          <img src="${cover}" alt="${title} Cover">
        </div>
        <div class="card-info">
          <div class="card-title">${title}</div>
          <div class="card-meta">${meta}</div>
        </div>
      </div>`;
  });
}

function openModal(title, meta, cover, description) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
    <h2>${title}</h2>
    <p>${meta}</p>
    <img src="${cover}" alt="${title} Cover" style="width: 100%; max-height: 300px; object-fit: cover;">
    <p>${description}</p>
  `;

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

window.onload = chooseMedia;
