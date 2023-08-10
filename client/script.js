document.getElementById('findButton').addEventListener('click', async () => {
  const companyName = document.getElementById('companyName').value;

  try {
      const response = await fetch('http://localhost:3000/get_company_url', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ company_name: companyName })
      });

      const data = await response.json();

      if (response.ok) {
          document.getElementById('result').textContent = `URL: ${data.url}`;
      } else {
          document.getElementById('result').textContent = `Error: ${data.error}`;
      }
  } catch (error) {
      console.error('Error:', error);
  }
});
