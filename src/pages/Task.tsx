import React, {useEffect, useState} from 'react';
import Button from "../Components/Button";
import Services from "../services";
import {GridColDef} from "@mui/x-data-grid";
import DataTable from "../Components/Table";
import {CheckIcon, DeleteIcon, EditIcon, EyeIcon, TagICon} from "../utils.tsx";
import {Assignee, Priority, Todo} from "../models";
import Modal from "../Components/Modal";
import AddTask from "../Components/AddTask";
import dayjs from "dayjs";
import DetailTask from "../Components/DetailTask";
import FilterTask from "../Components/FilterTask";
import { useTranslation } from 'react-i18next';



const Task = () => {
    const service = new Services(true);

    const { t } = useTranslation();

    const renderPriority = (priority: string) => {
        switch (priority) {
            case Priority.LOW:
                return <div className={'flex items-center'}><TagICon className={'text-success mr-1'}/>{t('low')}</div>
            case Priority.MEDIUM:
                return <div className={'flex items-center'}><TagICon className={'text-info mr-1'}/>{t('medium')}</div>
            case Priority.HIGH:
                return <div className={'flex items-center'}><TagICon className={'text-danger mr-1'}/>{t('high')}</div>
            default:
                return <div className={'flex items-center'}><TagICon className={'text-info  mr-1'}/>{t('low')}</div>
        }
    }

    const [open, setOpen] = useState(false);
    const [allTodos, setAllTodos] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [users, setUsers] = useState<Assignee[]>([]);
    const [taskTemp, setTaskTemp] = useState<Todo>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDe, setOpenDe] = useState(false)

    useEffect(() => {
        getTodos()
        getUsers()
    }, [])


    const getTodos = () => {
        service.getTodos()
            .then((res) => {
                setTodos(res.data)
                setAllTodos(res.data)
            })
    }
    const getUsers = () => {
        service.getUsers()
            .then((res) => {
                setUsers(res.data)
            })
    }

    const deleteTask = (id: string) => {
        service.deleteTodo(id)
            .then(() => {
                const temp = [...todos]
                const search = temp.findIndex((elt: Todo) => elt.id === id)
                temp.splice(search, 1)
                setTodos(temp)
                onCancelD()
            })
    }

    const openDetail = () => {
        setOpenDe(true)
    }
    const closeDetail = () => {
        setOpenDe(false)
        setTaskTemp(null)
    }

    const onOpenD = () => {
        setOpenDelete(true)
    }
    const onCancelD = () => {
        setOpenDelete(false)
        setTaskTemp(null)
    }

    const onOpen = () => {
        setOpen(true);
    }

    const onCancel = () => {
        setOpen(false)
        setTaskTemp(null)
    }


    const actualiseDatas = (data: Todo) => {
        const temp = [...todos]
        const search = temp.findIndex((elt: Todo) => elt.id === data.id)
        if (search === -1)
            temp.unshift(data)
        else
            temp[search] = data

        setTodos(temp)
        setAllTodos(temp)
    }

    const completeTask = (todo: Todo) => {
        const data = {
            ...todo,
            endDate: new Date()
        }

        service.editTodo({id: data?.id, todo: data})
            .then(() => {
                actualiseDatas(data)
                onCancel()
            })
            .catch((err) => {
                try {
                    const {response} = err
                } catch (e) {
                    console.log('e', e)
                }
            })
    }

    const onFilter = (filteredTodos: Todo[]) => {
        setTodos(filteredTodos)
    }

    const columns: GridColDef[] = [
        {field: 'titre', headerName: t('title'), width: 250},
        {
            field: 'assignee',
            headerName: t('assign at'),
            width: 100,
            renderCell: (params) => (
                <div className={'flex'}>
                    {params.row?.assignee?.name}
                </div>
            )
        },
        {
            field: 'startDate',
            headerName: t('startAt'),
            width: 100,
            renderCell: (params) => (
                <div className={'flex'}>
                    {dayjs(params.row?.startDate).format('DD/MM/YYYY')}
                </div>
            )
        },
        {
            field: 'endDate',
            headerName:t('endAt'),
            width: 100,
            renderCell: (params) => (
                <div className={'text-center'}>
                    {params.row?.endDate ? dayjs(params.row?.endDate).format('DD/MM/YYYY') : '-'}
                </div>
            )
        },
        {
            field: 'priority',
            headerName: t('priority'),
            width: 150,
            renderCell: (params) => (
                <div className={'text-center'}>
                    {renderPriority(params.row.priority)}
                </div>
            )
        },
        {
            field: 'action',
            headerName: 'Actions',
            sortable: false,
            width: 300,
            renderCell: (params) => (
                <div className={'flex'}>
                    {!params.row.endDate && (
                        <Button
                            icon={<EditIcon className={'text-primary'}/>}
                            className={'border-none hover:bg-transparent px-2'}
                            onClick={() => {
                                setTaskTemp(params.row)
                                onOpen()
                            }}
                        />
                    )}

                    <Button
                        icon={<DeleteIcon className={'text-danger'}/>}
                        className={'border-none hover:bg-transparent px-2'}
                        onClick={() => {
                            setTaskTemp(params.row)
                            onOpenD()
                        }}
                    />
                    <Button
                        icon={<EyeIcon className={'text-primary'}/>}
                        className={'border-none hover:bg-transparent px-2'}
                        onClick={() => {
                            setTaskTemp(params.row)
                            openDetail()
                        }}
                    />
                </div>
            )

        },
        {
            field: '--',
            headerName: '',
            sortable: false,
            width: 300,
            renderCell: (params) => (
                <div className={'flex'}>
                    {params.row.endDate ? (
                        <span className={'text-success italic'}>
                            {t('task finish')}
                        </span>
                    ) : (
                        <Button
                            icon={<CheckIcon className={'text-success'}/>}
                            className={'bg-success hover:bg-transparent hover:text-success text-white px-2'}
                            onClick={() => {
                                completeTask(params.row)
                            }}
                        >
                            {t('mark complete')}
                        </Button>
                    )}
                </div>
            )

        },
    ];


    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{t('list task')}</h3>
            </div>

            <div className={'flex flex-col lg:flex-row  gap-y-2 justify-between mb-7'}>
                <div>
                    <FilterTask onFilter={onFilter} todos={allTodos}/>
                </div>

                <div>
                    <Button
                        className={'px-8 py-2'}
                        onClick={onOpen}
                        icon={
                            <svg className="w-6 h-6 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                        }
                    >
                        {t('add task')}
                    </Button>
                </div>
            </div>


            <DataTable
                columns={columns}
                dataSource={todos}
                getRowId={(row) => row.id}
            />

            {open && (
                <AddTask
                    open={open}
                    onCancel={onCancel}
                    users={users}
                    actualiseDatas={actualiseDatas}
                    task={taskTemp}
                />
            )}


            <DetailTask open={openDe} onCancel={closeDetail} task={taskTemp}/>

            <Modal
                title={t('confirm delete')}
                open={openDelete}
                onCancel={onCancelD}
                footer={[
                    <Button className={'mr-2'} onClick={onCancelD}>{t('cancel')}</Button>,
                    <Button
                        onClick={() => deleteTask(taskTemp?.id)}
                        className={'bg-danger text-white border-none border-danger  hover:bg-red-500'}>
                        {t('delete')}
                    </Button>
                ]}
            >
                <p>{t('ask delete')} <span className={'font-semibold'}>{taskTemp?.titre}</span> ?</p>
            </Modal>
        </>
    );
};
export default Task