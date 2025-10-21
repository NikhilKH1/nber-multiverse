import './styles/main.scss';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import DataTable from 'datatables.net-dt';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ExpandableField from './components/ExpandableField.jsx';
import HeaderProfile from './components/HeaderProfile.jsx';
import { apiUtils } from './config.js';

function enhanceWithReact() {
  const expanders = document.querySelectorAll('.expander');
  expanders.forEach(btn => {
    const targetId = btn.dataset.target;
    const mount = document.createElement('span');
    btn.replaceWith(mount);
    const root = createRoot(mount);
    const targetEl = document.getElementById(targetId);
    root.render(<ExpandableField targetId={targetId} targetEl={targetEl} />);
  });
}

function replaceLoginWithProfile() {
  const loginEl = document.querySelector(".nber-login");
  if (!loginEl) return;

  const name = loginEl.getAttribute("data-username") || "Nikhil";
  const mount = document.createElement("div");
  loginEl.replaceWith(mount);

  const root = createRoot(mount);
  root.render(<HeaderProfile name={name} />);
}

async function loadGDP() {
  try {
    const rows = await apiUtils.loadGDPData();
    
    const tbody = document.querySelector('#gdp-table tbody');
    if (tbody) tbody.innerHTML = '';
    
    new DataTable('#gdp-table', {
      data: rows,
      columns: [
        { title: 'Date' }, 
        { title: 'GDP (Billions of Chained 2017 Dollars)' }
      ],
      pageLength: 10,
      order: [[0, 'desc']],
      responsive: true
    });
    
  } catch (error) {
    const tbody = document.querySelector('#gdp-table tbody');
    if (tbody) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="2">Failed to load FRED data. All proxy services are currently unavailable. Please try again later.</td>`;
      tbody.appendChild(row);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  enhanceWithReact();
  replaceLoginWithProfile();
  loadGDP();
});
