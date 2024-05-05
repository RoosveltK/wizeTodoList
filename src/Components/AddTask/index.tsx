import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import Services from "../../services";
import {Assignee, Label, LABEL_OPTIONS, Priority, PRIORITY_OPTIONS, Todo} from "../../models";
import Select, {SelectOption} from "../Select";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MultiSelect from "../MultiSelect";
import InputDate from "../InputDate";
import dayjs from "dayjs";


const AddTask = (props: {
    open: boolean;
    onCancel: () => void;
    actualiseDatas?: (data: Todo) => void;
    task?: Todo | null,
    users?: Assignee[]
}) => {
    const {open, onCancel, actualiseDatas, task, users = []} = props;
    const service = new Services(true);

    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [assignee, setAssignee] = useState<Assignee>(null);
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>(null);
    const [endDate, setEndDate] = useState<string>(null);
    const [priority, setPriority] = useState<string>('');
    const [labels, setLabels] = useState<Label[]>([]);

    const [error, setError] = useState<Object>({});

    const initData = (todo: Todo) => {
        console.log('task', task)
        setTitle(todo.titre)
        setLabels(todo.labels)
        setAssignee(todo.assignee)
        setStartDate(todo.startDate ? dayjs(todo.startDate).format('YYYY-DD-MM') : null)
        setPriority(todo.priority)
        setDescription(todo.description)
    }
    const resetField = () => {
        setTitle('');
        setDescription('');
        setStartDate(null);
        setEndDate(null);
        setPriority('');
        setLabels([]);
    }

    useEffect(() => {
        if (task) {
            initData(task)
        }
    }, [task])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        switch (name) {
            case 'title':
                setTitle(value)
                break;
            case 'description':
                setDescription(value)
                break;
            case 'startDate':
                setStartDate(value)
                break;
            case 'priority':
                setPriority(value)
                break;
            default:
                break;
        }
    }
    const titleValidation = (name: string) => name.trim().length >= 3

    const onSubmit = () => {
        setLoading(true)
        setError({})
        const errors = {}
        if (!titleValidation(title)) {
            errors.title = 'Le Titre doit contenir au moins 3 caractères'
        }
        if (!assignee) {
            errors.assignee = 'Veuillez choisir une personne'
        }

        if (Object.keys(errors).length > 0) {
            setError(errors)
            setLoading(false)
            return;
        }

        const data: Todo = {
            ...task,
            titre: title,
            assignee,
            startDate,
            endDate,
            priority: priority as Priority,
            labels,
            description
        }

        if (task) {
            setTimeout(() => {
                service.editTodo({id: data?.id, todo: data})
                    .then(() => {
                        resetField()
                        if (actualiseDatas) {
                            actualiseDatas(data)
                        }
                        onCancel()
                    })
                    .catch((err) => {
                        try {
                            const {response} = err
                            setError(response.data)
                        } catch (e) {
                            console.log('e', e)
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }, 500)
        } else {
            setTimeout(() => {
                service.addTodo(data)
                    .then((resp) => {
                        const {data} = resp
                        resetField()
                        if (actualiseDatas) {
                            actualiseDatas(data.data)
                        }
                        onCancel()
                    })
                    .catch((err) => {
                        try {
                            const {response} = err
                            setError(response.data)
                        } catch (e) {
                            console.log('e', e)
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }, 500)
        }
    }


    return (
        <>
            <Modal
                width={1000}
                open={open}
                onCancel={onCancel}
                title={`${task ? 'Modifier une tâche' : 'Ajouter une tâche'}`}
                footer={[
                    <Button onClick={onCancel} className={'mr-2'} key={'cancel'}>
                        Annuler
                    </Button>,
                    <Button loading={loading} onClick={onSubmit} className={'bg-primary text-white'} key={'submit'}>
                        {task ? 'Modifier' : 'Ajouter'}
                    </Button>
                ]}
            >
                <div>
                    <div className={'mb-3'}>
                        <Input
                            placeholder={'Donnez un titre à la tâche'}
                            value={title}
                            name={'title'}
                            onChange={onChange}
                            id={'name'}
                            className={`${error?.title ? 'border-2 border-danger' : ''}`}
                        />
                        <small className={'text-danger'}>{error?.title}</small>
                    </div>
                    <div className={'grid grid-cols-1 xl:grid-cols-4 xl:gap-y-0 gap-y-2  mb-3 gap-x-4'}>
                        <div>
                            <Autocomplete
                                disablePortal
                                className={`bg-gray-50 border text-gray-900 rounded-lg ${error?.assignee ? 'border-2 border-danger' : ' border-gray-300'}`}
                                options={users}
                                sx={{width: '100%'}}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Personne"/>}
                                onChange={(event, value: Assignee) => setAssignee(value)}
                                value={assignee}
                            />
                            <small className={'text-danger'}>{error?.assignee}</small>
                        </div>


                        <div>
                            <InputDate
                                value={startDate}
                                name={'startDate'}
                                placeholder={'Date de début'}
                                type="date"
                                onChange={onChange}
                                className={`${error?.startDate ? 'border-2 border-danger' : ''}`}
                            />
                        </div>


                        <div>
                            <Select
                                options={PRIORITY_OPTIONS}
                                name={'priority'}
                                placeholder={'Priorité'}
                                onChange={onChange}
                                value={priority}
                            />
                        </div>


                        <div>
                            <MultiSelect
                                onChange={setLabels}
                                name={'label'}
                                placeholder={'Label'}
                                options={LABEL_OPTIONS}
                                value={labels}
                            />
                        </div>

                    </div>

                    <div className={'mb-3'}>
                        <textarea
                            name={'description'}
                            value={description}
                            onChange={onChange}
                            rows="4"
                            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Description de la tâche ..."
                        />
                    </div>

                </div>
            </Modal>
        </>
    );
};
export default AddTask