const { Category } = require("../models/category");
const _ = require("lodash");

const categories = [
  {
    name: "Furniture",
    icon: "floor-lamp",
    backgroundColor: "#fc5c65",
    color: "white",
  },
  {
    name: "Cars",
    icon: "car",
    backgroundColor: "#fd9644",
    color: "white",
  },
  {
    name: "Cameras",
    icon: "camera",
    backgroundColor: "#fed330",
    color: "white",
  },
  {
    name: "Games",
    icon: "cards",
    backgroundColor: "#26de81",
    color: "white",
  },
  {
    name: "Clothing",
    icon: "shoe-heel",
    backgroundColor: "#2bcbba",
    color: "white",
  },
  {
    name: "Sports",
    icon: "basketball",
    backgroundColor: "#45aaf2",
    color: "white",
  },
  {
    name: "Movies & Music",
    icon: "headphones",
    backgroundColor: "#4b7bec",
    color: "white",
  },
  {
    name: "Books",
    icon: "book-open-variant",
    backgroundColor: "#a55eea",
    color: "white",
  },
  {
    name: "Other",
    icon: "application",
    backgroundColor: "#778ca3",
    color: "white",
  },
];

const seedCategories = () => {
  _.each(categories, async (category) => {
    const categoryItem = new Category({
      name: category.name,
      icon: category.icon,
      backgroundColor: category.backgroundColor,
      color: category.color,
    });
    await categoryItem.save();
  });
};

module.exports = {
  seedCategories,
};
