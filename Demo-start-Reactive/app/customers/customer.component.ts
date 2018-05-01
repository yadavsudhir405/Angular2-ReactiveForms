import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
            firstName: ['',[Validators.required, Validators.minLength(3)]],
            lastName: ['',[Validators.required, Validators.maxLength(50)]],
            email: ['',[ Validators.required, Validators.pattern('[a-z]+@gmail.com')]],
            phone:'',
            notification:'email',
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

    setNotification(notificationVia: String ): void {
        const phoneControl = this.customerForm.get('phone');
        if(notificationVia === "text"){
            phoneControl.setValidators([Validators.required]);
        }else{
         phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
}
