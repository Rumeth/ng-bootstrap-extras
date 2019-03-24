import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NgbxConfirmationConfig, NgbxConfirmationOptions} from './confirmation-config';
import {NgbxConfirmationDialog} from './confirmation-dialog';

/**
 * A service to open confirmation windows. Creating a confirmation window is straightforward:
 * create a NgbxConfirmationOptions object and pass it as an argument to the "open" method!
 */
@Injectable({providedIn: 'root'})

export class NgbxConfirmation {
  constructor(private ngbModal: NgbModal, private ngbxConfirmationConfig: NgbxConfirmationConfig) {}

  /**
   * Opens a new confirmation window using supplied options.
   */
  open(options?: NgbxConfirmationOptions) {
    const ngbxConfirmationOptions = Object.assign({}, this.ngbxConfirmationConfig, options);

    if (this.validateOptions(ngbxConfirmationOptions)) {
      const ngbxConfirmationDialog = this.ngbModal.open(NgbxConfirmationDialog, ngbxConfirmationOptions);

      ngbxConfirmationDialog.componentInstance.ngbxConfirmationOptions = ngbxConfirmationOptions;

      return ngbxConfirmationDialog;
    }
  }

  validateOptions(options?: NgbxConfirmationOptions) {
    if (!options.showDismissButton && !options.showActionButton && !options.showRejectionButton) {
      throw new Error(
          'Invalid Configuration : This configuration makes it impossible to dismiss the Confirmation Dialog.');
    } else {
      if ((!options.title || options.title === '') && !options.showActionButton && !options.showRejectionButton) {
        throw new Error(
            'Invalid Configuration : This configuration makes it impossible to dismiss the Confirmation Dialog.');
      } else {
        if (!options.message || options.message === '') {
          throw new Error('Invalid Configuration : Message is a required field. It cannot be empty.');
        }
      }
    }

    return true;
  }
}
