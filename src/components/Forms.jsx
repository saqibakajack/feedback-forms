import {Container} from '@/components/Container'
import Form from "@/components/Form";
import {Button} from "@/components/Button";
import {useState} from "react";
import Modal from "@/components/Modal";

export function Forms({forms = [], token}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <section
            id="secondary-features"
            aria-label="Forms"
            className="mt-12 pb-12"
        >
            <Container>
                <div className='flex justify-between'>
                    <h1 className="text-4xl font-black tracking-tight text-gray-900">
                        Active Forms
                    </h1>
                    <div>
                        <Button className="" onClick={() => setShowModal(true)}>
                            Auto Fill All
                        </Button>
                    </div>
                </div>
                {forms.length === 0 ? (
                    <p className='mt-6'>No Forms found!</p>
                ) : (
                    <ul
                        role="list"
                        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
                    >
                        {forms.map((form) => (
                            <Form form={form} key={form.name} token={token}/>
                        ))}
                    </ul>
                )}
            </Container>

            <Modal open={showModal} setOpen={setShowModal} token={token} forms={forms}/>
        </section>
    )
}
