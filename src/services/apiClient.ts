const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('mangatagallo_jwt_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Request failed with status ${response.status}`);
    }

    return response.json();
  },

  async get<T>(endpoint: string): Promise<T> {
    return apiClient.fetch<T>(endpoint, { method: 'GET' });
  },

  async post<T>(endpoint: string, body: any): Promise<T> {
    return apiClient.fetch<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
  },

  async put<T>(endpoint: string, body: any): Promise<T> {
    return apiClient.fetch<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  },

  async delete<T>(endpoint: string): Promise<T> {
    return apiClient.fetch<T>(endpoint, { method: 'DELETE' });
  },
};
