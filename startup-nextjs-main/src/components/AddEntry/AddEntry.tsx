'use client';
import React, { useState } from 'react';
import { useWebSocket } from '@/components/websockets/sendUserListInfo'
const AddEntry: React.FC = () => {
    const [entries, setEntries] = useState([{ firstName: '', lastName: '' }]);

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
        // Combine firstName and lastName into one entry(object)
        // const combinedEntries = entries.map(entry => ({
        //     firstName: entry.firstName,
        //     lastName: entry.lastName
        // }));
        const combinedEntries = entries.reduce((acc, entry) => {
            acc[entry.firstName] = entry.lastName;
            return acc;
        }, {});

        // Log the transformed object (useful for debugging)
        console.log('Transformed Entries:', combinedEntries);

        // Log the combined entries (useful for debugging)
        console.log('Combined Entries:', combinedEntries);

        // Return the combined entries directly as an array of objects
        return combinedEntries;
    };

    // WebSocket function setup
    const { establishConnectionAndSend } = useWebSocket(); // Initialize with empty arrays

    const handleSubmit = () => {
        const data = extractInfo();
        console.log(data);
        // Call the WebSocket function to send the data
        establishConnectionAndSend(data);
        setEntries([{ firstName: '', lastName: '' }]);
    };

    return (
        <div>

            {entries.map((entry, index) => (
                <div key={index} className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label htmlFor={`first_name_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock Ticker</label>
                        <input
                            type="text"
                            id={`first_name_${index}`}
                            value={entry.firstName}
                            onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ex: SPX"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`last_name_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage</label>
                        <input
                            type="text"
                            id={`last_name_${index}`}
                            value={entry.lastName}
                            onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="%"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => handleDeleteEntry(index)}
                            className="text-gray-500 hover:text-white"
                            aria-label="Delete entry"
                        >
                            <span className="text-xl font-bold">X</span>
                        </button>
                    </div>
                </div>
            ))}
            <button
                onClick={handleAddEntry}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
                <span id="add-button" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add entry+
                </span>
            </button>
            <button
                onClick={handleSubmit}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
                <span id="submit" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Submit
                </span>
            </button>

        </div>
    );
};

export default AddEntry;
