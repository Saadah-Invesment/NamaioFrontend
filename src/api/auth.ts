import axios from "axios";
import { clearAllLocalStorage } from "./clearstorage";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.tezcai.com/api";
type DecodedToken = { subscription?: string;[key: string]: any };
export const loginapi = async (username: string, password: string) => {
  const res = await axios.post(`${API_BASE_URL}/users/login/`, { username, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export const registerapi = async (payload:any) => {
  const res = await axios.post(`${API_BASE_URL}/users/register/`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export const registeraffapi = async (username: string, email: string, password: string, agreedToSubscription: any) => {
  const res = await axios.post(`${API_BASE_URL}/users/affiliates/register/`, { username, email, password, agreedToSubscription }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export const passwordresetapi = async (email: string) => {
  const res = await axios.post(`${API_BASE_URL}/users/password-reset/`, { email }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}
export const passwordresetconfirmapi = async (uid: string, token: string, new_password: string) => {
  const res = await axios.post(`${API_BASE_URL}/users/password-reset-confirm/`, { uid, token, new_password }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export const logoutapi = async () => {
  const refresh = localStorage.getItem("tezcai_r_token");
  const access = localStorage.getItem("tezcai_token");
  if (!refresh) {
    throw new Error("No refresh token found");
  }

  try {
    const res = await axios.post(
      `${API_BASE_URL}/users/logout/`,
      { refresh },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        }
      }
    );
    return res;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};


export function getCurrentUrlAndPort(): string {
  if (typeof window !== "undefined") {
    const { protocol, hostname, port, pathname } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  }
  return "";
}




export const refreshtoken = async () => {
  try {
    const refresh = localStorage.getItem("tezcai_r_token");
    const res = await axios.post(`${API_BASE_URL}/users/refresh/`, { refresh });

    const newAccessToken = res.data.access;
    const newrefresh = res.data.refresh;

    localStorage.setItem("tezcai_token", newAccessToken);
    localStorage.setItem("tezcai_r_token", newrefresh);


    if (newAccessToken) {
      try {
        const decoded: DecodedToken = jwtDecode(newAccessToken);
        if (decoded?.subscription) {

          localStorage.setItem("tezcai_sub", decoded.subscription.toLowerCase());
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }

  } catch (err) {
    console.log("error", err)
    // clearAllLocalStorage()


  }
}