import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "./customer";

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer = new Customer();


    constructor(private fb: FormBuilder ) {
    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: '',
            lastName: {value: '', disabled: true},
            email: '',
            sendCatalog: true
        });
    }

    populateData() {
        this.customerForm.patchValue({
            firstName: "Sudhir",
            lastName: "Yadav",
            // email: "adfas@gmail.com",
            sendCatalog: true
        });
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
}
