import Image from 'next/image'
import Layout from '../components/layout'
import Mountains from '../components/mountains/mountains'

export default function Home() {
    return (
        <Layout home={true}>
            <Mountains />
        </Layout>
    )
}
