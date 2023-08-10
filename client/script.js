document.getElementById("findButton").addEventListener("click", async () => {
    const companyNamesInput = document.getElementById("companyNames");
    const companyNames = companyNamesInput.value.split(/\r?\n/);
    const resultList = document.getElementById("resultList");
    resultList.innerHTML = ""; // Clear previous results
  
    try {
      const response = await fetch("http://localhost:3000/get_company_urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company_names: companyNames }), // Send the array of company names
      });
  
      const data = await response.json();
  
      if (response.ok) {
        data.urls.forEach((result) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${result.url}`;
          resultList.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement("li");
        listItem.textContent = `Error - ${data.error}`;
        resultList.appendChild(listItem);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  