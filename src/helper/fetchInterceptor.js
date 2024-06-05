import Cookies from "js-cookie";

const optionsDefaultValue = {
  method: "GET",
  body: "",
};

export const fetchInterceptor = async (
  url,
  optionArg = optionsDefaultValue
) => {
  try {
    //  full URL
    //   const fullUrl = `${API_URL}${url}`;

    const method = optionArg?.method ? optionArg?.method : "GET";
    const body = optionArg?.body ? optionArg?.body : "";

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET" && method !== "get") {
      options.body = JSON.stringify(body);
    }

    // Adding authorization header if jwtToken exists
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      options.headers["Authorization"] = `${jwtToken}`;
    }

    // Executing the fetch request
    const response = await fetch(url, options);

    // Handling response status
    if (response.status === 401) {
      // Handle jwtToken expiration
      Cookies.remove("jwtToken");
      window.location = "/login";
      throw new Error("Token expired");
    }

    // Handling other errors
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    // Returning response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

export default fetchInterceptor;
