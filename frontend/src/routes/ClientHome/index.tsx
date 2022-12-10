import { Outlet } from "react-router-dom";
import HeaderClient from "../../components/HeaderClient";

export default function ClientHome(): JSX.Element {
    return (
        <>
            <HeaderClient />
            <Outlet />
        </>
    );
}