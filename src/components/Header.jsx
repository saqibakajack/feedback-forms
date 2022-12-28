import Link from 'next/link'

import {Button} from '@/components/Button'
import {Container} from '@/components/Container'
import {Logo} from '@/components/Logo'
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";

export function Header() {
    const router = useRouter()
    const handleSignOut = async () => {
        await signOut();
        await router.push('/login')
    }

    return (
        <header>
            <nav>
                <Container className="relative z-50 flex justify-between py-8">
                    <div className="relative z-10 flex items-center gap-16">
                        <Link href="/" aria-label="Home">
                            <Logo className="h-10 w-auto"/>
                        </Link>
                    </div>
                    <Button type="submit" className="flex-none" onClick={handleSignOut}>
                        Logout
                    </Button>
                </Container>
            </nav>
        </header>
    )
}
