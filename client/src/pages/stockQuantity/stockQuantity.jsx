import React from 'react';
import { Container } from './../../components/container/Container';
import { Table } from './../../components/index';

export const StockQuantity = () => {
    const mockdata=[
      {
            SN : 12,
            PRODUCTNAME : "Mystic Potion",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },
        {
            SN : 11,
            PRODUCTNAME : "Eternal Flame",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 10,
            PRODUCTNAME : "Galactic Elixir",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 9,
            PRODUCTNAME : "Celestial Dew",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 8,
            PRODUCTNAME : "Dream Weaver",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 7,
            PRODUCTNAME : "Evergreen Essence",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 6,
            PRODUCTNAME : "Moonlit Mirage",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 5,
            PRODUCTNAME : "Stardust Serenade",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 4,
            PRODUCTNAME : "Whispering Winds",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 3,
            PRODUCTNAME : "Sunset Symphony",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 2,
            PRODUCTNAME : "Aurora Borealis Brew",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },{
            SN : 1,
            PRODUCTNAME : "Spectral Sparkle",
            DAGONBHUIYA : 40,
            FENI : 30,
            TOTAL : 70
        },
    ];

    const headers = ["SN", "DAGONBHUIYA", "FENI", "TOTAL"];
    
    return (
        <>
            <Container className={"flex-col justify-start"}>
                <Table data={mockdata} headers={headers} />
            </Container>
        </>
    );
};
