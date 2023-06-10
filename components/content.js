import Link from 'next/link';

export default function Content(props) {
    return (
        <div className="text-neutral-900">
            <div className="max-w-3xl m-auto px-6 py-8 pt-10">
                {
                    props.title &&
                    <h1 className="text-5xl pb-1 mb-1 text-center">
                        {props.title}
                        {
                            props.subtitle &&
                            <div className='font-body pt-2 mb-2 text-sm text-gray-700'>
                                {props.subtitle}
                            </div>
                        }
                    </h1>
                }
                {props.children}
                <footer className="flex place-content-between py-4 mt-8 border-t border-t-neutral-900">
                    <Link href="/">
                        <a className='hover:underline'>Home</a>
                    </Link>
                    <span>© Reece Walsh {new Date().getFullYear()}</span>
                </footer>
            </div>
        </div>
    )
}