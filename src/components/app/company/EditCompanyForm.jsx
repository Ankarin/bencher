'use client'
import {useCallback, useEffect, useState} from 'react'

export default function CompanyEdit({companyData}) {
console.log(companyData)

    const [loading, setLoading] = useState(true)
    //
    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')

    const [size, setSize] = useState('')
    const [location, setLocation] = useState('')
    const [foundingYear, setFoundingYear] = useState('')
    const [averageRate, setAverageRate] = useState('')
    const [logo_url, setLogoUrl] = useState('')
    const [description, setDescription] = useState('')

    // async function getProfile() {
    //     setLoading(true)
    //
    //     let {data, error} = await supabase
    //         .from('profiles')
    //         .select()
    //         .eq('id', user.id)
    //         .single()
    //
    //     if (error) {
    //         console.warn(error)
    //     } else if (data) {
    //         console.log(data)
    //     }
    //
    //     setLoading(false)
    // }
    //
    // getProfile()

    //
    // async function updateProfile({username, website, avatar_url}) {
    //     try {
    //         setLoading(true)
    //         let {error} = await supabase.from('companies').upsert({
    //             name,
    //             website,
    //             size,
    //             location,
    //             averageRate,
    //             description,
    //             foundingYear,
    //             updated_at: new Date().toISOString(),
    //         })
    //         if (error) throw error
    //         alert('Profile updated!')
    //     } catch (error) {
    //         alert('Error updating the data!')
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    return (

        <div className='p-10 max-w-6xl mx-auto'>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                My Company
            </h2>
            <form>
                <div className="space-y-12">
                    <div className=" border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Company Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Company Website
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="location"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Company Size
                                    </label>
                                    <select
                                        id="size"
                                        name="size"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                    >
                                        <option></option>
                                        <option>2 - 10</option>
                                        <option>10 - 49</option>
                                        <option>50 - 249</option>
                                        <option>250 - 1000</option>
                                        <option>1000+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="location"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Primary Location
                                    </label>
                                    <select
                                        id="location"
                                        name="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option></option>
                                        {
                                            countries.map(country => <option key={country}>{country}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="location"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Average Hourly Rate
                                    </label>
                                    <select
                                        id="avergaeRate"
                                        name="averageRate"
                                        value={averageRate}
                                        onChange={(e) => setAverageRate(e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option></option>
                                        <option>{`< $25`}</option>
                                        <option>$25 - $49</option>
                                        <option>$50 - $99</option>
                                        <option>$100 - $149</option>
                                        <option>$149-$200</option>
                                        <option>$200+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <label htmlFor="location"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Founding Year
                                    </label>
                                    <select
                                        id="foundingYear"
                                        name="foundingYear"
                                        value={foundingYear}
                                        onChange={(e) => setFoundingYear(e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option></option>
                                        {
                                            years().map(year => <option key={year}>{year}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-10 col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength="150"
                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about
                                your company to highlight your expertise.</p>
                        </div>
                    </div>


                </div>


                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>

        </div>
    )

}
const years = () => {
    const max = new Date().getFullYear()
    const min = max - 250
    const years = []

    for (let i = max; i >= min; i--) {
        years.push(i)
    }
    return years
}


const countries = [
    "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, Democratic Republic of the Congo", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Іщгер Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Rwanda", "Saint Barthelemy", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "St Martin", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];
