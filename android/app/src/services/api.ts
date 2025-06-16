const API_URL = 'http://10.0.2.2:3001'; // For Android emulator
// const API_URL = 'http://localhost:3001'; // For web testing
// const API_URL = 'http://YOUR_MACHINE_IP:3001'; // Replace with your computer's IP address

console.log('API URL is configured as:', API_URL);

export interface LocationResponse {
  id: string;
  name: string;
  type: string;
  condition: string;
  yearAbandoned: number;
  description: string;
  lat: number;
  lon: number;
  photos: string[];
  warnings: string[];
  accessibility: string;
}

// Test API connectivity with a simple endpoint
export const testApiConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing API connection...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_URL}/ping`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

export const fetchLocations = async (): Promise<LocationResponse[]> => {
  console.log('Fetching locations from API...');
  try {
    console.log('Making request to:', `${API_URL}/locations`);
    
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${API_URL}/locations`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Received data:', JSON.stringify(data).substring(0, 200) + '...');
    console.log('Number of locations received:', data.locations ? data.locations.length : 'No locations array found');
    
    return data.locations || [];
  } catch (error: any) {
    console.error('Error fetching locations:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - the server took too long to respond');
    }
    throw error;
  }
};

// Load fallback data from local JSON file
export const loadFallbackData = (): LocationResponse[] => {
  console.log('Loading fallback data from local JSON');
  try {
    // This is a workaround since we can't directly import JSON in strict mode
    const locationData = require('../../../../../assets/locations.json');
    return locationData;
  } catch (error) {
    console.error('Failed to load fallback data:', error);
    return [];
  }
};
