import {getSession} from "next-auth/react";
import {Header} from "@/components/Header";
import {Forms} from "@/components/Forms";
import axios from "@/lib/axios";
import {Footer} from "@/components/Footer";

const Home = ({forms = [], token}) => {
    return (
        <>
            <Header/>
            <Forms forms={forms} token={token}/>
            <Footer/>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    try {
        const {data} = await axios.get('/forms', {
            headers: {
                Authorization: session.user.token
            }
        })
        return {
            props: {
                forms: data,
                token: session.user.token
            }
        }
    } catch (e) {
        console.log(e)
        return {
            notFound: true,
        }
    }
}

export default Home
