import axiosClient from '../configs/axiosClient';

const userApi = {
    findOrCreate: (user) => {
        const url = `user`;
        return axiosClient.post(url, user);
    },
    getAll: () => {
        const url = 'user/get-all';
        return axiosClient.get(url);
    },
    getAllNotIcludeMe: (uid) => {
        const url = `user/get-all-not-include-me?uid=${uid}`;
        return axiosClient.get(url, { uid });
    },
};
export default userApi;
