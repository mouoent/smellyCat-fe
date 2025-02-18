# SmellyCat - Contact Form
Angular-based Contact Form with EmailJS & Google Maps Embed

## Features
- Responsive Contact Form
- Sends emails via EmailJS 
- Displays Google Maps dynamically
- Validations (Required fields, email format, etc.)

## Installation and Setup

### 1. Install Dependencies
````bash
npm insttall
````

### 2. Create `environment.ts`
This file is ignored by Git to protect your keys.
1. Navigate to:
````bash
smellycat/src/
````
2. Copy the template: `environment.template.ts`
3. Rename it to: `environment.ts`
4. Open `environment.ts` and fill in your values:
````typescript
export const environment = {
    production: false,
    emailJsServiceID: 'service_id_placeholder',
    emailJsTemplateID: 'template_id_placeholder',
    emailJsPublicKey: 'public_key_placeholder'
};  
````

### 3. Start the Development Server
````bash
ng serve
````
- Open at `http://localhost:4200/`

## Setting Up EmailJS
1. Create an account [emailjs](https://www.emailjs.com/).
2. Get your:
   - Public Key
   - Service ID
   - Template ID
3. Add them to `environment.ts`

## Setting Up Google Maps
1. Google Maps uses an embed URL.
2. Address-based URL is dynamically generated:
````typescript
getGoogleMapsEmbedUrl(address: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}
````