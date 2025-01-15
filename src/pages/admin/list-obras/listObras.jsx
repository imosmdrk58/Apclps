import * as React from 'react';
import './listObra.css'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'; 
import Button from '@mui/material/Button'; 
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

export default function ListObras(){
    const localeText = {
        columnMenuUnsort: 'Remover classificação',
        columnMenuSortAsc: 'Classificar ascendente', 
        columnMenuSortDesc: 'Classificar descendente', 
        columnHeaderFiltersTooltipActive: count => `${count} ${count !== 1 ? 'filtros ativos' : 'filtro ativo'}`, 
        columnHeaderFiltersLabel: 'Mostrar filtros', 
        columnHeaderSortIconLabel: 'Classificar', 
        footerRowSelected: count => `${count.toLocaleString()} linha(s) selecionada(s)`, 
        footerTotalRows: 'Total de linhas:',
        noRowsLabel: 'Nenhuma linha', 
        noResultsOverlayLabel: 'Nenhum resultado encontrado', 
        toolbarDensity: 'Densidade', 
        toolbarDensityLabel: 'Densidade', 
        toolbarDensityCompact: 'Compacto', 
        toolbarDensityStandard: 'Padrão', 
        toolbarDensityComfortable: 'Confortável', 
        toolbarColumns: 'Colunas', 
        toolbarColumnsLabel: 'Selecionar colunas', 
        toolbarFilters: 'Filtros', 
        toolbarFiltersLabel: 'Mostrar filtros', 
        toolbarFiltersTooltipHide: 'Ocultar filtros', 
        toolbarFiltersTooltipShow: 'Mostrar filtros', 
        toolbarExport: 'Exportar', 
        toolbarExportLabel: 'Exportar', 
        toolbarExportCSV: 'Baixar como CSV', 
        toolbarExportPrint: 'Imprimir',
    }

    const [rows, setRows] = React.useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70},
        { field: 'TituloObra', headerName: 'Titulo', width: 200},
        { field: 'data', headerName: ' Data de Publicacao na BlueScan', type: 'Date', width: 300, },
        { field: 'actions', headerName: 'actions', width: 400, renderCell: (params) => (
            <Button 
                variant='outlined'
                color='primary'
                onClick={() => PubliList(params.row.id)}
            >
                Publicar Capitulos e visualizar
            </Button>
            )
        },
    ];

    React.useEffect(() => {
        axios.get('http://localhost:4000/ListaObra')
            .then(response => {
                console.log('Dados recebidos:', response.data);
                setRows(response.data);
            })
            .catch(error => {
                console.log("O correu um erro get",error);
            });
    },[]);

    const navigate = useNavigate();

    const PubliList = (id) => {
        navigate(`/admin/listobras/publiList/${id}`);
        return <PubliList/>
    }

    return(
        <div className='Container-List-Obras'>
            <Paper sx={{height: 700, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: {paginationModel: {page: 0, pageSize: 4}}}}
                    localeText={localeText}
                    pageSizeOptions={[4,10]}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            borderBottom: 1,
                            color: 'black',
                            fontSize: 18,
                            fontStyle: 'inherit',
                        },
                        '& .MuiDataGrid-row--borderBottom.css-yseucu-MuiDataGrid-columnHeaderRow': { 
                            fontStyle: 'inherit',
                            fontSize: 16,
                            color: 'white',
                            borderBottom: 1,
                            backgroundColor: '#027580',
                        },
                        '& .MuiDataGrid-footerContainer.MuiDataGrid-withBorderColor.css-15lx25q-MuiDataGrid-footerContainer': {
                            color: 'white',
                            borderTop: 1,
                            backgroundColor: '#027580',
                        },
                        border: 2, 
                        backgroundColor: 'white' }}
                />
            </Paper>
            <div><Outlet/></div>
        </div>
    );
}