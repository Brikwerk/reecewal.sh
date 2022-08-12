import { Place } from '@mui/icons-material'
import Image from 'next/image'
import Layout from '../components/layout'
import Mountains from '../components/mountains/mountains'
import MountainsExplanation from '../components/mountainsExplanation'

export default function Home() {
    return (
        <Layout home={true}>
            <MountainsExplanation/>
            <Mountains/>
        </Layout>
    )
}
