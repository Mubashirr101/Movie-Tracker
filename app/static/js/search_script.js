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
    console.log(item);
    let title = "";
    let cover = "";
    let meta = "";
    let lang = "";
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
      date = item.release_date;
      meta = `${date.split("-")[0] || ""}`;
      lang = item.original_language;
      cover = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://via.placeholder.com/150?text=No+Cover";
      description = item.overview || "No description available.";
    } else if (type === "show") {
      title = item.name;
      lang = item.original_language;
      meta = `First Air Date: ${item.first_air_date || "N/A"}`;
      cover = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://via.placeholder.com/150?text=No+Cover";
      description = item.overview || "No description available.";
    }

    // Create card element
    const mediaCard = document.createElement("div");
    mediaCard.className = "media-card";
    mediaCard.innerHTML = `
      <div class="card-image">
        <img src="${cover}" alt="${title} Cover">
      </div>
      <div class="card-info">
        <div class="card-title">${title}</div>
        <div class="card-meta">${meta}</div>
      </div>
    `;

    // Attach click listener with item data
    mediaCard.addEventListener("click", () => {
      openModal(title, lang, meta, cover, description);
    });

    document.getElementById("output").appendChild(mediaCard);
  });
}

function openModal(title,lang, meta, cover, description) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
      <div style='display :flex; height=100%'>
          <div>
          <img src="${cover}" alt="${title} " style="width: 100%; object-fit: cover;Cover" style="width: 100%; object-fit: cover;">
          </div>
          <div style='flex:1;margin-left:10px;'><h2 class>${title}</h2>

          <p>${meta}</p>
          <p>${lang}</p>
          <p>${description}</p>
          </div>
      </div>
    
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
