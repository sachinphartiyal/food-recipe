import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

export default function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
    return (
        <div className='search-bar'>
            <div className='search-input-wrapper'>
                <FiSearch className='search-icon' />
                <input
                    type="text"
                    placeholder="Search recipes by title or ingredients..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className='search-input'
                />
                
                {searchQuery && (
                    <IoMdClose
                        className='clear-search-icon'
                        onClick={onClearSearch}
                    />
                )}
            </div>
        </div>
    )
}
