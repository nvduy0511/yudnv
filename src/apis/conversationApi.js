import axiosClient from '../configs/axiosClient';

const conversationApi = {
    accessConversation: (data) => {
        const url = `conversation/access`;
        return axiosClient.post(url, data);
    },
    getAllByIdUser: (id) => {
        const url = `conversation/get-all-by-id-user?id=${id}`;
        return axiosClient(url, { id });
    },
};
export default conversationApi;
