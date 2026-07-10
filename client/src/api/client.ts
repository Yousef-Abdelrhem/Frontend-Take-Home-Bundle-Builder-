import type { Product } from '../data/catalog';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  } catch (error) {
    console.error('Error fetching products from API, using fallback:', error);
    // Fallback to local catalog
    const { products } = await import('../data/catalog');
    return products;
  }
}

export async function saveSystem(clientId: string, systemData: any): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/system`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, ...systemData }),
    });
    if (!response.ok) throw new Error('Failed to save system');
  } catch (error) {
    console.error('Error saving system to API:', error);
    // Silently fail - localStorage will handle it
  }
}

export async function getSystem(clientId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/system/${clientId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch system');
    return response.json();
  } catch (error) {
    console.error('Error fetching system from API:', error);
    return null;
  }
}
