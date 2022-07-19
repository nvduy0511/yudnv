import axiosClient from '../configs/axiosClient';

const messageApi = {
    sendMessage: (data) => {
        const url = `message/send`;
        return axiosClient.post(url, data);
    },
    getAllByIdRoom: (idRoom, limit, page) => {
        const url = `message/get-all-by-id?id=${idRoom}&limit=${limit}&page=${page}`;
        return axiosClient.get(url, { idRoom, limit, page });
    },
};
export default messageApi;
