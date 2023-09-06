import {CallToAction} from '@/components/CallToAction'
import {Faqs} from '@/components/Faqs'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {Hero} from '@/components/Hero'
import {PrimaryFeatures} from '@/components/PrimaryFeatures'
import {SecondaryFeatures} from '@/components/SecondaryFeatures'


export default async function Home() {


    return (
        <>
            {/*<Header user={user ? user.user_metadata.first_name : ''}/>*/}
            <main>
                <Hero/>
                <PrimaryFeatures/>
                <SecondaryFeatures/>
                <CallToAction/>
                <Faqs/>
            </main>
            <Footer/>
        </>
    )
}
