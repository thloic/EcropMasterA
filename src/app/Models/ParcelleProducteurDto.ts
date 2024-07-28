import { Culture } from "./Culture";
import { Parcelle } from "./Parcelle";
import { Producteur } from "./Producteur";


export class ParcelleProducteurDto {
  public parcelleDto!: Parcelle;
  public producteurDto!: Producteur;
  public cultureDto!: Culture;
}
