import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { notification, paymentcards } from './data';

// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

// Setting Component
export class SettingComponent implements OnInit {
  cardForm!: UntypedFormGroup;
  masterSelected!: boolean;
  submitted = false;
  allnotification: any;
  allpayment: any;

  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    /**
     * Form Validation
     */
    this.cardForm = this.formBuilder.group({
      ids: [''],
      method: ['', [Validators.required]],
      title: ['', [Validators.required]],
      card_name: ['', [Validators.required]],
      expire_date: ['', [Validators.required]],
      card_no: ['', [Validators.required]],
    });

    // Fetch Data
    this.allnotification = notification
    this.allpayment = paymentcards
  }

  /**
  * Form data get
  */
  get form() {
    return this.cardForm.controls;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.allnotification.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  /**
  * Open modal
  * @param content modal content
  */
  openModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: false });
  }

  /**
 * Open modal
 * @param content modal content
*/

  editModal(id: any, content: any) {
    this.modalService.open(content, { size: 'lg', centered: false });
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update Card";
    this.cardForm.controls['method'].setValue(this.allpayment[id].method);
    this.cardForm.controls['title'].setValue(this.allpayment[id].title);
    this.cardForm.controls['card_no'].setValue(this.allpayment[id].card_no);
    this.cardForm.controls['card_name'].setValue(this.allpayment[id].card_name);
    this.cardForm.controls['expire_date'].setValue(this.allpayment[id].expire_date);
    this.cardForm.controls['ids'].setValue(this.allpayment[id].id);
  }

  /**
  * Save user
  */
  savePayment() {
    if (this.cardForm.valid) {
      if (this.cardForm.get('ids')?.value) {
        this.allpayment = this.allpayment.map((card: { id: any; }) => card.id === this.cardForm.get('ids')?.value ? { ...card, ...this.cardForm.value } : card);
      }
      else {
        const method = this.cardForm.get('method')?.value;
        const image = (method == 'paypal' ? 'assets/img/card-paypal.png' : 'assets/img/card-master.png');
        const title = this.cardForm.get('title')?.value;
        const card_no = this.cardForm.get('card_no')?.value;
        const card_name = this.cardForm.get('card_name')?.value;
        const expire_date = this.cardForm.get('expire_date')?.value;

        this.allpayment.push({
          id: this.allpayment.length + 1,
          method,
          image,
          title,
          card_no,
          card_name,
          expire_date
        })
      }
      this.modalService.dismissAll();
      this.cardForm.reset();
    }
    this.submitted = true;
  }

  // Remove Data
  removeData(e: any) {
    Swal.fire({
      title: 'Are you Sure ?',
      text: 'Are you Sure You want to Remove this Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', confirmButtonColor: '#364574', icon: 'success', });
        e.target.closest('tr').remove();
      }
    });
  }


}
