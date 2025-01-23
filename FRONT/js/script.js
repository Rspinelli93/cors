const characterDropdown = document.getElementById('characterDropdown');
const characterInfo = document.getElementById('characterInfo');


async function populateDropdown() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        const characters = data.results;

        // Clear dropdown
        characterDropdown.innerHTML = '<option value="">Selecciona un personaje</option>';

        // Populate dropdown 
        characters.forEach(character => {
            const option = document.createElement('option');
            option.value = character.id; // Character ID como value
            option.textContent = character.name; // Muestra nombre del Character
            characterDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching characters:', error);
        characterDropdown.innerHTML = '<option value="">Error al cargar personajes</option>';
    }
}

const getCharacter = () => {
    const id = characterDropdown.value
    fetch(`http://localhost:3000/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Character not found');
            }
            return response.json();
        })
        .then(data => {
            const { name, status, species, gender, origin, image } = data;

            characterInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${image}" alt="${name}">
                <p>Status: ${status}</p>
                <p>Species: ${species}</p>
                <p>Gender: ${gender}</p>
                <p>Origin: ${origin.name}</p>
            `;
        })
        .catch(error => {
            characterInfo.innerHTML = `<p>Ese personaje no existe</p>`;
        });
};

// Call the function
populateDropdown();