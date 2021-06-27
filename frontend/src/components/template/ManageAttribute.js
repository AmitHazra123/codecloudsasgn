import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {Grow, Paper} from '@material-ui/core';
import {withTheme} from '@material-ui/core/styles';

import * as attributeActions from '../../actions/attributeActions';
import {oManageAttributei18nTexts} from '../../utilities';
import _ from 'lodash';

import AttributeDetailsForm from './AttributeDetailsForm';

class ManageAttribute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      attribute: Object.assign({}, props.attribute),
      isSaveInProgress: false,
      isUnscheduleInProgress: false,
      isDeleteInProgress: false,
      showDeleteCampaignModel:false
    };

    this.updateCampaignState = this.updateCampaignState.bind(this);
    this.saveCampaign = this.saveCampaign.bind(this);
    this.deleteCampaign = this.deleteCampaign.bind(this);
    this.closeDeleteCampaignModel = this.closeDeleteCampaignModel.bind(this);
    this.openDeleteCampaignModel = this.openDeleteCampaignModel.bind(this);
  }

  componentDidMount(){
    if(this.props.match.params.id && this.props.match.params.id != this.props.attribute._id){
      //TODO: fetch campaign by the id and assign it to the state
      this.props.actions.loadAttributes({skip:0,limit:20}).catch(error =>
        this.props.openSnackBar(error)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id && !Object.is(this.props.attribute, nextProps.attribute) && !nextProps.location.state) {
      this.setState({attribute: Object.assign({}, nextProps.attribute)});
    }
  }

  updateCampaignState(event) {
    const field = event.target.name;
    let attribute = JSON.parse(JSON.stringify(this.state.attribute));
    attribute[field] = event.target.value;
    return this.setState({attribute: attribute});
  }

  saveCampaign(event) {
    event.preventDefault();
    
    let attribute = {...this.state.attribute};
    let that = this;
    
    if(this.state.attribute.name !== "") {
      if(this.state.attribute._id){
        this.props.actions.updateAttribute(attribute)
          .then(() => {
            that.setState({isSaveInProgress: false, isUnscheduleInProgress: false});
            that.redirect(oManageAttributei18nTexts.ATTRIBUTE_UPDATED_TXT);
          })
          .catch(error => {
            that.props.openSnackBar(error);
            that.setState({isSaveInProgress: false, isUnscheduleInProgress: false});
          });
      }else{
        this.props.actions.createAttribute(attribute)
          .then(data => {
            that.setState({isSaveInProgress: false, isUnscheduleInProgress: false});
            that.redirect(oManageAttributei18nTexts.ATTRIBUTE_CREATED_TXT);
          })
          .catch(error => {
            that.props.openSnackBar(error);
            that.setState({isSaveInProgress: false, isUnscheduleInProgress: false});
          });
      }
    }
  }

  closeDeleteCampaignModel() {
    this.setState({ showDeleteCampaignModel: false });
  }
  openDeleteCampaignModel() {
    this.setState({ showDeleteCampaignModel: true });
  }

  deleteCampaign(event){
    this.setState({isDeleteInProgress: true});
    this.props.actions.campaignActions.deleteCampaign(this.state.campaign._id)
      .then(() => {
        this.redirect(oManageAttributei18nTexts.CAMPAIGN_DELETED_TXT);
        this.setState({isDeleteInProgress: false});
    })
      .catch(error => {
        this.props.openSnackBar(error);
        this.setState({isDeleteInProgress: false});
      });
  }

  redirect(txt) {
    this.setState({isSaveInProgress: false});
    this.props.openSnackBar(txt);
    this.props.history.push('/');
  }

  render() {
    const { classes, theme } = this.props;
    return [
      <h2 key="attributeFormHeader">{this.state.attribute._id?this.props.attribute.name :oManageAttributei18nTexts.CREATE_ATTRIBUTE_TXT}</h2>,
      <Grow in={true} timeout={1000}>
      <Paper style={theme.pagePaper} key="ManageAttributeContext">
      <AttributeDetailsForm
        onChange={this.updateCampaignState}
        onSave={this.saveCampaign}
        attribute={this.state.attribute}
        isSaveInProgress={this.state.isSaveInProgress}
        isUnscheduleInProgress={this.state.isUnscheduleInProgress}
        isDeleteInProgress={this.state.isDeleteInProgress}
        onDelete={this.openDeleteCampaignModel}
        classes={classes}
      />
      </Paper>
      </Grow>
    ];
  }
}

ManageAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openSnackBar: PropTypes.func.isRequired
};

function getAttributeById(attributes, id) {
  const attribute = attributes.filter(attribute => attribute._id === id);
  if (attribute) return attribute[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  let attributeId = ownProps.match.params.id;
  if(!attributeId && ownProps.location.state && ownProps.location.state.attributeId){
    attributeId = ownProps.location.state.attributeId1;
  }

  let attribute = {
    name:"",
    subject:"",
    senderName: "",
    senderEmail: "",
    replyEmails: [],
    status: "Draft",
    isValid:true,
    isActive:true,
    template:{messageBody:"",designJson:""},
    inputDetails:[],
    isMarkedForImmediateSend:true
  };

  if (attributeId && state.attributes.length > 0) {
    let attributeDetails = getAttributeById(state.attributes, attributeId);
    attribute = (attributeDetails != null)?JSON.parse(JSON.stringify(attributeDetails)) : attribute;
  }

  return {
    attribute: attribute,
    checkingForAttribute: state.ajaxCallsInProgress.checkingForAttribute,
    attributes: state.attributes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(attributeActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(ManageAttribute)));