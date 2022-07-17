import axiosClient from '../configs/axiosClient';

const conversationApi = {
    accessConversation: (data) => {
        const url = `conversation/access`;
        return axiosClient.post(url, data);
    },
    getAllByIdUser: (id) => {
        const url = `conversation/get-all-by-id-user?id=${id}`;
        return axiosClient.get(url, { id });
    },
    readConversation: (conversation) => {
        const url = `conversation/read-conversation`;
        return axiosClient.post(url, conversation);
    },
};
export default conversationApi;
