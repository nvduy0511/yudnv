import axiosClient from '../configs/axiosClient';

const userApi = {
    findOrCreate: (user) => {
        const url = `user`;
        return axiosClient.post(url, user);
    },
    getOne: (_id) => {
        const url = `user/get-one?_id=${_id}`;
        return axiosClient.get(url, { _id });
    },
    getAll: () => {
        const url = 'user/get-all';
        return axiosClient.get(url);
    },
    getAllNotIcludeMe: (_id) => {
        const url = `user/get-all-not-include-me?_id=${_id}`;
        return axiosClient.get(url, { _id });
    },
    changeName: (user) => {
        const url = `user/change-name`;
        return axiosClient.post(url, user);
    },
};
export default userApi;
