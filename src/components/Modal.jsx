import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {Button} from "@/components/Button";
import axios from "@/lib/axios";
import {toast} from "react-toastify";

export default function Modal({open, setOpen, token, forms: initialForms}) {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState(initialForms.map(form => ({...form, status: 'Not Submitted'})))

    const handleSubmit = async () => {
        setLoading(true)
        try {
            for (let i = 0; i < forms.length; i++) {
                setForms(prev => prev.map((form, index) => {
                    if (index === i) {
                        return {...form, status: 'Submitting'}
                    }
                    return form
                }))
                try {
                    await axios.post('/forms', {
                        link: forms[i].link,
                    }, {
                        headers: {
                            Authorization: token
                        }
                    })
                } catch (e) {
                    setForms(prev => prev.map((form, index) => {
                        if (index === i) {
                            return {...form, status: 'Already Submitted or Expired'}
                        }
                        return form
                    }))
                }
                setForms(prev => prev.map((form, index) => {
                    if (index === i) {
                        return {...form, status: 'Submitted'}
                    }
                    return form
                }))
            }
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <div className="bg-white p-8">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">
                                                Forms
                                            </Dialog.Title>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Your fav tool `Qalam` will take more than a decade to fill all these
                                                forms. Please be patient. You can do other things while we are filling
                                                but don&apos;t close this tab.
                                            </p>
                                            <div className="mt-2 w-full">
                                                <div
                                                    className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                    <table className="min-w-full divide-y divide-gray-300">
                                                        <thead>
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                                            >
                                                                Name
                                                            </th>
                                                            <th scope="col"
                                                                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                                                Status
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200">
                                                        {forms.map((form) => (
                                                            <tr key={form.name}>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                                                                    {form.name}
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{form.status}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:flex sm:flex-row-reverse mt-6">
                                        <Button className="" onClick={handleSubmit} disabled={loading}>
                                            {loading ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
