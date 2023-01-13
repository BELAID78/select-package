# HRnet Dropdown menu plugin
## How to use
### Use the plugin in your project
If you want to use this library in your (React) project, you can install It from the command line :
```
npm i react-select-menu
```
Then, import the Select from the library and start using It :
```jsx
import { useState } from 'react'
Import Select from 'react-select-menu/dist/components/index' ;
function selectComponent() {
    const [value, onchange] = useState('Sales')
    const data = [
        {
            id: 'Sales',
            value: 'Sales'
        },
        {
            id: 'Marketing',
            value: 'Marketing'
        },
        {
            id: 'Engineering',
            value: 'Engineering'
        },
        {
            value: 'Human Resources'
        },
        {
            id: 'Legal',
            value: 'Legal'
        }
    ];
    return (
          <Select
                tabIndex={1} 
                label="" 
                modifier={{currentValue: value, valueModifier: onchange}} 
                data={data} 
                dataKey={{id:'id', value: 'value'}} 
                zIndex="1" />
    );
}
export default selectComponent;

```