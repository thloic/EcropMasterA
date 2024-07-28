export class Culture {
  public id! : number;
  public nom!: string;
  public photo! : string|null;
  get photoUrl(): string {
    return this.photo ? `http://localhost:8080/images/${this.photo}` : 'default-image-path';
  }

}
