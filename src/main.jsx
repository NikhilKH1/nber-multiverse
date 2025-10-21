import './styles/main.scss';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import DataTable from 'datatables.net-dt';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ExpandableField from './components/ExpandableField.jsx';
import HeaderProfile from './components/HeaderProfile.jsx';

const API_KEY = '3ed84af45a073408b81be89f8d8f5983';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const FRED_URL = `https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=${API_KEY}&file_type=json&frequency=q`;

function wireExpanders() {
  const expanders = document.querySelectorAll('.expander');
  expanders.forEach(btn => {
    const targetId = btn.dataset.target;
    const span = document.getElementById(targetId);
    if (!span) return;
    
    const isCollapsed = () => span.dataset.collapsed === '1';
    const toggle = () => {
      const collapsed = isCollapsed();
      span.setAttribute('data-expanded', collapsed ? 'true' : 'false');
      span.dataset.collapsed = collapsed ? '0' : '1';
      btn.textContent = collapsed ? 'Less' : 'More';
      btn.setAttribute('aria-expanded', collapsed ? 'true' : 'false');
    };
    
    span.dataset.collapsed = '1';
    span.setAttribute('data-expanded', 'false');
    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

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
  console.log('Starting GDP data load...');
  
  const proxies = [
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://thingproxy.freeboard.io/fetch/'
  ];
  
  let lastError = null;
  
  for (const proxy of proxies) {
    try {
      const url = proxy === 'https://api.allorigins.win/raw?url=' 
        ? proxy + encodeURIComponent(FRED_URL)
        : proxy + FRED_URL;
      
      console.log('Trying proxy:', proxy);
      console.log('Fetching URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache'
      });
      
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      console.log('Data received:', data);
      const rows = (data.observations || [])
        .filter(obs => obs.value !== '.')
        .map(obs => [obs.date, parseFloat(obs.value).toLocaleString('en-US')]);
      
      console.log('Processed rows:', rows.length);
      
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
      console.log('DataTable created successfully');
      return;
    } catch (error) {
      console.warn(`Proxy ${proxy} failed:`, error.message);
      lastError = error;
      continue;
    }
  }

  console.error('All proxies failed, showing error message');
  const tbody = document.querySelector('#gdp-table tbody');
  if (tbody) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="2">Failed to load FRED data. All proxy services are currently unavailable. Please try again later.</td>`;
    tbody.appendChild(row);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting initialization...');
  wireExpanders();
  enhanceWithReact();
  replaceLoginWithProfile();
  loadGDP();
});
