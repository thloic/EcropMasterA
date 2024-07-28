import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Culture } from 'src/app/Models/Culture';
import { CultureService } from 'src/app/Services/culture.service';

@Component({
  selector: 'app-list-culture',
  templateUrl: './list-culture.component.html',
  styleUrls: ['./list-culture.component.css']
})
export class ListCultureComponent implements OnInit {
  cultures: any[] = [];
  cultureForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private cultureService: CultureService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router:Router


  ) { }

  ngOnInit() {
    this.getCultures();
    this.initCultureForm();
  }

  initCultureForm() {
    this.cultureForm = this.formBuilder.group({
      nom: ['', Validators.required],
      photo: [null, Validators.required] // Change ici
    });
  }

  getCultures() {
    this.cultureService.getCultures().subscribe(
      (cultures: Culture[]) => {
        this.cultures = cultures;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des cultures :', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cultureForm.patchValue({
        photo: file
      });
      this.errorMessage = ''; // Réinitialiser le message d'erreur
    }
  }

  onSubmit() {
    if (this.cultureForm.valid) {
      const formData = new FormData();
      formData.append('nom', this.cultureForm.get('nom')!.value);
      formData.append('photo', this.cultureForm.get('photo')!.value);

      this.cultureService.enregistrerCulture(formData).subscribe(
        (culture: Culture) => {
          console.log('Culture enregistrée :', culture);
          this.toastr.success("Enregistrement réussi");
          this.getCultures(); // Rafraîchir la liste des cultures
          this.cultureForm.reset(); // Réinitialiser le formulaire
        },
        (error: any) => {
          console.error('Erreur lors de l\'enregistrement de la culture :', error);
          this.toastr.error("Erreur lors de l'enregistrement de la culture");
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }

  supprimerCulture(id: number) {
    this.cultureService.supprimerCulture(id).subscribe(
      () => {
        this.cultures = this.cultures.filter(culture => culture.id !== id);
        this.toastr.info("suppression reussie")
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de la culture :', error);
      }
    );
  }
}
