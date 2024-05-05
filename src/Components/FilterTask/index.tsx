import Input from "../Input";
import React from "react";
import MultiSelect from "../MultiSelect";
import {Priority, Todo} from "../../models";
import {useTranslation} from 'react-i18next';

export enum FILTERS_KEYS {
    COMPLETED = 'completed',
    NOT_COMPLETED = 'not_completed',
    PRIORITY_LOW = 'priority_low',
    PRIORITY_MEDIUM = 'priority_medium',
    PRIORITY_HIGH = 'priority_high',
}


const FilterTask = ({onFilter, todos}) => {
    const [filters, setFilters] = React.useState<string[]>([])
    const [search, setSearch] = React.useState<string>('')
    const {t} = useTranslation();

    const FILTERS_OPTIONS = [
        {value: FILTERS_KEYS.COMPLETED, label: t('end')},
        {value: FILTERS_KEYS.NOT_COMPLETED, label: t('pending')},
        {value: FILTERS_KEYS.PRIORITY_LOW, label: t('low priority')},
        {value: FILTERS_KEYS.PRIORITY_MEDIUM, label: t('medium priority')},
        {value: FILTERS_KEYS.PRIORITY_HIGH, label: t('high priority')},
    ]

    const onFilters = (value: string[]) => {
        setFilters(value);

        let filteredTodos = [...todos];

        if (value.includes(FILTERS_KEYS.COMPLETED)) {
            filteredTodos = filteredTodos.filter(todo => todo.endDate !== null);
        }
        if (value.includes(FILTERS_KEYS.NOT_COMPLETED)) {
            filteredTodos = filteredTodos.filter(todo => todo.endDate === null);
        }
        if (value.includes(FILTERS_KEYS.PRIORITY_LOW)) {
            filteredTodos = filteredTodos.filter(todo => todo.priority === Priority.LOW);
        }
        if (value.includes(FILTERS_KEYS.PRIORITY_MEDIUM)) {
            filteredTodos = filteredTodos.filter(todo => todo.priority === Priority.MEDIUM);
        }
        if (value.includes(FILTERS_KEYS.PRIORITY_HIGH)) {
            filteredTodos = filteredTodos.filter(todo => todo.priority === Priority.HIGH);
        }

        onFilter(filteredTodos);
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const filteredTodos = todos.filter((user: Todo) => {
            const titreMatches = user.titre.toLowerCase().includes(searchTerm);
            const assigneeMatches = user.assignee.name.toLowerCase().includes(searchTerm);

            return titreMatches || assigneeMatches
        });

        onFilter(filteredTodos);
    }


    return (
        <>
            <div className={'flex flex-col lg:flex-row gap-y-2 w-full space-x-3 items-center'}>
                <MultiSelect
                    value={filters}
                    onChange={onFilters}
                    options={FILTERS_OPTIONS}
                    placeholder={t('filter')}
                    className={'w-100'}
                />

                <Input onChange={onSearch} value={search} placeholder={t('search by')}/>
            </div>
        </>
    );
};
export default FilterTask