import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {Invoice} from '../../../../models/invoice.model';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit, OnDestroy {

  @Input()
  projectID: number;

  @Output() newInvoiceAdded: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  invoiceCopy: Invoice;


  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private toastService: ToastrService) {

  }

  ngOnInit() {
  }

  isEmpty(name: NgModel) {

  }

  isNotValid(startDate: NgModel) {

  }

  projectAction() {

    // to update an existing invoice
    if (this.invoiceCopy.id) {

      return;
    }
    // add new invoice
    this.invoiceCopy.projectID = this.projectID;
    this.invoiceCopy = Invoice.revertCast(this.invoiceCopy);
    this.projectService.newInvoice(this.invoiceCopy).subscribe(
      res => {
        if (res['status'] === '200_OK') {
          this.toastService.success('', 'Successfully added');
          this.invoiceCopy.id = res['data'].icid;
          this.newInvoiceAdded.emit({ok: true, invoice: Invoice.Cast(this.invoiceCopy)});
        } else {
          this.toastService.error('', 'Error occurred');
          this.newInvoiceAdded.emit({ok: false, invoice: null});
        }
      }, error => {
        this.toastService.error('', 'Error occurred');
        this.newInvoiceAdded.emit({ok: false, invoice: null});
      },
      () => {
        this.invoiceCopy = Invoice.revertCast(Invoice.getEmptyInvoice());
      }
    );
  }

  ngOnDestroy(): void {
  }
}
