import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

enum MessageBoxButtons {
  ok,
  okCancel,
  yesNo,
  yesNoCancel
}

enum MessageBoxIcons {
 warning,
  question,
  error,
  information
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() button: number;
  @Input() icon: number;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  onButtonClick(s) {
    this.activeModal.close(s.toUpperCase());
  }

  isQuestionIcon(): boolean {
    return this.icon === MessageBoxIcons.question;
  }
  isWarningIcon(): boolean {
    return this.icon === MessageBoxIcons.warning;
  }
  isStopIcon(): boolean {
    return this.icon === MessageBoxIcons.error;
  }
  isInformationIcon(): boolean {
    return this.icon === MessageBoxIcons.information;
  }
  isOkVisible(): boolean {
    return this.button === MessageBoxButtons.ok || this.button === MessageBoxButtons.okCancel;
  }
  isCancelVisible(): boolean {
    return this.button === MessageBoxButtons.okCancel || this.button === MessageBoxButtons.yesNoCancel;
  }
  isYesVisible(): boolean {
    return this.button === MessageBoxButtons.yesNo || this.button === MessageBoxButtons.yesNoCancel;
  }
  isNoVisible(): boolean {
    return this.button === MessageBoxButtons.yesNo || this.button === MessageBoxButtons.yesNoCancel;
  }
}
