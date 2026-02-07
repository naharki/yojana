// darta chalani apps 
import api from '../../lib/api'

export const DartaChalaniAuthService = {
  list: () => api.get("/committees/"),
  get: (id) => api.get(`/committees/${id}/`),
  logout: () => api.post("/users/logout/"),
  update: (id, data) => api.put(`/committees/${id}/`, data),
  remove: (id) => api.delete(`/committeese/${id}/`),
};
