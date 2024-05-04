import React, {MouseEventHandler, ReactNode} from 'react';
import {CloseIcon} from "../../utils.tsx";
import Button from "../Button";

const Modal = (props: {
    children?: ReactNode;
    bodyClassName?: string;
    title?: string;
    open: boolean;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    onConfirm?: MouseEventHandler<HTMLButtonElement>;
    footer?: ReactNode;
}) => {
    const {children, title, open, onCancel,onConfirm, footer, bodyClassName} = props;
    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative p-4 w-full max-w-2xl">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    onClick={onCancel}
                                >
                                    <CloseIcon/>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className={`p-4 md:p-5 space-y-4 ${bodyClassName}`}>
                                {children}
                            </div>
                            <div
                                className="flex items-center justify-end p-4 md:p-5 border-t rounded-b">
                                {footer ? footer : (
                                    <>
                                        <Button onClick={onCancel} className={'mr-2'}>
                                            Annuler
                                        </Button>
                                        <Button onClick={onConfirm} className={'bg-primary text-white '}>
                                            Confirmer
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
