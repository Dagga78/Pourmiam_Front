export class Plats {
  id: string;
  name: string;
  photo: string;


  toString() {
    return ('id = ' + this.id + '\n' +
      'name = ' + this.name + '\n' +
      'photo = ' + this.photo + '\n'
    );
  }

}
