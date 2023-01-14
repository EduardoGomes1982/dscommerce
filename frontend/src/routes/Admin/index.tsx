import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";

export default function Admin(): JSX.Element {
    return (
        <>
            <HeaderAdmin />
            <Outlet />
        </>
    );
}