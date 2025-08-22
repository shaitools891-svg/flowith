const { useState, useEffect, useMemo } = React;
const { motion, AnimatePresence } = framerMotion;
const { useTranslation } = ReactI18Next;

import useData from '../hooks/useData.js';

const AdminPanel = () => {
    const { t } = useTranslation();
    const { data: programs, loading: programsLoading } = useData('programs');

    const [selectedProgramId, setSelectedProgramId] = useState('');
    const [updateTextEn, setUpdateTextEn] = useState('');
    const [updateTextBn, setUpdateTextBn] = useState('');
    const [programJsonOutput, setProgramJsonOutput] = useState('');
    const [programCopied, setProgramCopied] = useState(false);

    const [imageUrl, setImageUrl] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [titleBn, setTitleBn] = useState('');
    const [descEn, setDescEn] = useState('');
    const [descBn, setDescBn] = useState('');
    const [galleryJsonOutput, setGalleryJsonOutput] = useState('');
    const [galleryCopied, setGalleryCopied] = useState(false);

    useEffect(() => {
        if (programs && programs.length > 0) {
            setSelectedProgramId(programs[0].id);
        }
    }, [programs]);

    const handleProgramSubmit = (e) => {
        e.preventDefault();
        const newUpdate = {
            date: new Date().toISOString().split('T')[0],
            text: {
                en: updateTextEn,
                bn: updateTextBn,
            },
        };
        setProgramJsonOutput(JSON.stringify(newUpdate, null, 2));
    };

    const handleGallerySubmit = (e) => {
        e.preventDefault();
        const newImage = {
            id: `gallery-${Date.now()}`,
            url: imageUrl,
            title: {
                en: titleEn,
                bn: titleBn
            },
            description: {
                en: descEn,
                bn: descBn
            }
        };
        setGalleryJsonOutput(JSON.stringify(newImage, null, 2));
    };

    const handleCopy = (text, setCopied) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sortedPrograms = useMemo(() => {
        if (!programs) return [];
        return [...programs].sort((a, b) => a.title.en.localeCompare(b.title.en));
    }, [programs]);

    const renderJsonOutput = (jsonOutput, copied, onCopy) => {
        if (!jsonOutput) return null;
        return (
            <div className="mt-4 relative">
                <h4 className="font-semibold text-gray-700">Generated JSON:</h4>
                <pre className="mt-2 p-4 bg-gray-900 text-white rounded-md text-sm overflow-x-auto">
                    <code>{jsonOutput}</code>
                </pre>
                <button
                    onClick={() => onCopy(jsonOutput)}
                    className="absolute top-8 right-2 bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded-md text-xs"
                >
                    Copy
                </button>
                <AnimatePresence>
                    {copied && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute bottom-2 right-2 bg-green-500 text-white py-1 px-3 rounded-full text-sm font-bold"
                        >
                            Copied!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 pb-4">Admin Panel</h1>

            <div className="p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Program Update</h2>
                <form onSubmit={handleProgramSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="program-select" className="block text-sm font-medium text-gray-700">Select Program</label>
                        {programsLoading ? <p>Loading programs...</p> : (
                            <select
                                id="program-select"
                                value={selectedProgramId}
                                onChange={e => setSelectedProgramId(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                {sortedPrograms.map(p => <option key={p.id} value={p.id}>{p.title.en}</option>)}
                            </select>
                        )}
                    </div>
                    <div>
                        <label htmlFor="update-text-en" className="block text-sm font-medium text-gray-700">Update Text (English)</label>
                        <textarea id="update-text-en" rows="3" value={updateTextEn} onChange={e => setUpdateTextEn(e.target.value)} className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Enter English update..."></textarea>
                    </div>
                    <div>
                        <label htmlFor="update-text-bn" className="block text-sm font-medium text-gray-700">Update Text (Bengali)</label>
                        <textarea id="update-text-bn" rows="3" value={updateTextBn} onChange={e => setUpdateTextBn(e.target.value)} className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Enter Bengali update..."></textarea>
                    </div>
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Generate Update JSON
                    </button>
                </form>
                {renderJsonOutput(programJsonOutput, programCopied, (text) => handleCopy(text, setProgramCopied))}
            </div>

            <div className="p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Gallery</h2>
                <form onSubmit={handleGallerySubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="text" id="image-url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="public/images/gallery/image.jpg" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div>
                        <label htmlFor="title-en" className="block text-sm font-medium text-gray-700">Title (English)</label>
                        <input type="text" id="title-en" value={titleEn} onChange={e => setTitleEn(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div>
                        <label htmlFor="title-bn" className="block text-sm font-medium text-gray-700">Title (Bengali)</label>
                        <input type="text" id="title-bn" value={titleBn} onChange={e => setTitleBn(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="desc-en" className="block text-sm font-medium text-gray-700">Description (English)</label>
                        <textarea id="desc-en" rows="3" value={descEn} onChange={e => setDescEn(e.target.value)} className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="desc-bn" className="block text-sm font-medium text-gray-700">Description (Bengali)</label>
                        <textarea id="desc-bn" rows="3" value={descBn} onChange={e => setDescBn(e.target.value)} className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                    </div>
                    <div className="md:col-span-2">
                         <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Generate Gallery JSON
                        </button>
                    </div>
                </form>
                {renderJsonOutput(galleryJsonOutput, galleryCopied, (text) => handleCopy(text, setGalleryCopied))}
            </div>
        </motion.div>
    );
};

export default AdminPanel;
