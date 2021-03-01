import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (tokenData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenData: tokenData,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem("authrouterauth")
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

// export const checkAuthTimeout = (expirationTime) => {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(logout())
//     }, expirationTime * 1000)
//   }
// }

export const checkAuthState = () => {
  return dispatch => {
    const tokenData = localStorage.getItem("authrouterauth")
    console.log("CHeck AuthState : tokendata FROM STORAGE");
    console.timeLog(tokenData);
    if (!tokenData) {
      dispatch(logout())
    } else {
      dispatch(authSuccess(JSON.parse(tokenData)))
      // const expirationDate = new Date(localStorage.getItem("expirationDate"))

      // if (expirationDate > new Date()) {
      //   const userId = localStorage.getItem("auth").id
      //   dispatch(authSuccess(tokenData))
      // //  dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      // } else
      // dispatch(logout())  
    }
  }
}

export const auth = (username, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())

    const params = {
      username: username,
      password: password,
      returnSecureToken: true
    }


    var sampleAuthResponse = {
      "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQ2MTU0NDIsInN1YiI6ImN1c3RvbWVyMSIsInByaW5jaXBhbCI6Ikg0c0lBQUFBQUFBQUFKVlNQMDhVUVJSXC9leHhCUTFRdzBjUUNHN0V6ZTFITGE1RExhVUpXem5CY2c0bG1idmF4RHN6T3JQTUg3aHB5RlJRVUdKWEV4S1wvQU45SEdEMkMwc0tXMjljMXlzS2NOY2FyTm05XC8rXC9yMDVPWVZwYStCeFpwaVFOaTZrejRTS2JXR0V5aXh5YjRRYnh0NmlTZEdWaUdjbHNFY1RPRHRSRGFJRWFpSjFjRFBaWWp1c0labktHcDMrRm5MWEhCaDRwRTAyWnR3MExNZGRiYmJqQzI2dURmNGxVRkZIU3pXWTJZQjV4cm4yeXExcTFSNFV3bUM2QVhQVkxORjhPNHh1Y2JwQjVRU1RkaEk2ZzRyMUphWUp6REx2M21oU0ZXZ2QzRGd6NjUyUWpTNjZaZ0pYQ21ZdHVmc25TZGNGNitFKzJGU1U0QzNzUVgxUVJIU291XC9zQkdnZWV1S1dscE5SQ0s3dllVN2xPeGFZSTRzUVwvV25qXC83ZWp6cUZjRG9FNGVYUDVQTmIrekRLTXZyMzdmTFl1T3VJUGJFOVlyV0hOUWtKdjVpbm5kWUZEK1wvdW5GaCtQVGc1ZFRwQndRVFwvOVwvSDR0UHhzME5Xem92bUdGT1QreUlhSGZyNFp2SWx5OG5QOVwvQ01PNkt2SkJJTDBvNVRDOGtLbUtLV3pkYW52ZnQ0TnBhSjJtXC9idlc2NjUzbjdiVXd1Y3E5ZFRwSDg1REVyNWZadzlMaVJOUEtEbis5KzNwMDd3Y1JyY0QwRHBNZXFmcTVDclRxOHo2YVwvWlBqaGRtUFB3XC9MSU9OSFBmVUh4UmlWVVJnREFBQT0iLCJyb2xlcyI6WyJST0xFX0NVU1RPTUVSIl0sImlhdCI6MTYxNDYxMTg0Mn0.l---7UI6dpuJ3Qw4jBcnY8RTRLEd1zy8Ntz8ynAmJ-w",
      "id": 3,
      "name": "John Smith",
      "refresh_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjEiLCJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZTUDA4VVFSUlwvZXh4QlExUXcwY1FDRzdFemUxSExhNURMYVVKV3puQmNnNGxtYnZheERzek9yUE1IN2hweUZSUVVHSlhFeEtcL0FOOUhHRDJDMHNLVzI5YzF5c0tjTmNhck5tOVwvK1wvcjA1T1lWcGErQnhacGlRTmk2a3o0U0tiV0dFeWl4eWI0UWJ4dDZpU2RHVmlHY2xzRWNUT0R0UkRhSUVhaUoxY0RQWllqdXNJWm5LR3AzK0ZuTFhIQmg0cEUwMlp0dzBMTWRkYmJiakMyNnVEZjRsVUZGSFN6V1kyWUI1eHJuMnlxMXExUjRVd21DNkFYUFZMTkY4TzR4dWNicEI1UVNUZGhJNmc0cjFKYVlKekRMdjNtaFNGV2dkM0RnejY1MlFqUzY2WmdKWENtWXR1ZnNuU2RjRjYrRSsyRlNVNEMzc1FYMVFSSFNvdVwvc0JHZ2VldUtXbHBOUkNLN3ZZVTdsT3hhWUk0c1FcL1dualwvN2VqenFGY0RvRTRlWFA1UE5iK3pES012cjM3ZkxZdU91SVBiRTlZcldITlFrSnY1aW5uZFlGRCtcL3VuRmgrUFRnNWRUcEJ3UVRcLzlcL0g0dFB4czBOV3pvdm1HRk9UK3lJYUhmcjRadklseThuUDlcL0NNTzZLdkpCSUwwbzVUQzhrS21LS1d6ZGFudmZ0NE5wYUoybVwvYnZXNjY1M243YlV3dWNxOWRUcEg4NURFcjVmWnc5TGlSTlBLRG4rOSszcDA3d2NScmNEMERwTWVxZnE1Q3JUcTh6NmFcL1pQamhkbVBQd1wvTElPTkhQZlVIeFJpVlVSZ0RBQUE9Iiwicm9sZXMiOlsiUk9MRV9DVVNUT01FUiJdLCJpYXQiOjE2MTQ2MTE4NDJ9.EokFhRU_IgPX0yN4qZnSfX48zCyTdm6rwptNc3OiJhQ",
      "roles": ["ROLE_CUSTOMER"],
      "token_type": "Bearer",
      "username": "customer1"
    };

    localStorage.setItem("authrouterauth", JSON.stringify(sampleAuthResponse))
    dispatch(authSuccess(sampleAuthResponse))

    // const url = "http://localhost:8080//auth/login"

    // axios.post(url, params)
    //   .then(response => {
    //     console.log(response.data)
    //     localStorage.setItem("authrouterauth", JSON.stringify(response.data))
    //     dispatch(authSuccess(response.data))
    //   })
    //   .catch(error => {

    //     dispatch(authFail(error.response.data.error))
    //   })
  }
}