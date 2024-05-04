import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

export default function DataTable(props: {
    columns: GridColDef[],
    dataSource: any[];
    getRowId: (row: any) => string;
    pageSizeOptions?: number[];
}) {
    const {columns, dataSource, getRowId, pageSizeOptions = [10, 20, 30]} = props;


    return (
        <DataGrid
            rows={dataSource}
            columns={columns}
            getRowId={getRowId}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 5},
                },
            }}
            pageSizeOptions={pageSizeOptions}
            checkboxSelection
        />
    );
}
