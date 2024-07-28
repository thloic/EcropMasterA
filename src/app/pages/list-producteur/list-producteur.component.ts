import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Producteur } from 'src/app/Models/Producteur';
import { ProducteurService } from 'src/app/Services/producteur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-producteur',
  templateUrl: './list-producteur.component.html',
  styleUrls: ['./list-producteur.component.css']
})
export class ListProducteurComponent implements OnInit {
  producteurs: Producteur[] = []; // Typage correct
  producteurForm!: FormGroup;

  constructor(
    private producteurService: ProducteurService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducteurs();
    this.initProducteurForm();
  }

  fetchProducteurs(): void {
    console.log('Récupération des producteurs...');
    this.producteurService.getProducteurs().subscribe(
      (producteurs) => {
        console.log('Producteurs reçus :', producteurs);
        this.producteurs = producteurs;
        this.cdr.detectChanges();
        console.log('Producteurs assignés à la propriété producteurs :', this.producteurs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des producteurs : ', error);
      }
    );
  }

  initProducteurForm(): void {
    this.producteurForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      prenom: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      adresse: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      dateAdhesion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.producteurForm.valid) {
      const producteur: Producteur = this.producteurForm.value;
      this.producteurService.enregistrerProducteur(producteur).subscribe(
        (response) => {
          console.log('Producteur enregistré avec succès', response);
          this.toastr.success('Enregistrement réussi');

          // Ajoutez l'ID au producteur avant de l'ajouter à la liste
          this.producteurs.push(response); // Assurez-vous que 'response' contient l'ID

          this.producteurForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du producteur', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  supprimerProducteur(id: number): void {
    console.log('ID reçu pour suppression:', id);
    if (!id) {
      console.error('ID du producteur est indéfini');
      this.toastr.error('Erreur lors de la suppression');
      return;
    }
    console.log('Tentative de suppression du producteur avec ID:', id);

    this.producteurService.supprimerProducteur(id).subscribe(
      () => {
        console.log('Producteur supprimé avec succès');
        this.toastr.info('Suppression réussie');
        this.fetchProducteurs();
      },
      (error) => {
        console.error('Erreur lors de la suppression du producteur', error);
        this.toastr.error('Erreur lors de la suppression');
      }
    );
  }
}
