import React, { useEffect, useRef, useState } from 'react'

import SelectHeader from '../SelectHeader/SelectHeader';
import SelectHeaderTitle from '../SelectHeaderTitle/SelectHeaderTitle';
import SelectList from '../SelectList/SelectList';
import SelectListItem from '../SelectListItem/SelectListItem';

import './select.css';

/**
 * Component for create custom select 
 * 
 * @param {object}
 * @returns {React.DOMElement}
 */
function Select({tabIndex, label, modifier, data , dataKey, zIndex}) {

    /**
     * current select value and how we can modifie it
     */
    const {currentValue, valueModifier} = modifier

    /**
     * select value state 
     */
    const [selectedValue, setSelectedValue] = useState({value: currentValue});

    /**
     * is select open state
     */
    const [isOpen, setIsOpen] = useState(false);

    /**
     * ref to that select
     */
    const selectRef = useRef();

    /**
     * handle click on select list item 
     * 
     * @param {object} item 
     * @returns {void}
     */
    const handleItemClick = (item) => {

        setSelectedValue(item);

        valueModifier(item.value);

        setIsOpen(false);
    }

    /**
     * handle the open or close the select 
     * 
     * @returns {void}
     */
    const handleListClick = () => {

        setIsOpen(isOpen => !isOpen)
    }

    /**
     * handle the click on any DOM element to close the select 
     * 
     * @param {Event} e
     * @returns {void}
     */
    const handleDomClick = e => {

        if(!selectRef.current.contains(e.target)) {

            setIsOpen(false);
        }
    }

    /**
     * scroll to specific position
     * 
     * @param {number} index 
     * @returns {void}
     */
    const showElementByScroll = (index) => {
        const activeElement = selectRef.current.querySelector('.select-list-item.active').scrollHeight;

        selectRef.current.querySelector('.select-list').scrollTo({
            top: activeElement * index,
            behavior: 'smooth'
        })
    }

    /**
     * add keyup event to handle search open or close select  
     */
    useEffect(() => {

        /**
         * when press Space or Enter on the focused select show the content
         * 
         * @param {Event} e 
         * @returns {void}
         */
        const handlePressKey = e => {

            const {code, key} = e;

            if(!selectRef.current.contains(e.target)) {

                setIsOpen(false);
            }

            if(selectRef.current.contains(e.target) && (code === 'Space' || code === 'Enter')) {

                handleListClick()
            }

            if(selectRef.current.contains(e.target) && code === 'ArrowUp') {
                handleUpArrow()
            }

            if(selectRef.current.contains(e.target) && code === 'ArrowDown') {
                handleDownArrow()
            }

            if(selectRef.current.contains(e.target) && /[a-zA-Z]/g.test(key) && key !== 'Tab' && key !== 'ArrowUp' && key !== 'ArrowDown') {
                handleSearch(key)
            }            
        }

        /**
         * handle press up arrow to show the previous item
         * 
         * @returns {void}
         */
        const handleUpArrow = () => {
            let currentIndex = data.findIndex(item => item[dataKey.value] === selectedValue[dataKey.value])

            currentIndex = currentIndex !== undefined ? currentIndex - 1 : 0;

            if(currentIndex < 0) {
                currentIndex = data.length - 1
            }

            setSelectedValue(data[currentIndex])

            if(isOpen) {
                showElementByScroll(currentIndex)
            }
        }

        /**
         * handle press up arrow to show the next item
         * 
         * @returns {void}
         */
        const handleDownArrow = () => {
            let currentIndex = data.findIndex(item => item[dataKey.value] === selectedValue[dataKey.value])

            currentIndex = currentIndex !== undefined ? currentIndex + 1 : 0;

            if(currentIndex >= data.length) {
                currentIndex = 0;
            }

            setSelectedValue(data[currentIndex])

            if(isOpen) {
                showElementByScroll(currentIndex)
            }
        }

        /**
         * search for specific letter 
         * 
         * @param {string} letter 
         * @returns {void}
         */
        const handleSearch = letter => {

            let currentIndex = data.findIndex(item => item[dataKey.value].toLowerCase().startsWith(letter.toLowerCase()))

            if(currentIndex === -1) {
                currentIndex = 0
            }

            setSelectedValue(data[currentIndex])

            if(isOpen) {
                showElementByScroll(currentIndex)
            }
        }

        document.addEventListener('keyup', handlePressKey)

        return () => {
            document.removeEventListener('keyup', handlePressKey)
        }

    }, [selectedValue, isOpen, data, dataKey]);

    /**
     * add click event to any DOM element to close the select 
     */
    useEffect(() => {

        document.addEventListener('click', handleDomClick)

        return () => {

            document.removeEventListener('click', handleDomClick)
        }

    }, []);

    return (
        <div tabIndex={tabIndex} ref={selectRef} className='select-input' style={{zIndex}}>

            <SelectHeader handleListClick={handleListClick}>

                <SelectHeaderTitle 
                    label={label} 
                    selectedValue={selectedValue} 
                    isOpen={isOpen} />

            </SelectHeader>

            <div className={isOpen ? 'select-content show' : 'select-content'}>

                <SelectList>

                    <li onClick={() => handleItemClick({id: 'select-default-key', value: null})} className='select-list-item' key='select-default-key'>{label}</li>

                    {
                        data.map(
                            item => <SelectListItem 
                                        selectedValue={selectedValue} 
                                        key={item[dataKey.id]} 
                                        item={item} 
                                        dataKey={dataKey} 
                                        handleItemClick={handleItemClick} />
                        )
                    }

                </SelectList>

            </div>
        </div>
    )
}

export default Select