import React from 'react'

/**
 * Component for create select header 
 * 
 * @param {object}
 * @returns {React.ReactElement}
 */
function SelectHeaderTitle({label, selectedValue, isOpen}) {
    return (
        <>
            <span className='select-header-title'>
                {selectedValue !== null && selectedValue.value !== null ? selectedValue.value : label}
            </span>

            <svg className={isOpen ? 'select-header-caret up' : 'select-header-caret'} 
                fill="currentColor"  viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        </>
    )
}

export default SelectHeaderTitle