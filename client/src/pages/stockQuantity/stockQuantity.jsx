import React from 'react';
import { Container } from './../../components/container/Container';
import { Table } from './../../components/index';
import { mockdata } from '../../utils/mockData';

export const StockQuantity = () => {

    const headers = ["SN", "DAGONBHUIYA", "FENI", "TOTAL"];
    const ignoreKeys = ["sn", "_id", "__v", "createdAt", "updatedAt", "units"];
    
    return (
        <>
            <Container className={"flex-col justify-start"}>
                <Table data={mockdata} headers={headers} ignoreKeys={ignoreKeys}  />
            </Container>
        </>
    );
};
