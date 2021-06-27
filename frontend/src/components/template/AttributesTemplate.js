import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withTheme } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging
} from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableHeaderRow, Toolbar,TableColumnResizing, PagingPanel, SearchPanel
} from '@devexpress/dx-react-grid-material-ui';

import UIGrid from '@material-ui/core/Grid';

import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import { oCommoni18nTexts, oAttributeTemplatei18nTexts } from '../../utilities';
import moment from 'moment-timezone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Pagination from '../common/Pagination';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  hoverLink:{
    textDecoration: "none",
    '&:hover': {
      textDecoration: "underline",
    }
  }
}));

const AttributesTemplate = ({attributes, totalAttributes, classes, changePage, currentPage, onDelete}) => {
  
  const theme = useTheme();
  const hover = useStyles();
  const [wrapperWidth,setWrapperWidth] = useState(0);
  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'name', width: Math.floor(wrapperWidth*4/10)},
    { columnName: 'note', width: Math.floor(wrapperWidth*4/10)},
    { columnName: 'actions', width: Math.floor(wrapperWidth*2/10) }
  ]);

  if(document.getElementById("attributesListPage")){
    if(wrapperWidth === 0){
      let newWrapperWidth = document.getElementById("attributesListPage").offsetWidth-33;
      setWrapperWidth(newWrapperWidth);
      let newColumnWidth = [
        { columnName: 'name', width: Math.floor(newWrapperWidth*4/10)},
        { columnName: 'note', width: Math.floor(newWrapperWidth*4/10)},
        { columnName: 'actions', width: Math.floor(newWrapperWidth*2/10) }
      ]
      setColumnWidths(newColumnWidth);
    }
  }

  const Pager = ({
    currentPage,
    onCurrentPageChange,
    totalPages,
    pageSize,
    onPageSizeChange,
    pageSizes,
    totalCount,
    getMessage,
    className,
    ...restProps
  }) => {
    return (
      <Pagination
        totalPages={totalPages}
        totalCount={totalAttributes}
        currentPage={currentPage}
        onCurrentPageChange={page => onCurrentPageChange(page)}
        pageSize={pageSize}
        getMessage={getMessage}
      />
    );
  }

  console.log(attributes, totalAttributes);

  return (
    <Paper>
      <Grid
        rows={attributes}
        class="attributesTable"
        id="attributesTable"
        columns={[
          { name: 'name', title: oCommoni18nTexts.NAME_TXT ,align: 'left'},
          { name: 'note', title: oCommoni18nTexts.DESCRIPTION_TXT, align: 'center', hidingPriority:0},
          { name: 'actions', title: oCommoni18nTexts.ACTIONS_TXT}
        ]}
        style={{maxWidth:"100%"}}>
        <SearchState defaultValue=""/>
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={changePage}
          pageSize={5}
        />
        <IntegratedFiltering />
        <IntegratedPaging/>
        <Table
        style={{
          width:"auto",
          height:"auto"
        }}
        cellComponent = {
          (props) => {
            let row = {};
            let column = props.column;

            if(props.row){
              row = JSON.parse(JSON.stringify(props.row));
            }
            let style = props.style;

            if(column.name === 'name') {
              return (
                <TableCell style={style}>{row.name}</TableCell>
              )
            }

            if(column.name === 'note') {
              return <TableCell style={style}>{row.note}</TableCell>;
            }

            if(column.name === 'actions') {
              return (
                <TableCell style={style}>
                  <Tooltip title={oCommoni18nTexts.UPDATE_TXT}>
                    <IconButton href={"/manageAttribute/" + row._id} style={{position: 'relative'}} mini color="primary" className={classes.button}>
                      <CreateIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={oCommoni18nTexts.DELETE_TXT}>
                    <IconButton style={{position: 'relative'}} mini color="secondary" className={classes.button} onClick={() => onDelete(row._id)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              );
            }

            return <TableCell style={style}>{row.name}</TableCell>;
          }
        }
        columnExtensions={[
          { columnName: 'name', align: 'left'  },
          { columnName: 'note', align: 'left'  },
          { columnName: 'actions', align: 'left'  },
        ]}
        />
       <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={setColumnWidths}
        />
        <Toolbar rootComponent={(props)=>{
          return (<UIGrid container style={{padding:'1rem',borderBottom:'1px solid #80808045'}}>
          <UIGrid item xs style={{display: 'inline-flex'}}>
          <Button href="/manageAttribute" variant="contained" color="primary" className={classes.button}>
            {oAttributeTemplatei18nTexts.CREATE_ATTRIBUTE_TXT}
          </Button>
          </UIGrid>
          <UIGrid item xs style={{display:'inline-flex'}}>
          {props.children}
          <div>
          </div>
          </UIGrid>
          </UIGrid>);
        }}/>
        <SearchPanel />
        <PagingPanel
          containerComponent={Pager}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  );
};

AttributesTemplate.propTypes = {
  campaigns: PropTypes.array.isRequired,
  totalCampaigns: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  redirectToManageObjectPageWithCampaignId: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  checkBillingLimit: PropTypes.func.isRequired,
  onCloneCampaign: PropTypes.func.isRequired,
  style: PropTypes.object,
  children: PropTypes.array,
  loadEventData: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  isBillingAndContactsLoaded: PropTypes.bool.isRequired
};

export default withStyles({})(AttributesTemplate);