let recommendationsData; // Variable to store the fetched recommendations data

// Function to fetch recommendations from JSON file
function fetchRecommendations() {
    fetch('recommendations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            recommendationsData = data; // Store the fetched data in recommendationsData
            console.log('Recommendations data loaded:', recommendationsData);
            // Call any function that depends on recommendationsData here
            displayRecommendations('countries'); // Example call to display countries by default
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
            // Handle error display or fallback logic here
        });
}

// Function to display recommendations based on category
function displayRecommendations(category) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    recommendationsData[category].forEach(item => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.classList.add('recommendation');
        recommendationDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        recommendationsDiv.appendChild(recommendationDiv);
    });
}

// Function to search within the recommendations based on user input
function searchFunction() {
    const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();
    const filteredRecommendations = [];

    // Search in countries
    recommendationsData.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchTerm)) {
                filteredRecommendations.push(city);
            }
        });
    });

    // Search in temples
    recommendationsData.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchTerm)) {
            filteredRecommendations.push(temple);
        }
    });

    // Search in beaches
    recommendationsData.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchTerm)) {
            filteredRecommendations.push(beach);
        }
    });

    // Display filtered recommendations
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    if (filteredRecommendations.length > 0) {
        filteredRecommendations.forEach(item => {
            const recommendationDiv = document.createElement('div');
            recommendationDiv.classList.add('recommendation');
            recommendationDiv.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            recommendationsDiv.appendChild(recommendationDiv);
        });
    } else {
        recommendationsDiv.innerHTML = '<p>No recommendations found for this keyword.</p>';
    }
}

// Initialize the fetching of recommendations when the page loads
fetchRecommendations();

// Example usage of searchFunction with event listener
document.getElementById('searchButton').addEventListener('click', searchFunction);
