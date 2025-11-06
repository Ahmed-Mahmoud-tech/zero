import { getTranslations } from 'next-intl/server';

// Fake API function
async function fetchUserData() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
        name: 'Ahmed Ali',
        emiratesId: '784-1999-1234567-8',
        gender: 'Male'
    };
}

const UserInfo = async () => {
    const t = await getTranslations();
    const userData = await fetchUserData();

    return (
        <>
            <div className="flex justify-between gap-4 flex-wrap">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        {t('step2.name')}: <span className="text-sm text-gray-600 font-medium">{userData.name}</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        {t('step2.emiratesId')}: <span className="text-sm text-gray-600 font-medium">{userData.emiratesId}</span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                    {t('step2.gender')}: <span className="text-sm text-gray-600 font-medium">{userData.gender}</span>
                </label>
            </div>
        </>
    );
};

export default UserInfo;