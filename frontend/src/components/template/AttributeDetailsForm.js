import React from 'react';
import PropTypes from 'prop-types';
import { withStyles , withTheme} from '@material-ui/core/styles';
import {
  Grid as GridUI,
  TextField, FormLabel,Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import WrappedButton from '../common/WrappedButton';

import {timezones, getTimeZones, oCommoni18nTexts, oAttributesDetailsPageTexts, getDayString ,aMergeTags } from '../../utilities';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    opacity: 1,
    backgroundColor: theme.palette.primary.main
  },
  checked: {},
}))(Switch);

class AttributeDetailsForm extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      campaignDialog: true
    };
  }

    render() {
      const { classes } = this.props;
      let isStepOptional = this.props.isStepOptional;
      let {attribute} = this.props;
      let {isSaveInProgress, isUnscheduleInProgress} = this.props;
      let {campaign} = this.props;
      let {onChange} = this.props;

        return [
          <div key="attributeDetailsSteper" className={classes.root}>
              <div style={{marginLeft:'2rem',marginRight:this.state.activeStep===1?'0rem':'2rem'}}>
              <form key={"attributeDetailsForm"} className={classes.container} noValidate autoComplete="off">
      <GridUI container spacing={4}>
          <GridUI item xs="12" sm="6" alignItems="center" justify="flex-start">
              <TextField
                required
                id="attributeName"
                name="name"
                required
                label={oCommoni18nTexts.NAME_TXT}
                key={"AttributeNameInput"}
                value={attribute.name}
                variant="outlined"
                onChange={onChange}
                fullWidth
                error={attribute.name === ""}
                helperText={attribute.name === "" ? oCommoni18nTexts.REQUIRED_FIELD_ERROR_TXT : ""}
                placeholder={oAttributesDetailsPageTexts.ATTRIBUTE_NAME_PLACEHOLDER}
                autoFocus
              />
          </GridUI>
          <GridUI item xs="12" sm="6" alignItems="center" justify="flex-start">
        <TextField
          id="attributeDescription"
          name="note"
          key={"AttributeDescription"}
          value={attribute.note}
          onChange={onChange}
          variant="outlined"
          fullWidth
          label={oCommoni18nTexts.DESCRIPTION_TXT}
          helperText={oAttributesDetailsPageTexts.ATTRIBUTE_DESCRIPTION_INFORMATION_TXT}
          placeholder={oAttributesDetailsPageTexts.ATTRIBUTE_DESCRIPTION_PLACEHOLDER}
          autoFocus
        />
        </GridUI>
          <GridUI item xs="12" sm="12" alignItems="center" justify="flex-start">
            <TextField
              required
              id="attributeSubject"
              name="subject"
              key={"AttributeSubjectInput"}
              value={attribute.subject}
              onChange={onChange}
              variant="outlined"
              fullWidth
              label={oAttributesDetailsPageTexts.ATTRIBUTE_SUBJECT_TXT}
              placeholder={oAttributesDetailsPageTexts.ATTRIBUTE_SUBJECT_PLACEHOLDER_TXT}
            />
          </GridUI>
          <GridUI item xs="12" sm="6" alignItems="center" justify="flex-start">
            <TextField
              id="attributeSenderName"
              name="senderName"
              key={"AttributeFormNameInput"}
              value={attribute.senderName}
              onChange={onChange}
              variant="outlined"
              fullWidth
              label={oAttributesDetailsPageTexts.ATTRIBUTE_SENDER_NAME_TXT}
              placeholder={oAttributesDetailsPageTexts.ATTRIBUTE_SENDER_NAME_PLACEHOLDER_TXT}
            />
            </GridUI>
          <GridUI item xs="12" sm="6" alignItems="center" justify="flex-start">
          <TextField
            required
            id="attributeSenderEmail"
            name="senderEmail"
            key={"AttributeFromEmailInput"}
            value={attribute.senderEmail}
            onChange={onChange}
            variant="outlined"
            fullWidth
            label={oAttributesDetailsPageTexts.ATTRIBUTE_SENDER_EMAIL_TXT}
            placeholder={oAttributesDetailsPageTexts.ATTRIBUTE_SENDER_EMAIL_PLACEHOLDER_TXT}
          />
          </GridUI>
        {
          this.props.doesAccountHasMuxSES ?
          (<GridUI item xs="12" sm="6" alignItems="center" justify="flex-start">
            <FormLabel component="legend"><Typography variant="caption">{oAttributesDetailsPageTexts.ATTRIBUTE_SERVER_SELECTION_TXT}</Typography></FormLabel>
            <FormGroup style={{ paddingTop: "0.5rem" }}>
              <GridUI container direction="row">
                <Typography>{oAttributesDetailsPageTexts.ATTRIBUTE_SES_SELECTOR_AWS_SES_TEXT}</Typography>
                <Typography style={{ alignSelf: "center", margin: "0 0.5rem 0 0.5rem" }}><AntSwitch checked={campaign.smtpType == "mux" ? true : false} onChange={this.props.changeCampaignMode} name="checkedC" /></Typography>
                <Typography>{oAttributesDetailsPageTexts.ATTRIBUTE_SES_SELECTOR_MUX_SES_TEXT}</Typography>
              </GridUI>
            </FormGroup>
          </GridUI>):null
        }

    </GridUI>
    </form>
              </div>
            </div>,
            <div>
              <div style={{margin:'2rem 2rem 0 0'}}>
                     <div style={{margin:'3rem', marginRight:0, textAlign: "right"}}>
                        <WrappedButton
                           key="saveAttribute"
                           buttonKey="saveAttribute"
                           disabled={isSaveInProgress}
                           variant="contained"
                           color="primary"
                           onClick={event => this.props.onSave(event, "Scheduled")}
                           name={this.props.attribute._id ? oCommoni18nTexts.UPDATE_TXT: oCommoni18nTexts.CREATE_TXT}
                           classes={classes}
                           style={{marginLeft:'1rem'}}
                           icon=""
                        />
                     </div>
                   </div>
            </div>
        ];
    }
}

AttributeDetailsForm.propTypes = {
  attribute: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired,
  isSaveInProgress: PropTypes.bool,
  isDeleteInProgress: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  toggleImmediateSend:PropTypes.func.isRequired
};


export default withStyles({})(withTheme(AttributeDetailsForm));