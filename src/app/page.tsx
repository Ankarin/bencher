import {CallToAction} from '@/components/landing/CallToAction'
import {Faqs} from '@/components/landing/Faqs'
import {Footer} from '@/components/landing/Footer'
import {Header} from '@/components/landing/Header'
import {Hero} from '@/components/landing/Hero'
import {PrimaryFeatures} from '@/components/landing/PrimaryFeatures'
import {SecondaryFeatures} from '@/components/landing/SecondaryFeatures'


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
