import React, {useEffect, useState} from 'react';
import Button from "../Components/Button";
import AddUser from "../Components/AddUser";
import Services from "../services";
import {GridColDef} from "@mui/x-data-grid";
import DataTable from "../Components/Table";
import {DeleteIcon, EditIcon, EyeIcon, TagICon} from "../utils.tsx";
import {Assignee, Priority, Todo} from "../models";
import Modal from "../Components/Modal";
import Input from "../Components/Input";
import AddTask from "../Components/AddTask";
import dayjs from "dayjs";
import DetailTask from "../Components/DetailTask";



export  const renderPriority = (priority: string) => {
    switch (priority) {
        case Priority.LOW:
            return <div className={'flex items-center'}> <TagICon className={'text-success mr-1'}/> Faible</div>
        case Priority.MEDIUM:
            return <div className={'flex items-center'}> <TagICon className={'text-info mr-1'}/> Normale</div>
        case Priority.HIGH:
            return <div className={'flex items-center'}> <TagICon className={'text-danger mr-1'}/>Elevée</div>
        default:
            return <div className={'flex items-center'}> <TagICon className={'text-info  mr-1'}/> Normale</div>
    }
}
const User = () => {
    const service = new Services(true);

    const [open, setOpen] = useState(false);
    const [allTodos, setAllTodos] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [users, setUsers] = useState<Assignee[]>([]);
    const [taskTemp, setTaskTemp] = useState<Todo>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [search, setSearch] = useState<string>('')
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




    const columns: GridColDef[] = [
        {field: 'titre', headerName: 'Titre', width: 250},
        {
            field: 'assignee',
            headerName: 'Assigné à',
            width: 100,
            renderCell: (params) => (
                <div className={'flex'}>
                    {params.row?.assignee?.name}
                </div>
            )
        },
        {
            field: 'startDate',
            headerName: 'Date début',
            width: 100,
            renderCell: (params) => (
                <div className={'flex'}>
                    {dayjs(params.row?.startDate).format('DD/MM/YYYY')}
                </div>
            )
        },
        {
            field: 'endDate',
            headerName: 'Date fin',
            width: 100,
            renderCell: (params) => (
                <div className={'text-center'}>
                    {params.row?.endDate ? dayjs(params.row?.endDate).format('DD/MM/YYYY') : '-'}
                </div>
            )
        },
        {
            field: 'priority',
            headerName: 'Priorité',
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
            width:200,
            renderCell: (params) => (
                <div className={'flex'}>
                    <Button
                        icon={<EditIcon className={'text-primary'}/>}
                        className={'border-none hover:bg-transparent'}
                        onClick={() => {
                            setTaskTemp(params.row)
                            onOpen()
                        }}
                    />

                    <Button
                        icon={<DeleteIcon className={'text-danger'}/>}
                        className={'border-none hover:bg-transparent'}
                        onClick={() => {
                            setTaskTemp(params.row)
                            onOpenD()
                        }}
                    />
                    <Button
                        icon={<EyeIcon className={'text-primary'}/>}
                        className={'border-none hover:bg-transparent'}
                        onClick={() => {
                            setTaskTemp(params.row)
                            openDetail()
                        }}
                    />
                </div>
            )

        },
    ];

    const onSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setSearch(e.target.value)
        // const temp = [...allUsers]
        // const search = temp.filter((elt: Assignee) => elt.name.toLowerCase().includes(e.target.value.toLowerCase()))
        // setUsers(search)
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

    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t mb-3">
                <h3 className="text-xl font-semibold text-gray-900">Liste des tâches</h3>
            </div>

            <div className={'flex justify-between'}>
                <div>
                    <Input
                        placeholder={'Rechercher...'}
                        value={search}
                        onChange={onSearchUser}
                    />
                </div>


                <Button
                    className={'px-8 py-2.5 mb-4'}
                    onClick={onOpen}
                    icon={
                        <svg className="w-6 h-6 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="M5 12h14m-7 7V5"/>
                        </svg>
                    }
                >
                    Ajouter une tâche
                </Button>
            </div>


            <DataTable
                columns={columns}
                dataSource={todos}
                getRowId={(row) => row.id}
            />

            <AddTask
                open={open}
                onCancel={onCancel}
                users={users}
                actualiseDatas={actualiseDatas}
                task={taskTemp}
            />
            
            <DetailTask open={openDe} onCancel={closeDetail} task={taskTemp}/>

            <Modal
                title={'Confirmation de suppression'}
                open={openDelete}
                onCancel={onCancelD}
                footer={[
                    <Button className={'mr-2'} onClick={onCancelD}>Annuler</Button>,
                    <Button
                        onClick={() => deleteTask(taskTemp?.id)}
                        className={'bg-danger text-white border-none border-danger  hover:bg-red-500'}>
                        Supprimer
                    </Button>
                ]}
            >
                <p>Voulez vous vraiment supprimer <span className={'font-semibold'}>{taskTemp?.titre}</span> ?</p>
            </Modal>
        </>
    );
};
export default User