import Link from 'next/link';
import Image from 'next/image'

export default function Content(props) {
    return (
        <div className="text-neutral-900">
            <div className="max-w-3xl m-auto px-6 py-8 pt-10">
                <div className='flex justify-center pb-6'>
                    {props.headerImage}
                </div>
                {
                    props.title &&
                    <div className='pb-1 mb-1'>
                        <h1 className="tracking-tight text-5xl text-center">
                            {props.title}
                        </h1>
                        {
                            props.subtitle &&
                            <div className='text-center tracking-normal font-body pt-2 mb-4 text-sm text-gray-700'>
                                {props.subtitle}
                            </div>
                        }
                    </div>
                }
                {props.children}
                <footer className="flex place-content-between py-4 mt-8 border-t-2 border-t-neutral-900">
                    <Link href="/">
                        <a className='hover:underline'>Home</a>
                    </Link>
                    <span>© Reece Walsh {new Date().getFullYear()}</span>
                </footer>
            </div>
        </div>
    )
}