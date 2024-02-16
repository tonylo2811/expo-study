import { Tooltip } from '@rneui/themed';
import { useState } from 'react';

export default function Popup( props) {
    const [open, setOpen] = useState(false);
    return (
        
        <Tooltip
            visible={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            {...props}
        />
       
    )
}