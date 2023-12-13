// Get all the <td> elements with class "alignright"
const tdElements = document.querySelectorAll('td.alignright');

// Initialize arrays to store the results
const dates = [];
const reportableProceeds = [];
const taxWithheldValues = [];
let sumReportableProceeds = 0;
let sumTaxWithheld = 0;

// Loop through the <td> elements
tdElements.forEach((tdElement, index) => {
  const strongElement = tdElement.querySelector('strong');

  // Check if the <td> contains the text "Date:"
  if (strongElement && strongElement.textContent.trim() === "Date:") {
    // Find the next <td> element and extract its text content
    const nextTdElement = tdElement.nextElementSibling;
    if (nextTdElement) {
      dates.push(nextTdElement.textContent.trim());
    }
  }

  // Check if the <td> contains the text "Reportable Proceeds:"
  if (strongElement && strongElement.textContent.trim() === "Reportable Proceeds:") {
    // Find the next <td> element and extract its text content as a dollar amount
    const nextTdElement = tdElement.nextElementSibling;
    if (nextTdElement) {
      const value = nextTdElement.textContent.trim();
      const dollarAmount = parseFloat(value.replace('$', '').replace(',', ''));
      if (!isNaN(dollarAmount)) {
        reportableProceeds.push(dollarAmount);
        sumReportableProceeds += dollarAmount;
      }
    }
  }

  // Check if the <td> contains the text "Tax Withheld:"
  if (strongElement && strongElement.textContent.trim() === "Tax Withheld:") {
    // Find the next <td> element and extract its text content as a dollar amount
    const nextTdElement = tdElement.nextElementSibling;
    if (nextTdElement) {
      const value = nextTdElement.textContent.trim();
      const dollarAmount = parseFloat(value.replace('$', '').replace(',', ''));
      if (!isNaN(dollarAmount)) {
        taxWithheldValues.push(dollarAmount);
        sumTaxWithheld += dollarAmount;
      }
    }
  }
});

// Create an HTML table with styling and an ID
const table = document.createElement('table');
table.id = 'report';
table.innerHTML = `
  <style>
    #report {
      width: 50%;
      max-width: 50%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    #report th, #report td {
      border: 1px solid #000;
      padding: 8px;
      text-align: right;
    }
    #report th {
      background-color: #f2f2f2;
      text-align: center;
    }
  </style>
  <thead>
    <tr>
      <th>Date</th>
      <th>Reportable Proceeds</th>
      <th>Tax Withheld</th>
    </tr>
  </thead>
  <tbody>
    ${dates.map((date, index) => `
      <tr>
        <td>${date}</td>
        <td>${reportableProceeds[index].toFixed(2)}</td>
        <td>${taxWithheldValues[index].toFixed(2)}</td>
      </tr>`).join('')}
    <tr>
      <td>Total:</td>
      <td>${sumReportableProceeds.toFixed(2)}</td>
      <td>${sumTaxWithheld.toFixed(2)}</td>
    </tr>
  </tbody>
`;

// Create a new <div> to hold the table
const tableContainer = document.createElement('div');
tableContainer.appendChild(table);

// Find the <div id="content"> and insert the table after it
const contentDiv = document.querySelector('#content');
contentDiv.insertAdjacentElement('afterend', tableContainer);
