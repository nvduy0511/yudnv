import axiosClient from '../configs/axiosClient';

const messageApi = {
    sendMessage: (data) => {
        const url = `message/send`;
        return axiosClient.post(url, data);
    },
    getAllByIdRoom: (idRoom) => {
        const url = `message/get-all-by-id?id=${idRoom}`;
        return axiosClient.get(url, { idRoom });
    },
};
export default messageApi;
