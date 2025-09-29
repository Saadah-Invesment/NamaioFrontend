export const clearAllLocalStorage = async () => {
    localStorage.removeItem('tezcai_token');
    localStorage.removeItem('tezcai_r_token');
    localStorage.removeItem('b-role');
    localStorage.removeItem('b-email');
  }