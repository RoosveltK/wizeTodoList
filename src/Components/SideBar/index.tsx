import React, {useEffect, useRef, useState} from 'react';
import Button from "../Button";
import {routes} from "../../routes.tsx";
import {NavLink} from "react-router-dom";
import Select from "../Select";
import {useTranslation} from 'react-i18next';
import {APP_KEY} from "../../services";


interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}


const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {

    const {t, i18n} = useTranslation();
    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);
    const [lang, setLang] = useState(localStorage.getItem(APP_KEY.LANG)|| 'fr');


    const LANG = [
        {label: 'Français', value: 'fr'},
        {label: 'Anglais', value: 'en'}
    ]


    const changeLang = (e) => {
        const {value} = e.target
        setLang(value)

        localStorage.setItem(APP_KEY.LANG, value)
        i18n.changeLanguage(value);
    }
    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');

    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);


    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-50 flex h-screen xl:w-72 xl:m-2  rounded-2xl flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="mt-4 px-2 text-end">
                <Button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden rounded-sm"
                    icon={(
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    )}
                />
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <div className={'px-4 my-2'}>
                    <Select placeholder={t('change lang')} options={LANG} value={lang} onChange={changeLang}/>
                </div>
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}

                    <div>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {routes.map((route) => {
                                return (
                                    <li>
                                        <NavLink to={`${route.path}`} className={'no-underline'}>
                                            {({isActive}) => (
                                                <span
                                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${isActive ? 'rounded-r-lg bg-graydark font-semibold text-primary-2 bg-primary-3' : ''}`}>
                                                     {route.icon}
                                                    {t(route.name)}
                                                </span>
                                            )}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
