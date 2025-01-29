class RecipeEntity {
    constructor(title, ingredients, instructions, picture_url, author_id) {   
      this.title = title;
      this.ingredients = ingredients;
      this.instructions = instructions;
      this.picture_url = picture_url;
      this.author_id = author_id;
    }
  }
  module.exports = RecipeEntity;