import axios from "axios";
import { clearAllLocalStorage } from "./clearstorage";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.namaio.com/api";
type DecodedToken = { subscription?: string;[key: string]: any };
// export const loginapi = async (username: string, password: string) => {
//   const res = await axios.post(`${API_BASE_URL}/users/login/`, { username, password }, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return res;
// }


export const loginapi = async (username: string, password: string) => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Normalize inputs (case-insensitive)
    const inputUsername = username.trim().toLowerCase();
    const inputPassword = password.trim();

    // Read local user (from register mock)
    const savedData = localStorage.getItem("mock_registered_user");
    const savedUser = savedData ? JSON.parse(savedData) : null;

    // Demo user mock data
    const demoUser = {
      username: "namaio",
      email: "info@namaio.com",
      password: "Namaio@123",
      first_name: "Demo",
      last_name: "User",

    };

    // Check for demo user login
    const isDemoUser =
      (inputUsername === demoUser.username.toLowerCase() ||
        inputUsername === demoUser.email.toLowerCase()) &&
      inputPassword === demoUser.password;

    // Check for local user login
    const isLocalUser =
      savedUser &&
      (inputUsername === savedUser.username.toLowerCase() ||
        inputUsername === savedUser.email.toLowerCase()) &&
      inputPassword === savedUser.password;

    if (isDemoUser || isLocalUser) {
      const user = isDemoUser
        ? demoUser
        : { ...savedUser};

      // Mock tokens
      const access = `mock_access_token_${Date.now()}`;
      const refresh = `mock_refresh_token_${Date.now()}`;

      // Save to localStorage (simulate session)
      localStorage.setItem(
        "mock_auth",
        JSON.stringify({
          user,
          access,
          refresh,
          role: "users",
          subscription: "pro",
          login_time: new Date().toISOString(),
        })
      );

      return {
        status: 200,
        data: {
          message: "Login successful (local mock)",
          user,
          access: access,
          refresh,
          role: "users",
          subscription: "pro",
        },
      };
    } else {
      return {
        status: 401,
        data: { message: "Invalid username or password" },
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: { message: "Login failed (local mock)", error },
    };
  }
};

// export const registerapi = async (payload:any) => {
//   const res = await axios.post(`${API_BASE_URL}/users/register/`, payload, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return res;
// }


export const registerapi = async (payload: any) => {
  try {
    // Simulate saving data locally (mock database)
    localStorage.setItem("mock_registered_user", JSON.stringify(payload));

    // Simulate a network delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock success response
    return {
      status: 201,
      data: {
        message: "User registered successfully (local mock)",
        user: payload,
      },
    };
  } catch (error) {
    // Mock error response
    return {
      status: 500,
      data: {
        message: "Failed to register user (local mock)",
        error,
      },
    };
  }
};


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