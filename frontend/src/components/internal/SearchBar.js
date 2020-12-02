import React from 'react';
import { Button, TextField } from '@material-ui/core';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
export default function SearchBar(props) {
    const [inputValue, setInputValue] = React.useState('');
    const search = (event) => {
        setInputValue(event.target.value);
        if (inputValue.trim().length <1) {
            props.searchMember(inputValue, false);
        } else {
            props.searchMember(inputValue, true);
        }
    }
    const deleteSearchInput = () => {
        setInputValue('');
        props.searchMember(inputValue, false);

    }
    return (
        <React.Fragment>
            <div>
                <TextField id="outlined-basic" value={inputValue} className='searchMember'
                    label="Search" onChange={search} />
                <Button color='primary' onClick={deleteSearchInput}><HighlightOffSharpIcon></HighlightOffSharpIcon></Button>
            </div>
        </React.Fragment>
    )
}

