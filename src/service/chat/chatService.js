import Fetcher from "../../utils/Fetcher";

/**
 * @author : 김요셉
 * @classDesc : 채팅 관련 기능 Service
 */

export const getChatMessageList = async (chatRoomId) => {
    const data = {"chatRoomId" : chatRoomId};
    const fetcher = new Fetcher().setUrl("/chat/getChatMessageList")
                                    .setMethod("GET")
                                    .setData(JSON.stringify(data));

    try {
        const result = await fetcher.jsonFetch();
        if (result.error == null) {
            return result.data;
        } else {
            alert(result.error);
            return false;
        }
    } catch(error) {
        console.log(error);
    }
}

export const openChatRoom = async (userId, receivers, chatRoomTitle) => {
    if (userId == null || userId.length == 0) {
        alert("로그인이 필요합니다.");
        return false;
    }
    const data = {
        "userId" : userId,
        "receivers" : receivers,
        "chatRoomTitle" : chatRoomTitle,
    };

    const fetcher = new Fetcher().setUrl("/chat/openChatRoom")
                                    .setMethod("POST")
                                    .setData(JSON.stringify(data));

    try {
        const result = await fetcher.jsonFetch();
        if (result.error == null) {
            return result.data;
        } else {
            alert(result.error);
            return false;
        }
    } catch(error) {
        console.log(error);
    }
}