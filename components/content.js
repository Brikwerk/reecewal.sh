export default function Content(props) {
    return (
        <div className="text-neutral-900">
            <div className="max-w-4xl m-auto px-6 py-8">
                {
                    props.title &&
                    <h1 className="uppercase text-3xl pb-3 mb-8 border-b border-b-neutral-900">
                        {props.title}
                    </h1>
                }
                {props.children}
                <footer className="py-4 mt-8 border-t border-t-neutral-900">
                    © Reece Walsh {new Date().getFullYear()}
                </footer>
            </div>
        </div>
    )
}