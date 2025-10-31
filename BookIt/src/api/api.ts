import axios from "axios";

export interface Experience {
  id: string;
  title: string;
  shortDescription: string; // frontend display
  image: string;
  price: number;
  location: string;
  availableSlots: string[];
}

const API_BASE = "http://localhost:5000/api";

export const api = {
  // ✅ Fetch all experiences
  getExperiences: async (): Promise<Experience[]> => {
    const response = await axios.get(`${API_BASE}/experiences`);
    return response.data.map((exp: any) => ({
      id: exp.id.toString(),
      title: exp.title,
      shortDescription: exp.description, // ✅ backend → frontend field
      image: exp.imageUrl,               // ✅ backend → frontend field
      price: exp.price,
      location: exp.location,
      availableSlots: exp.availableSlots || [],
    }));
  },

  // ✅ Fetch a single experience by ID
  getExperienceById: async (id: string): Promise<Experience> => {
    const response = await axios.get(`${API_BASE}/experiences/${id}`);
    const exp = response.data;
    return {
      id: exp.id.toString(),
      title: exp.title,
      shortDescription: exp.description, // ✅ same mapping
      image: exp.imageUrl,               // ✅ same mapping
      price: exp.price,
      location: exp.location,
      availableSlots: exp.availableSlots || [],
    };
  },
};
