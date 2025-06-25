import React from "react";

interface AgeResponse {
    age: number;
}

interface GenderResponse {
    gender: string;
}

interface CountryResponse {
    country: Array<{ country_id: string; probability: number }>;
}

const getPredictedAge = async (name: string): Promise<AgeResponse> => {
    const res = await fetch(`https://api.agify.io/?name=${name}`);
    if (!res.ok) throw new Error("Failed to fetch age");
    return res.json();
};

const getPredictedGender = async (name: string): Promise<GenderResponse> => {
    const res = await fetch(`https://api.genderize.io/?name=${name}`);
    if (!res.ok) throw new Error("Failed to fetch gender");
    return res.json();
};

const getPredictedCountry = async (name: string): Promise<CountryResponse> => {
    const res = await fetch(`https://api.nationalize.io/?name=${name}`);
    if (!res.ok) throw new Error("Failed to fetch country");
    return res.json();
};

// This is your Next.js Page component
interface PageProps {
    name: string;
    age: number | null;
    gender: string | null;
    country: string | null;
}

const Page: React.FC<PageProps> = ({ name, age, gender, country }) => {
    return (
        <div className="text-center mt-6 border-t border-gray-109">
            <div className="px-4 sm:px-0">
                <h2 className="text-base/7 font-semibold text-gray-900">Personal Info</h2>
                <p>{name}</p>
                <p>Age: {age ?? "Unknown"}</p>
                <p>Gender: {gender ?? "Unknown"}</p>
                <p>Country: {country ?? "Unknown"}</p>
            </div>
            <div className="mt-6 border-t border-gray-109"></div>
        </div>
    );
};

// This function will fetch data during build-time (or for each request depending on your use case)
export async function getServerSideProps(context: any) {
    const { name } = context.params; // Extract the name from the URL params

    try {
        // Fetching data concurrently using Promise.all
        const [age, gender, country] = await Promise.all([
            getPredictedAge(name),
            getPredictedGender(name),
            getPredictedCountry(name)
        ]);

        // Return the fetched data as props to the page component
        return {
            props: {
                name,
                age: age?.age ?? null,
                gender: gender?.gender ?? null,
                country: country?.country?.[0]?.country_id ?? null
            }
        };
    } catch (error) {
        return {
            props: {
                name,
                age: null,
                gender: null,
                country: null
            }
        };
    }
}

export default Page;
