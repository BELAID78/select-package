import React from 'react'

/**
 * Component for create select header 
 * 
 * @param {object}
 * @returns {React.ReactElement}
 */
function SelectHeader({children, handleListClick}) {
    return (
        <div className='select-header' onClick={handleListClick}>
            {children}
        </div>
    )
}

export default SelectHeader