import {Button} from "@/components/Button";
import {toast} from "react-toastify";
import axios from "@/lib/axios";
import {useState} from "react";

export default function Form({token, form}) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post('/forms', {
                link: form.link,
            }, {
                headers: {
                    Authorization: token
                }
            });
            toast.success('Form submitted successfully');
        }catch (e) {
            toast.error(e.message)
        }finally {
            setLoading(false);
        }
    }

    return (
        <li className="rounded-2xl border border-gray-200 p-8">
            <h3 className="font-bold text-xl text-gray-900">
                {form.name}
            </h3>
            <p className="mt-2 text-gray-700">{form.description}</p>
            <Button type="button" className="flex-none mt-8" onClick={handleSubmit}>
                {loading ? 'Filling...' : 'Auto Fill'}
            </Button>
        </li>
    )
}
