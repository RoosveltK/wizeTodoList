import {Assignee} from "./Assignee.tsx";


export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export const PRIORITY_OPTIONS = [
    {value: Priority.HIGH, label: "Elevée"},
    {value: Priority.MEDIUM, label: "Normale"},
    {value: Priority.LOW, label: "Faible"}
]

export const LABEL_OPTIONS = [
    {value: Label.BUG, label: "Bug"},
    {value: Label.FEATURE, label: "Fonctionnalité"},
    {value: Label.IMPROVEMENT, label: "Amélioration"},
    {value: Label.DEPLOY, label: "Deployé"}
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