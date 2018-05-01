import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Customer} from "./customer";

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if(c.value!== undefined && (isNaN(c.value) || c.value < min || c.value > max)){
            return {'range' : true }
        }
        return null;
    }
}



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
            rating:['', ratingRange(1, 5 )],
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
