export default class Recipe {
  constructor(
    recipe
  ) {
    (this._id = recipe.id),
    (this._name = recipe.name),
    (this._servings = recipe.servings),
    (this._ingredients = recipe.ingredients),
    (this._time = recipe.time),
    (this._description = recipe.description),
    (this._appliance = recipe.appliance),
    (this._ustensils = recipe.ustensils);
  }
  set id(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }

  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  set servings(servings) {
    this._servings = servings;
  }
  get servings() {
    return this._servings;
  }

  set ingredients(ingredients) {
    this._ingredients = ingredients;
  }
  get ingredients() {
    return this._ingredients;
  }

  set time(time) {
    this._time = time;
  }
  get time() {
    return this._time;
  }

  set description(description) {
    this._description = description;
  }
  get description() {
    return this._description;
  }

  set appliance(appliance) {
    this._appliance = appliance;
  }
  get appliance() {
    return this._appliance;
  }

  set ustensils(ustensils) {
    this._ustensils = ustensils;
  }
  get ustensils() {
    return this._ustensils;
  }
}
