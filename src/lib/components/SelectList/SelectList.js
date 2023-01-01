import React from 'react'

/**
 * component for create select list
 * 
 * @param {object} 
 * @returns {React.ReactElement}
 */
function SelectList({children}) {
    return (
        <ul className='select-list'>
            {children}
        </ul>
    )
}

export default SelectList