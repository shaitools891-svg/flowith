const fetchData = async (filePath) => {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Could not fetch data from ${filePath}:`, error);
        return null;
    }
};

export const getTeamData = () => fetchData('src/data/team.json');
export const getProgramsData = () => fetchData('src/data/programs.json');
export const getEventsData = () => fetchData('src/data/events.json');
export const getGalleryData = () => fetchData('src/data/gallery.json');
export const getPostponedData = () => fetchData('src/data/postponed.json');
export const getTranslations = () => fetchData('src/data/translations.json');
