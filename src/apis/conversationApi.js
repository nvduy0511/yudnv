import axiosClient from '../configs/axiosClient';

const conversationApi = {
    accessConversation: (data) => {
        const url = `conversation/access`;
        return axiosClient.post(url, data);
    },
};
export default conversationApi;
