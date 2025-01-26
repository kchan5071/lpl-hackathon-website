// AddEntryLogic.ts

interface Entry {
    firstName: string;
    lastName: string;
  }
  
  export const addNewEntry = (entries: Entry[]) => {
    return [...entries, { firstName: '', lastName: '' }];
  };
  
  export const updateEntry = (
    entries: Entry[],
    index: number,
    field: 'firstName' | 'lastName',
    value: string
  ): Entry[] => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    return newEntries;
  };
  