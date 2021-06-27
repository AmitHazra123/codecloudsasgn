import React from 'react';
import * as PropTypes from "prop-types";
import { firstRowOnPage, lastRowOnPage } from "@devexpress/dx-grid-core";
import { Grid as GridUI, IconButton, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const Pagination = ({
  totalPages,
  currentPage,
  onCurrentPageChange,
  totalCount,
  pageSize,
  getMessage
}) => {
  const from = firstRowOnPage(currentPage, pageSize, totalCount);
  const to = lastRowOnPage(currentPage, pageSize, totalCount);
  const currentPageChange = (e, nextPage) => {
    e.preventDefault();
    onCurrentPageChange(nextPage);
  };

  return (
    <React.Fragment>
      <GridUI container style={{justifyContent: 'flex-end'}}>
        <GridUI item style={{alignSelf: 'center'}}>
          <Typography>
            {getMessage("info", { from, to, count: totalCount })}
          </Typography>
        </GridUI>
        <GridUI item>
          <IconButton
            disabled={currentPage === 0}
            onClick={e => currentPageChange(e, currentPage - 1)}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        </GridUI>
        <GridUI item>
          <IconButton
            disabled={currentPage === totalPages - 1 || totalCount === 0}
            onClick={e => currentPageChange(e, currentPage + 1)}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </GridUI>
      </GridUI>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired
};

export default Pagination;