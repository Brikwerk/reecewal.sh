import Head from 'next/head';
import Navbar from './navbar';

export default function Layout(props) {
    let title = "Reece Walsh";
    if (props.title) {
        title = props.title + "  |  " + title;
    }

    // Expand to fill screen on home
    let twStyle = "";
    let style = {};
    if (props.home) {
        twStyle = "h-screen w-screen";
        // style = {
        //     height: "100dvh"
        // }
    }

    return (
        <div className="text-neutral-900 min-h-screen">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Graduate Student Researcher and Teaching Assistant. This is my personal site with info about me and details on what I'm up to."
                />
                <title>{title}</title>
            </Head>
            <Navbar></Navbar>
            <main style={style} className={'pt-14 ' + twStyle}>
                {props.children}
            </main>
        </div>
    )
}