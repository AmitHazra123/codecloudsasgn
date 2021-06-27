export const oCommoni18nTexts = {
  ADD_TXT: 'Add',
  OKAY_TXT:'Ok',
  EMAIL_TXT: 'Email',
  PASSWORD_TXT: 'Password',
  CANCEL_BTN: 'Cancel',
  DELETE_BTN: 'Delete',
  EDIT_TXT:'Edit',
  EDIT_EMAIL: 'Edit email',
  DELETE_TXT:'Delete',
  EMAIL_ALREADY_EXIST_MESSAGE: 'Email already exists!',
  INVALID_EMAIL_ERROR_MESSAGE: 'Your email appears to be invalid.',
  INVALID_PASSWORD_ERROR_MESSAGE: 'Enter your password.',
  INVALID_NAME_ERROR_MESSAGE: 'Name is not valid.',
  INVALID_FNAME_ERROR_MESSAGE: 'First name is not valid.',
  INVALID_LNAME_ERROR_MESSAGE: 'Last name is not valid.',
  INVALID_TIME_ZONE_ERROR_MESSAGE_TXT: 'Invalid time zone',
  INVALID_TEMPLATE_MESSAGE_BODY_TXT: 'Your email must contain {{unsubscribeurl}} and {{senderinfo}} tags',
  NAME_TXT: 'Name',
   DESCRIPTION_TXT: 'Note',
  CREATED_BY_TXT: 'Created by',
  CREATED_ON_TXT: 'Created on',
  UPDATED_ON_TXT: 'Updated on',
  ACTIONS_TXT: 'Actions',
  SAVE_TXT: 'Save',
  CREATE_TXT: 'Create',
  UPDATE_TXT: 'Update',
  REQUIRED_FIELD_ERROR_TXT:'This is a required field.',
  SELECT_TIMEZONE_PLACEHOLDER: 'Select preferred time zone *',
  ATTRIBUTE_TIME_ZONE_LABEL_TXT:'Time zone',
  ATTRIBUTE_DATE_TIME_SELECTOR__LABEL_TXT: "Schedule date and time",
  ATTRIBUTE_SENDING_TIME_LABEL_TXT:'Sending time',
  SAVE_DETAILS_TXT: 'Save details',
  SOMETHING_WENT_WRONG_TXT: 'Something went wrong. Try again later!',
  LOADED_TXT:'Loaded',
  LOAD_TEMPLATE_HEADER_TXT: 'Select Template Design'
};

export const oAttributesPagei18nTexts = {
  ATTRIBUTE_DELETED_SUCCESSFULLY: "Attribute deleted.",
  ATTRIBUTES_TXT: "Attributes",
  EDIT_ATTRIBUTE_TXT:"Edit attribute",
  DELETE_ATTRIBUTE_TXT:"Delete attribute",
  DELETE_ATTRIBUTE_CONFIRMATION_HEADER_TXT: 'Are you sure you want to delete this attribute?',
  DELETE_ATTRIBUTE_DIALOG_TEXT: "You cannot retrieve this once deleted. All history and data regarding this attribute will be lost.",
};

export const oAttributesDetailsPageTexts = {
  ATTRIBUTE_SUBJECT_TXT: 'Subject',
  ATTRIBUTE_SENDER_NAME_TXT: "From name",
  ATTRIBUTE_SENDER_NAME_PLACEHOLDER_TXT:"",
  ATTRIBUTE_SENDER_EMAIL_TXT: "From email address",
  ATTRIBUTE_SENDER_EMAIL_PLACEHOLDER_TXT:""
};

export const oManageAttributei18nTexts = {
  CREATE_ATTRIBUTE_TXT : 'Create attribute',
  INVALID_DATE_ERROR_TXT: 'Invalid date',
  ATTRIBUTE_UPDATED_TXT: 'Attribute updated.',
  ATTRIBUTE_CREATED_TXT: 'Attribute created.',
  ATTRIBUTE_DELETED_TXT: 'Attribute deleted.'
};

export const oAttributeTemplatei18nTexts = {
  CREATE_ATTRIBUTE_TXT:'Create',
  ATTRIBUTES_TXT:"attribute(s)",
  ATTRIBUTE_MORE_OPTION_BTN_TXT: 'More options',
};

export const api = {
  BASE_URL: 'http://localhost:8000/api/',                 // process.env.API_URL
  GET_ALL_ATTRIBUTES:'getAllAttributes/',
  CREATE_ATTRIBUTE:'createAttribute',
  UPDATE_ATTRIBUTE:'updateAttributeById/',
  DELETE_ATTRIBUTE:'deleteAttributeById/',
};