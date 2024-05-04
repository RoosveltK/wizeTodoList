import {useEffect, useState} from 'react';
import Button from "../Components/Button";
import AddUser from "../Components/AddUser";
import Services from "../services";

const User = () => {
    const service = new Services(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        service.getUsers()
            .then((res) => {
                console.log('res', res.data)
            })
    }, [])

    const onToggle = () => {
        setOpen(!open);
    }

    return (
        <>
            <h3>
                User
            </h3>
            <Button
                className={'px-8 py-2.5 mb-4'}
                onClick={onToggle}
                icon={
                    <svg className="w-6 h-6 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                }
            >
                add new user
            </Button>

            <AddUser open={open} onCancel={onToggle}/>
        </>
    );
};
export default User