import {Assignee} from "./Assignee.tsx";


export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export const PRIORITY_OPTIONS = [
    {value: Priority.HIGH, label: 'high'},
    {value: Priority.MEDIUM, label: "medium"},
    {value: Priority.LOW, label: "low"}
]

export const LABEL_OPTIONS = [
    {value: Label.BUG, label: "bug"},
    {value: Label.FEATURE, label: "feature"},
    {value: Label.IMPROVEMENT, label: "improvement"},
    {value: Label.DEPLOY, label: "deploy"}
]

export enum Label {
    BUG = "BUG",
    FEATURE = "FEATURE",
    IMPROVEMENT = "IMPROVEMENT",
    DEPLOY = "DEPLOY",
}

export interface Todo {
    id?: string
    titre: string
    assignee: Assignee
    startDate?: Date
    endDate?: Date
    priority?: Priority
    labels?: Label[]
    description?: string
}