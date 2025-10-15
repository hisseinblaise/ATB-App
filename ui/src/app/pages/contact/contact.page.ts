import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule, LoadingController, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.contactForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      sujet: ["", [Validators.required, Validators.minLength(5)]],
      message: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  ngOnInit() {}

  get f() {
    return this.contactForm.controls;
  }

  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.isSubmitting);
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control || !control.errors) return "";

    if (control.errors["required"]) return "Ce champ est obligatoire";
    if (control.errors["email"]) return "Email invalide";
    if (control.errors["minlength"])
      return `Minimum ${control.errors["minlength"].requiredLength} caractères`;
    if (control.errors["maxlength"])
      return `Maximum ${control.errors["maxlength"].requiredLength} caractères`;

    return "Champ invalide";
  }

  async onSubmit() {
    this.isSubmitting = true;

    if (this.contactForm.invalid) {
      this.markAllAsTouched();
      this.isSubmitting = false;
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: "Envoi du message...",
      spinner: "crescent",
    });
    await loading.present();

    this.http.post("http://localhost:3000/api/contact/saveMessage", this.contactForm.value)
      .subscribe({
        next: async (res: any) => {
          await loading.dismiss();
          this.isSubmitting = false;
          this.contactForm.reset();
          this.showToast(res.message || "Message envoyé avec succès !");
        },
        error: async (err: any) => {
          await loading.dismiss();
          this.isSubmitting = false;
          console.error(err);
          this.showToast(err.error?.error || "Erreur lors de l'envoi du message", "danger");
        },
      });
  }

  private markAllAsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  private async showToast(message: string, color: "success" | "danger" = "success") {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: "top",
    });
    toast.present();
  }
}
