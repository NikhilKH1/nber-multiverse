export const config = {
  api: {
    key: import.meta.env.VITE_API_KEY,
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
    retries: 3
  },

  fred: {
    url: import.meta.env.VITE_FRED_URL,
    apiKey: import.meta.env.VITE_FRED_API_KEY,
    proxyUrl: import.meta.env.VITE_PROXY_URL,
    proxies: [
      'https://api.allorigins.win/raw?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://thingproxy.freeboard.io/fetch/'
    ]
  }
};


export const apiUtils = {
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
