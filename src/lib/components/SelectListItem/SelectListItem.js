import React from 'react'

/**
 * Component for create select list item
 * 
 * @param {object}
 * @returns {React.ReactElement}
 */
function SelectListItem({selectedValue, item, dataKey, handleItemClick}) {
    return (
        <li 
            onClick={() => handleItemClick(item)} 
            className={ item[dataKey.value] === selectedValue.value ? 'select-list-item active' : 'select-list-item'}>

            {item[dataKey.value]}
            
        </li>
    )
}

export default SelectListItem