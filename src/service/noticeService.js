import Fetcher from '../utils/Fetcher';

export const fetcherUserNoticeList = async (token) => {
    

    if (token != null) {
      //console.log(token.accessToken);

      const fetcher = new Fetcher().setUrl("/notice/user")
                                         .setMethod("GET")
                                         .setAccessToken(token.accessToken);
      try {
        const result = await fetcher.jsonFetch();
        return result;
        console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }

    }
};


export const fetcherUpdateUserReadNoticeList = async (token) => {
    

  if (token != null) {
    //console.log(token.accessToken);

    const fetcher = new Fetcher().setUrl("/notice/user")
                                       .setMethod("PUT")
                                       .setAccessToken(token.accessToken);
    try {
      const result = await fetcher.jsonFetch();
      return result;
      console.log("result : ", result.data);
    } catch (error) {
      console.error('login error:', error);
    }

  }
};

export const fetchUserNoticeCount = async (token) => {
    

  if (token != null) {
    //console.log(token.accessToken);

    const fetcher = new Fetcher().setUrl("/notice/count")
                                       .setMethod("GET")
                                       .setAccessToken(token.accessToken);
    try {
      const result = await fetcher.jsonFetch();
      return result;
    } catch (error) {
      console.error('login error:', error);
    }
  }
};
