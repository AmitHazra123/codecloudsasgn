import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as attributeActions from '../../actions/attributeActions';
import AttributesTemplate from './AttributesTemplate';
import WrappedButton from '../common/WrappedButton';

import {withRouter,Redirect} from 'react-router-dom';
import { withStyles, withTheme} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {oCommoni18nTexts, oAttributesPagei18nTexts} from '../../utilities';


class AttributesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isDeleteDialogOpen:false,
      attributeIdForDeletion:null,
      isDeleteInProgress: false,
      anchorEl:null,
      selectedAttributeId:'',
      skip: 0,
      pageSize: 5,
      currentPage: 0,
      isDeleteDialogOpen: false,
      isDialogOpen: false
    };
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.deleteAttribute = this.deleteAttribute.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount(){

    const that = this;
    const oParams = {
      skip: this.state.skip,
      limit: this.state.pageSize * 2
    };

    this
      .props
      .actions
      .loadAttributes(oParams)
      .catch(error => {
        // 
      });
  }

  componentWillReceiveProps(props) {
    this.setState({
      skip: props.attributes.length
    });
  }

  openDeleteDialog(attributeId) {
    if(attributeId !== null){
      this.setState({isDeleteDialogOpen:true,isDeleteInProgress:false,attributeIdForDeletion:attributeId});
    }
  }

  closeDeleteDialog(){
    this.setState({isDeleteDialogOpen:false,attributeIdForDeletion:null});
  }

  deleteAttribute(){
    this.setState({isDeleteInProgress: true});
    this.props.actions.deleteAttribute(this.state.attributeIdForDeletion)
      .then(() => {
        this.props.openSnackBar(oAttributesPagei18nTexts.ATTRIBUTE_DELETED_SUCCESSFULLY);
        this.closeDeleteDialog();
      })
      .catch(error => {
        this.setState({isDeleteInProgress: false});
        this.props.openSnackBar(error);
        this.closeDeleteDialog();
      });
  }

  changePage(pageIndex) {
    const that = this;

    const oParams = {
      skip: this.state.skip,
      limit: this.state.pageSize
    };

    this.setState({
      currentPage: pageIndex
    });
  }

  render() {

    const {attributes, totalAttributes} = this.props;
    const { classes , theme} = this.props;

    return (
      <div id="attributesListPage">
        <AttributesTemplate
          attributes={attributes}
          classes={classes}
          changePage={this.changePage}
          totalAttributes={totalAttributes}
          history={this.props.history}
          onDelete={this.openDeleteDialog}
          currentPage={this.state.currentPage}
        />
        <Dialog
          open={this.state.isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}}>{oAttributesPagei18nTexts.DELETE_ATTRIBUTE_CONFIRMATION_HEADER_TXT}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {oAttributesPagei18nTexts.DELETE_ATTRIBUTE_DIALOG_TEXT}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <WrappedButton
          key="deleteAttribute"
          buttonKey="deleteAttribute"
          disabled={this.state.isDeleteInProgress}
          variant="contained"
          color="secondary"
          onClick={this.deleteAttribute}
          name={oCommoni18nTexts.DELETE_BTN}
          classes={classes}
          style={{marginLeft:'1rem'}}
          icon=""/>
            <Button onClick={this.closeDeleteDialog} color="primary" variant="contained" autoFocus>
              {oCommoni18nTexts.CANCEL_BTN}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AttributesPage.propTypes = {
  attributes: PropTypes.array.isRequired,
  totalAttributes: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openSnackBar: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    attributes: state.attributes,
    totalAttributes: state.totalAttributes,
    checkingForAttributes: state.ajaxCallsInProgress.checkingForAttributes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(attributeActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles({})(withRouter(withTheme(AttributesPage))));
