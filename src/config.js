// config.js - Environment configuration for NBER Multiverse
export const config = {
  // API Configuration
  api: {
    key: import.meta.env.VITE_API_KEY || 'your_api_key_here',
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.nber.org',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
    retries: 3
  },

  // FRED API Configuration
  fred: {
    url: import.meta.env.VITE_FRED_URL || 'https://api.stlouisfed.org/fred/series/observations',
    apiKey: import.meta.env.VITE_FRED_API_KEY || 'your_fred_api_key_here',
    proxyUrl: import.meta.env.VITE_PROXY_URL || 'https://api.allorigins.win/raw?url=',
    proxies: [
      'https://api.allorigins.win/raw?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://thingproxy.freeboard.io/fetch/'
    ]
  }
};

// API utility functions
export const apiUtils = {
  // Load GDP data from FRED API
  async loadGDPData() {
    const fredUrl = `${config.fred.url}?series_id=GDP&api_key=${config.fred.apiKey}&file_type=json&frequency=q`;
    let lastError = null;
    
    for (const proxy of config.fred.proxies) {
      try {
        const url = proxy === 'https://api.allorigins.win/raw?url=' 
          ? proxy + encodeURIComponent(fredUrl)
          : proxy + fredUrl;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          cache: 'no-cache'
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        const rows = (data.observations || [])
          .filter(obs => obs.value !== '.')
          .map(obs => [obs.date, parseFloat(obs.value).toLocaleString('en-US')]);
        
        return rows;
        
      } catch (error) {
        lastError = error;
        continue;
      }
    }
    
    throw new Error('Failed to load GDP data from all proxy services');
  }
};

export default config;
