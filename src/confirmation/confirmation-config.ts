import {Injectable} from '@angular/core';
import {NgbModalConfig, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

/**
 * Represent options available when opening new confirmation windows.
 */
export interface NgbxConfirmationOptions extends NgbModalOptions {
  /**
   * Type of the Confirmation window.
   */
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

  /**
   * Invert the background and text of the header.
   */
  invertStyle?: boolean;

  /**
   * Title of the Confirmation window.
   */
  title?: string;

  /**
   * Whether to show the cross button in the header (true by default).
   */
  showDismissButton?: boolean;

  /**
   * Message to show in the Confirmation window.
   */
  message?: string;

  /**
   * Whether to show the action button in the footer (true by default).
   */
  showActionButton?: boolean;

  /**
   * Text to show in the action button.
   */
  actionButtonText?: string;

  /**
   * Whether to show the rejection button in the footer (true by default).
   */
  showRejectionButton?: boolean;

  /**
   * Text to show in the rejection button.
   */
  rejectionButtonText?: string;
}

/**
 * Configuration object token for the NgbxConfirmation service.
 * You can provide this configuration, typically in your root module in order to provide default option values for every
 * modal.
 */
@Injectable({providedIn: 'root'})

export class NgbxConfirmationConfig extends NgbModalConfig implements NgbxConfirmationOptions {
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';

  invertStyle = false;

  title = 'Confirmation Dialog';

  showDismissButton = true;

  message = 'Are you sure?';

  showActionButton = true;

  actionButtonText = 'Ok';

  showRejectionButton = true;

  rejectionButtonText = 'Cancel';

  backdrop: boolean | 'static' = 'static';

  keyboard = false;
}
