import { CallToAction } from '@/components/landing/CallToAction';
import { Faqs } from '@/components/landing/Faqs';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { PrimaryFeatures } from '@/components/landing/PrimaryFeatures';
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures';
import React from 'react';

export default async function Home(): Promise<React.ReactNode> {
  return (
    <>
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
