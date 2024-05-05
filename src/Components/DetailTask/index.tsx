import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import Button from "../Button";
import {Priority, Todo} from "../../models";
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import {TagICon} from "../../utils.tsx";

const DetailTask = (props: {
    open: boolean;
    onCancel: () => void;
    task?: Todo | null,
}) => {

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

    const {open, onCancel, task} = props;
    const { t } = useTranslation();

    return (
        <>
            <Modal
                width={1000}
                open={open}
                onCancel={onCancel}
                title={<div className={'capitalize'}>{task?.titre}  <span className={'text-success italic text-sm'}>{task?.endDate ? t('end'):''}</span></div>}
                footer={[
                    <Button onClick={onCancel} className={'mr-2'} key={'cancel'}>
                        {t('close')}
                    </Button>,
                ]}
            >
                <div className={''}>
                    <div className={'mb-2'}>
                        <p className={'text-gray-500'}>{t('assign at')} : <span
                            className={'font-semibold'}>{task?.assignee?.name} / {task?.assignee?.email} </span></p>

                    </div>
                    <div className={'grid xl:grid-cols-2 grid-cols-1 mb-3'}>
                        <div className={''}>
                            <p className={'text-gray-500'}>{t('startAt')}: <span
                                className={'font-semibold'}>{task?.startDate ? dayjs(task?.startDate).format('DD/MM/YYYY') : '-'}</span>
                            </p>
                        </div>
                        <div className={''}>
                            <p className={'text-gray-500'}>{t('endAt')}: <span
                                className={'font-semibold'}>{task?.endDate ? dayjs(task?.endDate).format('DD/MM/YYYY') : '-'}</span>
                            </p>
                        </div>
                    </div>
                    <div className={'mb-3'}>
                        <div className={'text-gray-500 flex'}>{t('priority')}: <span
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