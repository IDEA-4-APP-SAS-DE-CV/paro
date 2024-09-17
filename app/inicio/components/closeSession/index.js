'use client';
import { Button } from "@nextui-org/react";
import { delete_cookie } from '../../../../utils/cookies';

export default function CloseSession () {
    const closer = () => {
        delete_cookie('user');
        window.location.href = '/login';
    }

    return <Button color="danger" variant="bordered" onClick={closer}>Cerrar Sesion</Button>
}