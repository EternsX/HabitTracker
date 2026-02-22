import Alert from '@mui/material/Alert';

export default function Error({msg}) {
    return (
        <>
            <Alert severity="error">{msg}</Alert>
        </>
    )
}