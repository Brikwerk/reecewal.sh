import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className='fixed z-50 bg-neutral-50 w-full border-b-2 border-neutral-900'>
            <section className='flex justify-between max-w-3xl m-auto h-14'>
                <Link href="/">
                    <a className='text-2xl border-neutral-900 hover:underline px-6 flex justify-center items-center'>
                        <div className='leading-4 pt-1'>
                            REECE WALSH
                        </div>
                    </a>
                </Link>
                <div className='h-full flex'>
                    <Link href="/about-me">
                        <a className='font-body border-x-2 border-neutral-900 text-neutral-50 bg-neutral-900 hover:bg-neutral-50 hover:text-neutral-900 px-6 h-full flex justify-center items-center'>
                            <div className='leading-3 pt-1'>
                                About Me
                            </div>
                        </a>
                    </Link>
                </div>
            </section>
        </nav>
    )
}