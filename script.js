// Configuración
const apiKey = 'AIzaSyDu14GdFkgL48VrbwneZn9Jb1bR4c4DghU'; // 
const searchEngineId = '4081e2b2588434b99'; // El ID que copiaste antes

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se recargue
    
    const query = document.getElementById('searchInput').value;
    if (!query.trim()) return; // 

    // 
    fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items || []); // Muestra resultados
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('results').innerHTML = "<p>Error al buscar. Intenta más tarde.</p>";
        });
});

function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (items.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        resultsDiv.innerHTML += `
            <div class="result-item">
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.snippet}</p>
            </div>
        `;
    });
}