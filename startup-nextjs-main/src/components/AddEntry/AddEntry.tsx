'use client';
import React, { useState } from 'react';
import { useWebSocket } from '@/components/websockets/sendUserListInfo'
import CardComponent from '../AnswerCard';
const AddEntry: React.FC = () => {
    const [entries, setEntries] = useState([{ firstName: '', lastName: '' }]);
    // State to hold the card data object
    const [cardData, setCardData] = useState<{
        headerText: string;
        title: string;
        description: string;
    } | null>(null); // Initially null, will hold the object when message is received

    const handleAddEntry = () => {
        setEntries([...entries, { firstName: '', lastName: '' }]);
    };

    const handleDeleteEntry = (index: number) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
    };

    const handleInputChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const extractInfo = () => {
        const firstNames = entries.map(entry => entry.firstName);
        const lastNames = entries.map(entry => parseInt(entry.lastName));
        return { firstNames, lastNames };;
    };

    // WebSocket function setup
    const { establishConnectionAndSend } = useWebSocket(); // Initialize with empty arrays

    const handleSubmit = () => {
        const data = extractInfo();
        console.log(data);
        // Call the WebSocket function to send the data
        establishConnectionAndSend(
            data,
            (message) => {
                console.log(message);
                // Update specific fields individually
                setCardData(prevData => ({
                    ...prevData,
                    headerText: "Financial portfolio analysis", // Only update headerText if it exists
                    title: "Results",               // Only update title if it exists
                    description: message // Only update description if it exists
                }));
            }
        );
        setEntries([{ firstName: '', lastName: '' }]);
    };

    return (
        <div className='bg-white p-12'>

            <div className='flex flex-col items-center'>
                {entries.map((entry, index) => (
                    <div key={index} className="grid gap-6 mb-6 md:grid-cols-2 justify-items-center">
                        <div>
                            <label htmlFor={`first_name_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-center hover:scale-105 transition-transform duration-300">Stock Ticker</label>
                            <input
                                type="text"
                                id={`first_name_${index}`}
                                value={entry.firstName}
                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:scale-105 transition-transform duration-300"
                                placeholder="Ex: SPX"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor={`last_name_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-center hover:scale-105 transition-transform duration-300">Percentage</label>
                            <input
                                type="text"
                                id={`last_name_${index}`}
                                value={entry.lastName}
                                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:scale-105 transition-transform duration-300"
                                placeholder="%"
                                required
                            />
                        </div>
                        <div className='relative h-full right-[-390px] top-[-47px]'>
                            <button
                                type="button"
                                onClick={() => handleDeleteEntry(index)}
                                className="text-gray-500"
                                aria-label="Delete entry"
                            >
                                <span className="pl-0 text-xl font-bold absolute bottom-2 left-[-10px] transform transition-transform duration-300 hover:scale-125">✖</span>
                            </button>
                        </div>
                    </div>
                ))}
                <div>
                    <button
                        onClick={handleAddEntry}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        <span id="add-button" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Add entry+
                        </span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        <span id="submit" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Submit
                        </span>
                    </button>
                </div>
                <div>
                    {cardData ? (
                        <CardComponent
                            headerText={cardData.headerText}
                            title={cardData.title}
                            description={cardData.description}
                        />
                    ) : (
                        <p className='pt-6 text-gray-500 italic'>Waiting for Results...</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default AddEntry;
