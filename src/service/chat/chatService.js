import Fetcher from "../../utils/Fetcher";

/**
 * @author : 김요셉
 * @classDesc : 채팅 관련 기능 Service
 */

export const getChatMessageList = async (chatRoomId) => {
    let data = {"chatRoomId" : chatRoomId};
    const fetcher = new Fetcher().setUrl("/chat/getChatMessageList")
                                    .setMethod("GET")
                                    .setData(JSON.stringify(data));

    try {
        const result = await fetcher.jsonFetch();
        if (result.error == null) {
            return result.data;
        }
    } catch(error) {
        console.log(error);
    }



}