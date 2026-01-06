import React from 'react'
import { MdFilterList } from 'react-icons/md'

export default function FilterPanel({ filters, onFilterChange, onClearFilters }) {
    const hasActiveFilters = filters.category !== 'All' || filters.difficulty !== 'All' || filters.maxTime !== 'All'

    return (
        <div className='filter-panel'>
            <div className='filter-header'>
                <MdFilterList className='filter-icon' />
                <span>Filters</span>
                
                {hasActiveFilters && (
                    <button className='clear-filters-btn' onClick={onClearFilters}>
                        Clear All
                    </button>
                )}
            </div>

            <div className='filter-controls'>
                <div className='filter-group'>
                    <label>Category</label>
                    <select
                        value={filters.category}
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className='filter-select'
                    >
                        <option value="All">All Categories</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>

                <div className='filter-group'>
                    <label>Difficulty</label>
                    <select
                        value={filters.difficulty}
                        onChange={(e) => onFilterChange('difficulty', e.target.value)}
                        className='filter-select'
                    >
                        <option value="All">All Levels</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div className='filter-group'>
                    <label>Cooking Time</label>
                    <select
                        value={filters.maxTime}
                        onChange={(e) => onFilterChange('maxTime', e.target.value)}
                        className='filter-select'
                    >
                        <option value="All">Any Duration</option>
                        <option value="15">Under 15 mins</option>
                        <option value="30">Under 30 mins</option>
                        <option value="60">Under 1 hour</option>
                        <option value="120">Under 2 hours</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
