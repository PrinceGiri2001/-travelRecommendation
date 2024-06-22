// script.js
fetch('recommendations.json')
    .then(response => response.json())
    .then(data => {
        const recommendationsData = data;
        // Call any function that depends on recommendationsData here
        // For example, you can call displayRecommendations('countries');
    })
    .catch(error => console.error('Error fetching recommendations:', error));

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

// Other functions like searchFunction(), resetFunction(), etc. remain the same
