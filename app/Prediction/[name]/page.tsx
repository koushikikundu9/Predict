import React from "react";

const getPredictedAge = async (name: string) => {
    const res = await fetch(`https://api.agify.io/?name=${name}`);
    return res.json();
};

const getPredictedGender = async (name: string) => {
    const res = await fetch(`https://api.genderize.io/?name=${name}`);
    return res.json();
};

const getPredictedCountry = async (name: string) => {
    const res = await fetch(`https://api.nationalize.io/?name=${name}`);
    return res.json();
};

interface Params {
    params: { name: string };
}

export default async function Page({ params }: Params) {
    // Await each async function before passing to Promise.all
    const [age, gender, country] = await Promise.all([
        getPredictedAge(params.name),
        getPredictedGender(params.name),
        getPredictedCountry(params.name)
    ]);

    return (
        <div className="text-center mt-6 border-t border-gray-109">
            <div className="px-4 sm:px-0">
                <h2 className="text-base/7 font-semibold text-gray-900">Personal Info</h2>
                <p >{params.name}</p>
                <p>Age: {age?.age ?? "Unknown"}</p>
                <p>Gender: {gender?.gender ?? "Unknown"}</p>
                <p>Country: {country?.country?.[0]?.country_id ?? "Unknown"}</p>
            </div>
            <div className="mt-6 border-t border-gray-109"></div>
        </div>
    );
}
