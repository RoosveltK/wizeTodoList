import axios, {AxiosInstance} from "axios";
import MockAdapter from "axios-mock-adapter";
import {Assignee} from "../models";
import {getUrl} from "../configServer.tsx";

const prefixUsers = '/users'

class Services {
    private readonly api: AxiosInstance = axios.create({
        baseURL: getUrl()
    });
    private readonly mock: MockAdapter | null;

    constructor(mockEnabled: boolean = false) {
        if (mockEnabled) {
            this.mock = new MockAdapter(this.api);
            this.mocks();
        } else {
            this.mock = null;
        }
    }

    private mocks() {
        if (!this.mock) return;

        this.mock.onPost(prefixUsers).reply((config) => {
            const data: Assignee = JSON.parse(config.data);
            const users = JSON.parse(localStorage.getItem('users') || '[]')

            const search = users.find((user: Assignee) => user.name === data.name)
            if (search) {
                return [400, {success: false, name: "Un utilisateur avec ce nom existe déjà"}];
            } else {
                users.push(data);
                localStorage.setItem('users', JSON.stringify(users));
                return [200, {success: true, message: "Utilisateur ajouté avec succès"}];
            }
        });

        this.mock.onGet(prefixUsers).reply(200, JSON.parse(localStorage.getItem('users') || '[]'));
    }

    addUser(data: Assignee) {
        return this.api.post(prefixUsers, data);
    }

    getUsers() {
        return this.api.get(prefixUsers);
    }
}

export default Services;
