import Fetcher from '../utils/Fetcher';
export const fetcherUserUpdateUserProfile = async (token,formData) => {
    

    if (token != null) {
      console.log(token.accessToken);

      try {

        const response = await fetch(process.env.REACT_APP_API_URI+"/user/info", {
          method: "PUT",
          headers: {
              'Authorization': `Bearer ${token.accessToken}`
          },
          body: formData
          });
      } catch (error) {
        console.error('login error:', error);
      }

    }
};



