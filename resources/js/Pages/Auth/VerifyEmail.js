import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import SmallButton from "@/Shared/SmallButton";
import { Inertia } from '@inertiajs/inertia';
import {useState} from 'react';
import ConfirmModal from "@/Shared/Modals/ConfirmModal";
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';
import LoadingButton from '@/Shared/LoadingButton';


export default () => {
    const [sending, setSending] = useState(false);
    const [sended, setSended] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        setSending(true);
        Inertia.post(route('verification.send'), [], {
            onFinish: () => {
                setSending(false);
                setSended(true);
            }
        });
    }
return (

    <Layout>
        <Helmet title="Categories" />

        <div>
            <h1 className="mb-8 text-3xl font-bold">Please verify your email address</h1>
            <div className="mb-6">
            
                <div>Thanks for signing up! Before getting started, </div>
                <div>could you verify your email address by clicking on the link we just emailed to you? </div>
                <div>If you didn't receive the email, we will gladly send you another. </div>
            </div>
           
            <LoadingButton
                isDisable={sended}
                onClick={handleSubmit}
                type="submit"
                loading={sending}
                className="btn-indigo"
            >
                Resend Verification Email
            </LoadingButton> 
            {sended ? 'Sended' : ''}
            <div className="overflow-x-auto bg-white rounded shadow">
            
            </div>
        
        </div>

    </Layout>
);
};
