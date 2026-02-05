const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#1f3a57',           // input background
        color: '#ffffff',                     // text color
        '& fieldset': { borderColor: '#4a90e2' },        // default border
        '&:hover fieldset': { borderColor: '#74b9ff' },  // hover border
        '&.Mui-focused fieldset': { borderColor: '#1abc9c' }, // focused border
    },
    '& label': { color: '#a0c4ff' },       // default label color
    '& label.Mui-focused': { color: '#1abc9c' }, // focused label
    '& .MuiInputBase-input': { color: '#ffffff' }, // text input color
    '& .MuiFormHelperText-root': {
        color: '#a0c4ff', // pick your color
    },
}

export default textFieldStyles