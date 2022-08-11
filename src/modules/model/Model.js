import { computed, observable } from 'mobx';

class Model {
  @observable
  id;

  constructor(value) {
    this.id = value?.id;
  }
}

export default Model;
