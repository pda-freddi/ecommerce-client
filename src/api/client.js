/*
*  Simple client object exposing methods that wrap the fetch method and interact
*  with the e-commerce back-end
*/

const baseUrl = "http://localhost:8000/api";

export const client = {
  get: async (endpoint) => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, { credentials: "include" });
        if (!response.ok) {
          const error = await response.json();
          return { status: response.status, error: true, data: error.message };
        }
        const responseData = await response.json();
        return { status: response.status, error: false, data: responseData };
      } catch(error) {
        return { status: null, error: true, data: error.message };
      }
    },
  post: async (endpoint, payload, expectResBody) => {
    try {
      const response = await fetch(
        `${baseUrl}${endpoint}`, 
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: payload ? JSON.stringify(payload) : null
        });
      if (!response.ok) {
        const error = await response.json();
        return { status: response.status, error: true, data: error.message };
      }
      if (expectResBody) {
        const responseData = await response.json();
        return { status: response.status, error: false, data: responseData };
      }
      return { status: response.status, error: false, data: null }
    } catch(error) {
      return { status: null, error: true, data: error.message };
    }
  },
  put: async (endpoint, payload, expectResBody) => {
    try {
      const response = await fetch(
        `${baseUrl}${endpoint}`, 
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: payload ? JSON.stringify(payload) : null
        });
      if (!response.ok) {
        const error = await response.json();
        return { status: response.status, error: true, data: error.message };
      }
      if (expectResBody) {
        const responseData = await response.json();
        return { status: response.status, error: false, data: responseData };
      }
      return { status: response.status, error: false, data: null }
    } catch(error) {
      return { status: null, error: true, data: error.message };
    }
  },
  delete: async (endpoint, payload, expectResBody) => {
    try {
      const response = await fetch(
        `${baseUrl}${endpoint}`, 
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: payload ? JSON.stringify(payload) : null
        });
      if (!response.ok) {
        const error = await response.json();
        return { status: response.status, error: true, data: error.message };
      }
      if (expectResBody) {
        const responseData = await response.json();
        return { status: response.status, error: false, data: responseData };
      }
      return { status: response.status, error: false, data: null }
    } catch(error) {
      return { status: null, error: true, data: error.message };
    }
  }
};