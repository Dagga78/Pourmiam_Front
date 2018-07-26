export class NewCommentaire{
  Commentaire: string;
  Nom: string;


  toString() {
    return ('Commentaire = ' + this.Commentaire + '\n' +
      'Nom = ' + this.Nom + '\n'
    );
  }

}
