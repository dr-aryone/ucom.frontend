import React from 'react';
import ReactDOM from 'react-dom';
import MediumEditor from 'medium-editor';
import Survey from '../../Survey/Form';

export default class MediumSurvey extends MediumEditor.Extension {
  name = 'MediumSurvey';

  init() {
    this.base.subscribe('editableInput', () => {
      this.getEditorElements().forEach((el) => {
        const surveyHolder = el.querySelector('[data-survey]');

        if (surveyHolder) {
          setTimeout(() => {
            this.renderSurvay(surveyHolder);
          }, 0);
        }
      });
    });
  }

  renderSurvay(el) {
    ReactDOM.render(<Survey />, el);
  }
}
