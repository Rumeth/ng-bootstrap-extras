import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbxConfirmationOptions} from './confirmation-config';
import { ConfirmationDismissReasons } from './confirmation-dismiss-reasons';

@Component({
  selector: 'ngbx-confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgbxConfirmationDialog {
  @Input() ngbxConfirmationOptions: NgbxConfirmationOptions;

  constructor(public ngbActiveModal: NgbActiveModal) {}

  accept() { this.ngbActiveModal.close(ConfirmationDismissReasons.ACCEPT); }

  reject() { this.ngbActiveModal.dismiss(ConfirmationDismissReasons.REJECT); }

  dismiss() { this.ngbActiveModal.dismiss(ConfirmationDismissReasons.DISMISS); }

  getModalHeaderClass() {
    const styles = ['modal-header', 'font-weight-bold'];

    if (this.ngbxConfirmationOptions.invertStyle) {
      styles.push(`bg-white`);

      styles.push(`text-${ this.ngbxConfirmationOptions.type }`);

      styles.push(`border-${ this.ngbxConfirmationOptions.type }`);
    } else {
      styles.push(`bg-${ this.ngbxConfirmationOptions.type }`);

      if (this.ngbxConfirmationOptions.type === 'light') {
        styles.push(`text-dark`);
      } else {
        styles.push(`text-white`);
      }
    }

    return styles.join(' ');
  }

  getDismissButtonClass() {
    const styles = ['btn', 'btn-sm', 'btn-close'];

    if (this.ngbxConfirmationOptions.invertStyle) {
      styles.push(`text-${ this.ngbxConfirmationOptions.type }`);
    } else {
      if (this.ngbxConfirmationOptions.type === 'light') {
        styles.push(`text-dark`);
      } else {
        styles.push(`text-white`);
      }
    }

    return styles.join(' ');
  }

  getActionButtonClass() {
    const styles = ['btn', 'btn-sm', 'btn-action', 'text-truncate'];

    styles.push(`btn-${ this.ngbxConfirmationOptions.type }`);

    return styles.join(' ');
  }

  getRejectionButtonClass() {
    const styles = ['btn', 'btn-sm', 'btn-rejection', 'text-truncate'];

    styles.push(`btn-outline-${ this.ngbxConfirmationOptions.type }`);

    return styles.join(' ');
  }

  getModalFooterClass() {
    const styles = ['modal-footer'];

    styles.push(`border-${ this.ngbxConfirmationOptions.type }`);

    return styles.join(' ');
  }
}
