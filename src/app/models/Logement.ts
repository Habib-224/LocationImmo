export class Image {
  id!: number;
  nomImage!: string;
  logement_id!: number; // Vous devrez peut-être ajuster cela en fonction de la structure réelle des données côté backend
}
export class Logement {
  id!: number;
  adresse!: string;
  type!: string;
  prix!: number; // Modifié le type de prix en nombre
  description!: string;
  nombreChambre!: string;
  disponibilite!: Date;
  superficie!: number; // Modifié le type de superficie en nombre
  photo!: Image[];
}
