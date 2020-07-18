import React from 'react';
import PropertyTable from '../components/PropertyTable.js';
import AddPropertyModal from "../components/AddPropertyModal";

function Properties() {
    return(
        <div >
            <AddPropertyModal/>
            <PropertyTable/>
        </div> 
    );
}

export default Properties;