import Image from 'next/image';
import React from 'react';
import CartLarge2 from './CartLarge2';
import { environment } from '../../../environments/environment';

const baseUrl = environment.DATA_STORAGE_URL;

const TopContainer = (props) => {
    const resourcesData = props?.info;
    //const baseUrl = "/documents";

    const handleDownload = (file) => {
        const link = document.createElement("a");
        link.href = `${baseUrl}/${file}`;
        link.download = file;
        link.click();
    }

    const handleView = (file) => {
        window.open(`${baseUrl}/${file}`, "_blank");
    }

    return (
        <>
            <div className='col_left'>
                <CartLarge2 info={resourcesData} />
            </div>
            <div className='col_right'>
                <div className='download_container'>
                    {resourcesData?.documents?.map((item, index) => 
                        <div key={'pdf_'+index} className='download_item'>
                            <h4>{item?.title}</h4>
                            <button onClick={() => handleView(item?.file)} className='view_pdf'></button>
                            <button onClick={() => handleDownload(item?.file)} className='download_pdf'></button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TopContainer
