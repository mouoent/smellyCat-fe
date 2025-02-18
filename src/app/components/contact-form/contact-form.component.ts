import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^\\d{5}$')]],
      address: ['', Validators.required],
      message: [''],
      terms: [false, Validators.requiredTrue]
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    const serviceID = environment.emailJsServiceID;
    const templateID = environment.emailJsTemplateID; 
    const publicKey = environment.emailJsPublicKey;
    
    this.isSubmitting = true;
    this.errorMessage = null;
    this.isSubmitted = false;
    
    const templateParams = {
      user_name: this.contactForm.value.fullName,
      user_email: this.contactForm.value.email,
      user_city: this.contactForm.value.city,
      user_postal: this.contactForm.value.postalCode,
      user_address: this.contactForm.value.address,
      user_message: this.contactForm.value.message || 'No message provided.'
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.contactForm.reset();
      })
      .catch((error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to send message. Please try again later.';
        console.error('Email sending error:', error);
      });
  }
}
