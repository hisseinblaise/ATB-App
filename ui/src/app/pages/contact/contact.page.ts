import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.page.html",
  styleUrls: ["./contact.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class ContactPage implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.contactForm = this.createForm();
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.pattern("^[0-9+\\s\\-\\(\\)]{10,}$")]],
      subject: ["", [Validators.required, Validators.minLength(5)]],
      message: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      serviceType: ["general", [Validators.required]],
      urgency: ["normal", [Validators.required]],
    });
  }

  // Getters pour accéder facilement aux contrôles du formulaire
  get firstName() {
    return this.contactForm.get("firstName");
  }
  get lastName() {
    return this.contactForm.get("lastName");
  }
  get email() {
    return this.contactForm.get("email");
  }
  get phone() {
    return this.contactForm.get("phone");
  }
  get subject() {
    return this.contactForm.get("subject");
  }
  get message() {
    return this.contactForm.get("message");
  }
  get serviceType() {
    return this.contactForm.get("serviceType");
  }
  get urgency() {
    return this.contactForm.get("urgency");
  }

  // Options pour les sélecteurs
  serviceTypes = [
    { value: "general", label: "Demande générale" },
    { value: "web", label: "Développement Web" },
    { value: "mobile", label: "Application Mobile" },
    { value: "design", label: "Design UI/UX" },
    { value: "maintenance", label: "Maintenance" },
    { value: "training", label: "Formation" },
    { value: "consulting", label: "Consulting" },
  ];

  urgencyLevels = [
    { value: "low", label: "Faible", icon: "time-outline" },
    { value: "normal", label: "Normal", icon: "alert-circle-outline" },
    { value: "high", label: "Urgent", icon: "warning-outline" },
  ];

  async onSubmit() {
    this.isSubmitted = true;

    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Simulation d'envoi
      console.log("Données du formulaire:", this.contactForm.value);

      setTimeout(async () => {
        this.isSubmitting = false;
        await this.showSuccessAlert();
        this.resetForm();
      }, 1500);
    } else {
      this.markAllFieldsAsTouched();
      this.scrollToFirstInvalidField();
    }
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.contactForm.controls).forEach((key) => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  private scrollToFirstInvalidField() {
    const firstInvalidElement = document.querySelector(
      ".ion-invalid, .ng-invalid"
    );
    if (firstInvalidElement) {
      firstInvalidElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  private async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: "Message envoyé !",
      message:
        "Merci pour votre message. Nous vous répondrons dans les plus brefs délais.",
      buttons: [
        {
          text: "OK",
          role: "confirm",
          cssClass: "alert-success-button",
        },
      ],
      cssClass: "success-alert",
    });

    await alert.present();
  }

  resetForm() {
    this.contactForm.reset({
      serviceType: "general",
      urgency: "normal",
    });
    this.isSubmitted = false;
  }

  // Méthodes de validation
  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return (
      !!control && control.invalid && (control.touched || this.isSubmitted)
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);

    if (!control || !control.errors) return "";

    if (control.errors["required"]) {
      return "Ce champ est obligatoire";
    }
    if (control.errors["email"]) {
      return "Format d'email invalide";
    }
    if (control.errors["minlength"]) {
      const requiredLength = control.errors["minlength"].requiredLength;
      return `Minimum ${requiredLength} caractères`;
    }
    if (control.errors["maxlength"]) {
      const requiredLength = control.errors["maxlength"].requiredLength;
      return `Maximum ${requiredLength} caractères`;
    }
    if (control.errors["pattern"]) {
      return "Format de téléphone invalide";
    }

    return "Champ invalide";
  }

  // Calcul du nombre de caractères restants pour le message
  getRemainingCharacters(): number {
    const messageControl = this.message;
    const currentLength = messageControl?.value?.length || 0;
    return 500 - currentLength;
  }

  // Informations de contact rapide
  contactMethods = [
    {
      icon: "call-outline",
      title: "Appeler",
      description: "+33 1 23 45 67 89",
      action: () => window.open("tel:+33123456789", "_self"),
    },
    {
      icon: "mail-outline",
      title: "Email",
      description: "contact@abechetech.com",
      action: () => window.open("mailto:contact@abechetech.com", "_self"),
    },
    {
      icon: "location-outline",
      title: "Localisation",
      description: "Paris, France",
      action: () => window.open("https://maps.google.com", "_blank"),
    },
  ];

  onContactMethodClick(method: any) {
    method.action();
  }
}
