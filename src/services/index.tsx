import axios, {AxiosInstance} from "axios";
import MockAdapter from "axios-mock-adapter";
import {Assignee} from "../models";
import {getUrl} from "../configServer.tsx";

const prefixUsers = '/users'
const APP_KEY = {
    USERS: "users",
    TODOS: "todos"
}

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
            const users = JSON.parse(localStorage.getItem(APP_KEY.USERS) || '[]')

            const search = users.find((user: Assignee) => user.name === data.name)
            if (search) {
                return [400, {success: false, name: "Un utilisateur avec ce nom existe déjà"}];
            } else {
                users.unshift(data);
                localStorage.setItem(APP_KEY.USERS, JSON.stringify(users));
                return [200, {success: true, message: "Utilisateur ajouté avec succès"}];
            }
        });

        this.mock.onPut(prefixUsers).reply((config) => {
            const {name, data} = JSON.parse(config.data);
            const users = JSON.parse(localStorage.getItem(APP_KEY.USERS) || '[]');

            const index = users.findIndex(user => user.name === name);
            if (index !== -1) {
                users[index] = {...users[index], ...data};
                localStorage.setItem(APP_KEY.USERS, JSON.stringify(users));
                return [200, {success: true, message: "Utilisateur modifié avec succès"}];
            } else {
                return [404, {success: false, message: "Utilisateur introuvable"}];
            }
        });

        this.mock.onDelete(new RegExp(`${prefixUsers}/(.+)`)).reply((config) => {
            const name = config.url?.split("/").pop();
            const users = JSON.parse(localStorage.getItem(APP_KEY.USERS) || '[]');
            if (name) {
                const index = users.findIndex(user => user.name === name);
                if (index !== -1) {
                    users.splice(index, 1);
                    localStorage.setItem(APP_KEY.USERS, JSON.stringify(users));
                    return [200, { success: true, message: "Utilisateur supprimé avec succès" }];
                } else {
                    return [404, { success: false, message: "Utilisateur introuvable" }];
                }
            } else {
                return [400, { success: false, message: "Invalid request" }];
            }
        });

        this.mock.onGet(prefixUsers).reply(200, JSON.parse(localStorage.getItem(APP_KEY.USERS) || '[]'));
    }

    addUser(data: Assignee) {
        return this.api.post(prefixUsers, data);
    }

    editUser(data:{name: string, data: Assignee}) {
        return this.api.put(prefixUsers, data);
    }

    deleteUser(name: string) {
        return this.api.delete(`${prefixUsers}/${name}`);
    }

    getUsers() {
        return this.api.get(prefixUsers);
    }
}

export default Services;
