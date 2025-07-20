import { Button } from "@mui/material";

function GoogleLoginButton() {
    //https://console.cloud.google.com/auth/clients/473728441518-cp9km1g4unopcujivl29a8ruhvr37pdl.apps.googleusercontent.com?inv=1&invt=Ab3RlQ&project=nth-rarity-346910
    const handleLogin = () => {
        window.location.href = 'http://localhost:4000/auth/google';
    };

    return <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{ mt: 3, background: 'red' }}
        onClick={handleLogin}
    >
        Login with Google
    </Button>
}

export default GoogleLoginButton
