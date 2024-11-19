import { Check, Pencil, X } from 'lucide-react';
import React, { useState } from 'react';

interface EditableFileNameProps {
    initialName: string;
    onSave: (newName: string) => void;
}

const EditableFileName: React.FC<EditableFileNameProps> = ({ initialName, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);
    const [tempName, setTempName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        setName(tempName);
        onSave(tempName);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setTempName(name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value);
    };

    return (
        <div className="editable-file-name">
            {isEditing ? (
                <div className='flex items-center justify-start'>
                    <input
                        type="text"
                        value={tempName}
                        onChange={handleChange}
                        className="border p-1"
                    />
                    <button onClick={handleSaveClick} className="ml-2 p-1 bg-blue-500 text-white">
                        <Check size={15} />
                    </button>
                    <button onClick={handleCancelClick} className="ml-2 p-1 bg-gray-500 text-white">
                        <X size={15} />
                    </button>
                </div>
            ) : (
                <div className='flex items-center justify-start'>
                    <span>{name}</span>
                    <button onClick={handleEditClick} className="ml-2 p-1">
                        <Pencil size={15} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditableFileName;