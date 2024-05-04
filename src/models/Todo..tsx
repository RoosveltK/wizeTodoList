import {Assignee} from "./Assignee.tsx";


export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export enum Label {
    BUG = "BUG",
    FEATURE = "FEATURE",
    IMPROVEMENT = "IMPROVEMENT",
    TASK = "TASK"
}

export interface Todo {
    titre: string
    assignee: Assignee
    startDate: Date
    endDate: Date
    priority: Priority
    labels: Label[]
    description: string
}