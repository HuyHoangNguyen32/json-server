const faker = require("faker");
const fs = require("fs");

// Set locale to use Vietnamese
faker.locale = "vi";


const randomCategoryList = (n) => {

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };

    categoryList.push(category);
  })

  return categoryList;
}


const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  //random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(()=>{
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createAt: Date.now(),
        updateAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400,400),
      }

      productList.push(product);
    })
  }
  return productList;
}

(() => {
  //random date
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Pro",
    },
  };

  // write db object to db.json
  fs.writeFile('db.json',JSON.stringify(db), () => {
    console.log('Generated data successfully')
  })
})();
