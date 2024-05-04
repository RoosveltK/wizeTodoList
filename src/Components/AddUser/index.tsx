import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import Services from "../../services";
import {Assignee} from "../../models";

const AddUser = (props: {
    open: boolean;
    onCancel: () => void;
    actualiseDatas: (data: Assignee) => void;
    user?: Assignee | null
}) => {
    const {open, onCancel, actualiseDatas, user} = props;
    const service = new Services(true);

    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<Object>({});

    const initData = (user: Assignee) => {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
    }
    const resetField = () => {
        setName('')
        setEmail('')
        setPhone('')
    }

    useEffect(() => {
        if (user) {
            initData(user)
        }
    }, [user])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
        }
    }
    const nameValidation = (name: string) => name.trim().length >= 3
    const emailValidation = (email: string) => email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

    const onSubmit = () => {
        setLoading(true)
        setError({})
        const errors = {}
        if (!nameValidation(name)) {
            errors.name = 'Le nom doit contenir au moins 3 caractères'
        }
        if (!emailValidation(email)) {
            errors.email = 'Veuillez entrer un email valide'
        }
        if (Object.keys(errors).length > 0) {
            setError(errors)
            setLoading(false)
            return;
        }
        const data: Assignee = {name, email, phone}


        if (user) {
            setTimeout(() => {
                service.editUser({name: data.name, data})
                    .then(() => {
                        resetField()
                        actualiseDatas(data)
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
                service.addUser(data)
                    .then(() => {
                        resetField()
                        actualiseDatas(data)
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
                open={open}
                onCancel={onCancel}
                title={`${user ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}`}
                footer={[
                    <Button onClick={onCancel} className={'mr-2'} key={'cancel'}>
                        Annuler
                    </Button>,
                    <Button loading={loading} onClick={onSubmit} className={'bg-primary text-white'} key={'submit'}>
                        {user ? 'Modifier' : 'Ajouter'}
                    </Button>
                ]}
            >
                <div>
                    <div className={'mb-3'}>
                        <Input
                            label={'Nom'}
                            placeholder={'Entrez le nom de la personne'}
                            value={name}
                            name={'name'}
                            onChange={onChange}
                            id={'name'}
                            className={`${error?.name ? 'border-2 border-danger' : ''}`}
                            disabled={!!user}
                        />
                        <small className={'text-danger'}>{error?.name}</small>
                    </div>
                    <div className={'mb-3'}>
                        <Input
                            label={'Email'}
                            placeholder={'Entrez l\'email la personne'}
                            value={email}
                            name={'email'}
                            onChange={onChange}
                            id={'email'}
                            type={'email'}
                            className={`${error?.email ? 'border-2 border-danger' : ''}`}
                        />
                        <small className={'text-danger'}>{error?.email}</small>
                    </div>
                    <div className={'mb-3'}>
                        <Input
                            label={'Téléphone'}
                            placeholder={'Entrez le numéro de téléphone de la personne'}
                            value={phone}
                            name={'phone'}
                            onChange={onChange}
                            id={'phone'}
                            type={'number'}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default AddUser