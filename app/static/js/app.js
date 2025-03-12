document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    let totalPages = 1;
    let baseImageUrl = '';
    
    // Get TMDB configuration first
    fetch('/configuration')
        .then(res => res.json())
        .then(config => {
            baseImageUrl = `${config.images.secure_base_url}original`;
            initSearch();
        });

    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentPage = 1;
                loadResults(e.target.value);
            }, 500);
        });

        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                if (currentPage < totalPages) {
                    currentPage++;
                    loadResults(searchInput.value, false);
                }
            }
        });
    }

    function loadResults(query, clear = true) {
        if (!query) return;
        
        fetch(`/search?q=${encodeURIComponent(query)}&page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                totalPages = data.total_pages;
                renderResults(data.results, clear);
            });
    }

    function renderResults(results, clear) {
        const grid = document.getElementById('movieGrid');
        if (clear) grid.innerHTML = '';

        results.forEach(item => {
            if (item.media_type === 'movie' || item.media_type === 'tv') {
                const card = createMediaCard(item);
                grid.appendChild(card);
            }
        });
    }

    function createMediaCard(item) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const title = item.title || item.name;
        const year = new Date(item.release_date || item.first_air_date).getFullYear();
        const poster = item.poster_path ? 
            `${baseImageUrl}${item.poster_path}` : '/static/no-poster.jpg';

        card.innerHTML = `
            <img src="${poster}" class="movie-poster" alt="${title}">
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <div class="movie-details">
                    <span class="movie-year">${year || 'N/A'}</span>
                    <span class="movie-rating">⭐ ${item.vote_average?.toFixed(1) || '?'}</span>
                </div>
                <button class="button button-watchlist" data-id="${item.id}">
                    Add to Watchlist
                </button>
            </div>
        `;

        return card;
    }

    // Watchlist functionality
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('button-watchlist')) {
            const mediaId = e.target.dataset.id;
            const mediaItem = getMediaDetails(mediaId);
            
            if (!watchlist.some(item => item.id == mediaId)) {
                watchlist.push(mediaItem);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                updateWatchlistUI();
            }
        }
    });

    async function getMediaDetails(id) {
        const response = await fetch(`/movie/${id}`);
        const data = await response.json();
        return {
            id: data.id,
            title: data.title || data.name,
            poster: data.poster_path ? `${baseImageUrl}${data.poster_path}` : '/static/no-poster.jpg',
            year: new Date(data.release_date || data.first_air_date).getFullYear(),
            rating: data.vote_average,
            overview: data.overview
        };
    }

    function updateWatchlistUI() {
        const watchlistGrid = document.getElementById('watchlistGrid');
        watchlistGrid.innerHTML = watchlist.map(item => `
            <div class="watchlist-item">
                <img src="${item.poster}" alt="${item.title}">
                <h4>${item.title}</h4>
                <button class="button-remove" data-id="${item.id}">Remove</button>
            </div>
        `).join('');
    }
});