document.getElementById('findButton').addEventListener('click', async () => {
    const companyNamesInput = document.getElementById('companyNames');
    const companyNames = companyNamesInput.value.split('\n');
    const resultList = document.getElementById('resultList');
    resultList.innerHTML = ''; // Clear previous results

    try {
        for (const companyName of companyNames) {
            const response = await fetch('https://search-backend-hz3t.onrender.com/get_company_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ company_name: companyName.trim() })
            });

            const data = await response.json();

            if (response.ok) {
                const listItem = document.createElement('li');
                listItem.textContent = `${companyName}: ${data.url}`;
                resultList.appendChild(listItem);
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = `${companyName}: Error - ${data.error}`;
                resultList.appendChild(listItem);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
