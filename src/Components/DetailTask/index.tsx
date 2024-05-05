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
import {renderPriority} from "../../pages/Task.tsx";


const DetailTask = (props: {
    open: boolean;
    onCancel: () => void;
    task?: Todo | null,
}) => {
    const {open, onCancel, actualiseDatas, task, users = []} = props;


    return (
        <>
            <Modal
                width={1000}
                open={open}
                onCancel={onCancel}
                title={<span className={'capitalize'}>{task?.titre}</span>}
                footer={[
                    <Button onClick={onCancel} className={'mr-2'} key={'cancel'}>
                        Fermer
                    </Button>,
                ]}
            >
                <div className={''}>
                    <div className={'mb-2'}>
                        <p className={'text-gray-500'}>Assigné à : <span
                            className={'font-semibold'}>{task?.assignee?.name} / {task?.assignee?.email} </span></p>

                    </div>
                    <div className={'grid xl:grid-cols-2 grid-cols-1 mb-3'}>
                        <div className={''}>
                            <p className={'text-gray-500'}>Date de début: <span
                                className={'font-semibold'}>{task?.startDate ? dayjs(task?.startDate).format('DD/MM/YYYY') : '-'}</span>
                            </p>
                        </div>
                        <div className={''}>
                            <p className={'text-gray-500'}>Date de fin: <span
                                className={'font-semibold'}>{task?.endDate ? dayjs(task?.endDate).format('DD/MM/YYYY') : '-'}</span>
                            </p>
                        </div>
                    </div>
                    <div className={'mb-3'}>
                        <div className={'text-gray-500 flex'}>Priorité: <span
                            className={'font-semibold'}>{renderPriority(task?.priority)}</span></div>
                    </div>

                    {task?.labels?.length > 0 && (
                        <div className={'mb-3'}>
                            <div className={'flex'}>
                                <span className={'text-gray-500'}>Labels :</span>
                                <div className={'flex'}>
                                    {task?.labels?.map((label, index) => (
                                        <span key={index} className={'bg-gray-200 rounded-full px-3 py-1 text-xs mr-1'}>
                                    {label}
                                </span>))}
                                </div>
                            </div>
                        </div>
                    )}


                    {task?.description && (
                        <div className={'flex-1'}>
                            <p className={'text-gray-500'}>Description</p>
                            <p>{task?.description}</p>
                        </div>
                    )}


                </div>
            </Modal>
        </>
    );
};
export default DetailTask