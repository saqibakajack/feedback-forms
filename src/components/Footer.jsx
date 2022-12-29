import Link from 'next/link'

import { Container } from '@/components/Container'
import {AnimatePresence, motion} from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-center border-t border-gray-200 py-8 md:flex-row-reverse md:justify-between">
          <Link
              href='/disclaimer'
              className="relative -my-2 -mx-3 rounded-lg text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
          >
            <span className="relative z-10">Disclaimer</span>
          </Link>
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
