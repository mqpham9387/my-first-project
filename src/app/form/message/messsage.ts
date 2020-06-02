import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './message.component';

export enum MessageBoxButtons {
    ok,
    okCancel,
    yesNo,
    yesNoCancel,
}

export enum MessageBoxIcons {
    warning,
    question,
    error,
    information
}

export class MessageBox {
    static show(dialog: NgbModal, message, title = 'Alert', button = MessageBoxButtons.ok, icon = MessageBoxIcons.information) {
        const dialogRef = dialog.open(MessageComponent, { windowClass: 'gr-modal-message', backdrop: false, keyboard: false });
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.button = button;
        dialogRef.componentInstance.icon = icon;
        return dialogRef.result;
    }
}