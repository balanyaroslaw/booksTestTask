
class HttpService {

    private baseUrl: string;

    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async get<T>(url: string): Promise<T> {
      const response = await fetch(`${this.baseUrl}${url}`);
      if (!response.ok) throw new Error(`GET request failed: ${response.status}`);
      return response.json();
    }
  
    async post<T>(url: string, data: unknown): Promise<T> {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`POST request failed: ${response.status}`);
      return response.json();
    }
  
    async put<T>(url: string, data: unknown): Promise<T> {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`PUT request failed: ${response.status}`);
      return response.json();
    }
  
    async delete(url: string): Promise<void> {
      const response = await fetch(`${this.baseUrl}${url}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`DELETE request failed: ${response.status}`);
    }
}

const httpService = new HttpService("http://localhost:8000/books");

export default httpService;

  