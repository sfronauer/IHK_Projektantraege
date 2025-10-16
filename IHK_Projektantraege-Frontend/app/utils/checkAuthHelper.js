import { useRouter } from "next/navigation";
import useCheckLogin from "./CheckLogin";

const useCheckAuthHelper = (role, setLoggedIn, setLoading, setLogin) => {
    
    const router = useRouter();

    if (useCheckLogin(role)) {
        setLogin(authData);
        setLoggedIn(true);
    } else {
        router.push('/error');
    }
    setLoading(false);
}

export default useCheckAuthHelper;