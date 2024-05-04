import {useState} from 'react'
import Sidebar from "./Components/SideBar";
import Button from "./Components/Button";
import  {Outlet} from 'react-router-dom'

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="bg-gray-100">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <div className="flex items-center gap-2 sm:gap-4 lg:hidden px-4 py-4">
                        <Button
                            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                            icon={(
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                                </svg>
                            )}
                        >
                                     <span className="relative block h-5.5 w-5.5 cursor-pointer">
                                      <span className="du-block absolute right-0 h-full w-full">
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                                                sidebarOpen && '!w-full delay-300'
                                            }`}
                                        ></span>
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                                                sidebarOpen && 'delay-400 !w-full'
                                            }`}
                                        ></span>
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                                                sidebarOpen && '!w-full delay-500'
                                            }`}
                                        ></span>
                                      </span>
                                      <span className="absolute right-0 h-full w-full rotate-45">
                                        <span
                                            className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                                                sidebarOpen && '!h-0 !delay-[0]'
                                            }`}
                                        ></span>
                                        <span
                                            className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                                                sidebarOpen && '!h-0 !delay-200'
                                            }`}
                                        ></span>
                                      </span>
                                    </span>
                        </Button>
                    </div>
                    <main className={'rounded-2xl bg-white m-2 mx-4'}>
                        <div className="shadow-lg p-4">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default App
