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

function emailChecker(c: AbstractControl ):{[key:string]: boolean } | null {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');
    if(emailControl.pristine || confirmControl.pristine ){
        return null;
    }

    if(emailControl.value === confirmControl.value){
        return null;
    }
    return { 'match': true }
}



@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    emailValidationMessage: string;
    customer = new Customer();
    private validationMessages = {
        required: 'Please enter your email address',
        pattern: 'Please enter valid email address'
    };

    constructor(private fb: FormBuilder ) {
    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['',[Validators.required, Validators.minLength(3)]],
            lastName: ['',[Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: ['',[ Validators.required, Validators.pattern('[a-z]+@gmail.com')]],
                confirmEmail: ['',[ Validators.required, Validators.pattern('[a-z]+@gmail.com')]]
            }, { validator: emailChecker } ),
            phone:'',
            notification:'email',
            rating:['', ratingRange(1, 5 )],
            sendCatalog: true
        });

        this.customerForm.get('notification').valueChanges.subscribe(
            value => {
                this.setNotification(value);
            }
        );
        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.subscribe(value =>
                this.setValidationMessage(emailControl));
    }

    populateData() {
        this.customerForm.patchValue({
            firstName: "Sudhir",
            lastName: "Yadav",
            email: "adfas@gmail.com",
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

    setValidationMessage(emailControl: AbstractControl): void {
        this.emailValidationMessage = '';
        console.log('****');
        if((emailControl.touched || emailControl.dirty) && emailControl.errors ){
            this.emailValidationMessage = Object.keys(emailControl.errors).map(key =>
                this.validationMessages[key ]).join(',')
        }
    }
}
