export class Commentaire {
  idAvis: string;
  Commentaire: string;
  Nom: string;


  toString() {
    return ('idAvis = ' + this.idAvis + '\n' +
      'Commentaire = ' + this.Commentaire + '\n' +
      'Nom = ' + this.Nom + '\n'
    );
  }

}
