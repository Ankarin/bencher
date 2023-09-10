import {Button} from "src/components/landing/Button";

export default function NoCompany() {
    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Add your company</h3>
                <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                    <div className="max-w-xl text-sm text-gray-500">
                        <p>
                            In order to add your developers on a platform you need to have a provider profile.
                        </p>
                        <p>
                            If your company already has an account on Bencher - ask the admin to invite you.
                        </p>
                    </div>
                    <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                        <Button
                            href="/edit-company"
                            color="blue"
                        >
                            Create new company
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
