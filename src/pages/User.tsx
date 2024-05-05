import React, {MouseEventHandler, useEffect, useState} from 'react';
import Button from "../Components/Button";
import AddUser from "../Components/AddUser";
import Services from "../services";
import {GridColDef} from "@mui/x-data-grid";
import DataTable from "../Components/Table";
import {DeleteIcon, EditIcon} from "../utils.tsx";
import {Assignee} from "../models";
import Modal from "../Components/Modal";
import Input from "../Components/Input";
import { useTranslation } from 'react-i18next';

const User = () => {
    const { t } = useTranslation();
    const service = new Services(true);
    const [open, setOpen] = useState(false);
    const [allUsers, setAllUsers] = useState<Assignee[]>([]);
    const [users, setUsers] = useState<Assignee[]>([]);
    const [userTemp, setUserTemp] = useState<Assignee>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = () => {
        service.getUsers()
            .then((res) => {
                setUsers(res.data)
                setAllUsers(res.data)
            })
    }

    const deleteUser = (name: string) => {
        service.deleteUser(name)
            .then(() => {
                const temp = [...users]
                const search = temp.findIndex((elt: Assignee) => elt.name === name)
                temp.splice(search, 1)
                setUsers(temp)
                setAllUsers(temp)
                onCancelD()
            })
    }

    const onOpenD = () => {
        setOpenDelete(true)
    }
    const onCancelD = () => {
        setOpenDelete(false)
        setUserTemp(null)
    }

    const onOpen = () => {
        setOpen(true);
    }

    const onCancel = () => {
        setOpen(false)
        setUserTemp(null)
    }

    const actualiseDatas = (data: Assignee) => {
        const temp = [...users]

        const search = temp.findIndex((elt: Assignee) => elt.name === data.name)
        if (search === -1)
            temp.unshift(data)
        else
            temp[search] = data

        setUsers(temp)
        setAllUsers(temp)
    }

    const columns: GridColDef[] = [
        {field: 'name', headerName: t('name'), width: 200},
        {field: 'email', headerName: 'Email', width: 200},
        {
            field: 'phone',
            headerName: t('phone'),
            width: 130
        },
        {
            field: 'action',
            headerName: 'Actions',
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <div className={'flex'}>
                    <Button
                        icon={<DeleteIcon className={'text-danger'}/>}
                        className={'border-none hover:bg-transparent'}
                        onClick={() => {
                            setUserTemp(params.row)
                            onOpenD()
                        }}
                    />
                    <Button
                        icon={<EditIcon className={'text-primary'}/>}
                        className={'border-none hover:bg-transparent'}
                        onClick={() => {
                            setUserTemp(params.row)
                            onOpen()
                        }}
                    />
                </div>
            )

        },
    ];

    const onSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const filteredUsers = allUsers.filter((user: Assignee) => {
            const nameMatches = user.name.toLowerCase().includes(searchTerm);
            const emailMatches = user.email.toLowerCase().includes(searchTerm);
            const phoneMatches = user.phone?.toLowerCase().includes(searchTerm);

            return nameMatches || emailMatches || phoneMatches;
        });

        setUsers(filteredUsers);
    };


    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{t('person list')}</h3>
            </div>

            <div className={'flex justify-between mb-7'}>
                <div>
                    <Input
                        placeholder={t('search')}
                        value={search}
                        onChange={onSearchUser}
                    />
                </div>


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
                    {t('add person')}
                </Button>
            </div>


            <DataTable
                columns={columns}
                dataSource={users}
                getRowId={(row) => row.name}
            />

            <AddUser
                open={open}
                onCancel={onCancel}
                actualiseDatas={actualiseDatas}
                user={userTemp}
            />

            <Modal
                title={t('confirm delete')}
                open={openDelete}
                onCancel={onCancelD}
                footer={[
                    <Button className={'mr-2'} onClick={onCancelD}>{t('cancel')}</Button>,
                    <Button
                        onClick={() => deleteUser(userTemp?.name)}
                        className={'bg-danger text-white border-none border-danger  hover:bg-red-500'}>
                        {t('delete')}
                    </Button>
                ]}
            >
                <p>{t('ask delete')} <span className={'font-semibold'}>{userTemp?.name}</span> ?</p>
            </Modal>
        </>
    );
};
export default User