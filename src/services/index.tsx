import axios, {AxiosInstance} from "axios";
import MockAdapter from "axios-mock-adapter";
import {Assignee, Priority, Todo} from "../models";
import {getUrl} from "../configServer.tsx";
import {v4 as uuidv4} from "uuid";

const prefixUsers = '/users'
const prefixTodos = '/todos'

export const APP_KEY = {
    USERS: "users",
    TODOS: "todos",
    LANG:'lang'
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

        // Assignee
        this.mock.onPost(prefixUsers).reply((config) => {
            const data: Assignee = JSON.parse(config.data);
            const users = JSON.parse(localStorage.getItem(APP_KEY.USERS) || '[]')

            const search = users.find((user: Assignee) => user.name === data.name)
            if (search) {
                return [400, {success: false, name: "Un utilisateur avec ce nom existe déjà"}];
            } else {
                users.unshift(data);
                this.saveUsers(users);
                return [200, {success: true, message: "Utilisateur ajouté avec succès"}];
            }
        });
        this.mock.onPut(prefixUsers).reply((config) => {
            const {name, data} = JSON.parse(config.data);
            const users = JSON.parse(localStorage.getItem(APP_KEY.USERS) || '[]');

            const index = users.findIndex(user => user.name === name);
            if (index !== -1) {
                users[index] = {...users[index], ...data};
                this.saveUsers(users);
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
                    this.saveUsers(users);
                    return [200, {success: true, message: "Utilisateur supprimé avec succès"}];
                } else {
                    return [404, {success: false, message: "Utilisateur introuvable"}];
                }
            } else {
                return [400, {success: false, message: "Invalid request"}];
            }
        });
        this.mock.onGet(prefixUsers).reply(200, JSON.parse(localStorage.getItem(APP_KEY.USERS) || '[]'));

        // Todos
        this.mock.onPost(prefixTodos).reply((config) => {
            const todos = JSON.parse(localStorage.getItem(APP_KEY.TODOS) || '[]')
            const data = JSON.parse(config.data);
            const todo = this.createTodoFromData(data);
            todos.unshift(todo);
            this.saveTodos(todos);
            return [200, {success: true, message: "Tache ajouté avec  succès", data:todo}];
        });

        this.mock.onPut(prefixTodos).reply((config) => {
            const {id, todo} = JSON.parse(config.data);
            const todos = JSON.parse(localStorage.getItem(APP_KEY.TODOS) || '[]');
            const index = todos.findIndex((t: Todo) => t.id === id);
            if (index !== -1) {
                todos[index] = todo;
                this.saveTodos(todos);
                return [200, {success: true, message: "Tache mis à jour"}];
            } else {
                return [404, {success: false, message: "Tache introuvable"}];
            }
        });
        this.mock.onDelete(new RegExp(`${prefixTodos}/(.+)`)).reply((config) => {
            const id = config.url?.split("/").pop();
            const todos = JSON.parse(localStorage.getItem(APP_KEY.TODOS) || '[]');
            if (id) {
                const index = todos.findIndex((t: Todo) => t.id === id);
                if (index !== -1) {
                    todos.splice(index, 1);
                    this.saveTodos(todos);
                    return [200, {success: true, message: "Tache supprimé avec succès"}];
                } else {
                    return [404, {success: false, message: "Tache introuvable"}];
                }
            } else {
                return [400, {success: false, message: "Invalid request"}];
            }
        });
        this.mock.onGet(prefixTodos).reply(200, JSON.parse(localStorage.getItem(APP_KEY.TODOS) || '[]'));

    }

    private saveTodos(todos: Todo[]) {
        localStorage.setItem(APP_KEY.TODOS, JSON.stringify(todos));
    }

    private saveUsers(users: Assignee[]) {
        localStorage.setItem(APP_KEY.USERS, JSON.stringify(users));
    }

    private createTodoFromData(data: any): Todo {
        const currentDate = new Date();
        const todo: Todo = {
            id: uuidv4(),
            titre: data.titre,
            assignee: data.assignee,
            startDate: data.startDate || currentDate,
            endDate: data.endDate,
            priority: data.priority || Priority.MEDIUM,
            labels: data.labels || [],
            description: data.description
        };
        return todo;
    }


    addTodo(data: Todo) {
        return this.api.post(prefixTodos, data);
    }

    editTodo(data: { id: string|undefined, todo: Todo }) {
        return this.api.put(prefixTodos, data);
    }

    deleteTodo(id: string) {
        return this.api.delete(`${prefixTodos}/${id}`);
    }

    getTodos() {
        return this.api.get(prefixTodos);
    }


    addUser(data: Assignee) {
        return this.api.post(prefixUsers, data);
    }

    editUser(data: { name: string, data: Assignee }) {
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
