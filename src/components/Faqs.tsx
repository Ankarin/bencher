import Image from 'next/image'

import {Container} from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
    [
        {
            question: 'Do you have any fees ?',
            answer:
                'No, you contract your new partner directly and work with them without our interference.',
        },
        {
            question: 'If everything is free how do you make money ?',
            answer: 'We are planning on adding premium features like sponsored positions later.',
        },

    ],
    [
        {
            question: 'What if my developers are not available anymore ?',
            answer:
                'You can edit their status and visability.',
        },
        {
            question:
                'How you make sure companies on your platform are trustworthy ?',
            answer:
                'We conduct interview with their top members, check their reviews on multiple platforms and ask their previous clients for referrals',
        },

    ],
    [
        {
            question: 'What if somebody will see my available developers and solicit them ?',
            answer:
                'Make sure to keep their profiles anonymous and provide only relevant information before signing contracts.',
        }, {
        question:
            'Is our data secure ?',
        answer:
            'We only use information about developers you explicitly allowed us to use, read more in our privacy policy.',
    },

    ],
]

export function Faqs() {
    return (
        <section
            id="faq"
            aria-labelledby="faq-title"
            className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
        >
            <Image
                className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
                src={backgroundImage}
                alt=""
                width={1558}
                height={946}
                unoptimized
            />
            <Container className="relative">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2
                        id="faq-title"
                        className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
                    >
                        Frequently asked questions
                    </h2>
                    <p className="mt-4 text-lg tracking-tight text-slate-700">
                        If you can’t find what you’re looking for, get in touch via email or linkedin, and we will help
                        you out.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
                >
                    {faqs.map((column, columnIndex) => (
                        <li key={columnIndex}>
                            <ul role="list" className="flex flex-col gap-y-8">
                                {column.map((faq, faqIndex) => (
                                    <li key={faqIndex}>
                                        <h3 className="font-display text-lg leading-7 text-slate-900">
                                            {faq.question}
                                        </h3>
                                        <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    )
}
