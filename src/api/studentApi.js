const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
const BASE_URL = `${API_BASE}/mandap/students`;

export const studentApi = {
  // Fetch all students
  async getAll() {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch students (${res.status} ${res.statusText})`);
    }
    return res.json();
  },

  // Fetch a student by id
  async getById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch student with ID ${id} (${res.status})`);
    }
    return res.json();
  },

  // Create a new student
  async create(studentData) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      throw new Error(`Failed to create student (${res.status} ${res.statusText})`);
    }
    return res.json();
  },

  // Update an existing student
  async update(id, studentData) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      throw new Error(`Failed to update student (${res.status} ${res.statusText})`);
    }
    return res.json();
  },

  // Delete a student
  async delete(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Failed to delete student (${res.status} ${res.statusText})`);
    }
    return res.text();
  },
};
