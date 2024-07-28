import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Culture } from 'src/app/Models/Culture';
import { ParcelleProducteurDto } from 'src/app/Models/ParcelleProducteurDto';
import { Producteur } from 'src/app/Models/Producteur';
import { CultureService } from 'src/app/Services/culture.service';
import { ParcelleService } from 'src/app/Services/parcelle.service';
import { ProducteurService } from 'src/app/Services/producteur.service';

@Component({
  selector: 'app-list-parcelle',
  templateUrl: './list-parcelle.component.html',
  styleUrls: ['./list-parcelle.component.css']
})
export class ListParcelleComponent implements OnInit {
  parcelleForm!: FormGroup;
  producteurs: Producteur[] = [];
  cultures: Culture[] = [];
  parcelles: ParcelleProducteurDto[] = []; // Ajout d'un tableau pour stocker les parcelles

  constructor(
    private fb: FormBuilder,
    private parcelleService: ParcelleService,
    private producteurService: ProducteurService,
    private cultureService: CultureService
  ) {}

  ngOnInit(): void {
    this.parcelleForm = this.fb.group({
      referentiel: ['', Validators.required],
      region: ['', Validators.required],
      village: ['', Validators.required],
      superficie: [0, [Validators.required, Validators.min(1)]],
      nombredeParcelle: [0, [Validators.required, Validators.min(1)]],
      producteur: ['', Validators.required],
      culture: ['', Validators.required]
    });

    // Charger les producteurs et cultures depuis le service
    this.loadProducteurs();
    this.loadCultures();
    // this.loadParcelles(); // Charger les parcelles existantes
  }

  loadProducteurs(): void {
    this.producteurService.getProducteurs().subscribe(
      data => {
        this.producteurs = data;
        console.log('Producteurs récupérés:', this.producteurs);
        // this.loadParcelles(); // Charger les parcelles après avoir récupéré les producteurs
      },
      error => {
        console.error('Erreur lors de la récupération des producteurs:', error);
      }
    );
  }


  loadCultures(): void {
    this.cultureService.getCultures().subscribe(
      data => {
        this.cultures = data;
        console.log('Cultures récupérées:', this.cultures);
      },
      error => {
        console.error('Erreur lors de la récupération des cultures:', error);
      }
    );
  }

  // loadParcelles(): void {
  //   const producteurId = this.producteurs.length > 0 ? this.producteurs[0].id : null; // Exemple : prendre le premier producteur

  //   if (producteurId) {
  //     this.parcelleService.getAllParcelles(producteurId).subscribe(
  //       data => {
  //         this.parcelles = [];
  //         console.log('Parcelles récupérées:', this.parcelles);
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des parcelles:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Aucun producteur disponible pour charger les parcelles.');
  //   }
  // }


  onSubmit(): void {
    if (this.parcelleForm.valid) {
      const producteurId = this.parcelleForm.get('producteur')?.value;
      const cultureId = this.parcelleForm.get('culture')?.value;

      const parcelleProducteurDto: ParcelleProducteurDto = {
        parcelleDto: this.parcelleForm.value,
        producteurDto: this.producteurs.find(p => p.id === producteurId)!,
        cultureDto: this.cultures.find(c => c.id === cultureId)!
      };

      console.log('enregistrement reussi:', parcelleProducteurDto);


  }
}
}
