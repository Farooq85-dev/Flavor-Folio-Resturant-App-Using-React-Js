import pizza1 from "../../assets/pizza-1.webp";
import pizza2 from "../../assets/pizza-2.webp";
import pizza3 from "../../assets/pizza-3.webp";
import pizza4 from "../../assets/pizza-4.webp";
import bottle1 from "../../assets/bottle-1.webp";
import bottle2 from "../../assets/bottle-2.webp";
import bottle3 from "../../assets/bottle-3.webp";
import bottle4 from "../../assets/bottle-4.webp";
import bread1 from "../../assets/bread-1.webp";
import bread2 from "../../assets/bread-2.webp";
import bread3 from "../../assets/bread-3.webp";
import bread4 from "../../assets/bread-4.webp";
import { useEffect, useState } from "react";
import NavbarComp from "../Navbar";
import { FooterComp } from "../Footer";
import { CiShoppingCart } from "react-icons/ci";
import Button from "@mui/material/Button";
import { ProductCardComp } from "../ProductsCard";
import toast from "react-hot-toast";
import DrawerComp from "../Drawer";
import { Helmet } from "react-helmet-async";
import "../../index.scss";

let products = [
  {
    id: 1,
    title: "Slice Combo",
    description: "Original Slice Pizza + Sideline Half + Regular Drink",
    image: pizza1,
    category: "pizza",
    quantity: 1,
    price: 234,
  },
  {
    id: 2,
    title: "Slice Combo",
    description: "15 Original Pizza + Chicken Wings + 1.5 Ltr Drink",
    image: pizza2,
    category: "pizza",
    quantity: 1,
    price: 564,
  },
  {
    id: 3,
    title: "Big Hunt",
    description: "20 Original Full Pizza + 2 Sideline Full + Mini Lava Cakes",
    image: pizza3,
    category: "pizza",
    quantity: 1,
    price: 999,
  },
  {
    id: 4,
    title: "Double Pepperoni",
    description:
      "A FootLong Pizza with a layer of extra Pepperoni and cheese. ",
    image: pizza4,
    category: "pizza",
    quantity: 1,
    price: 124,
  },
  {
    id: 5,
    title: "Water (500ml)",
    description: "Nestle Water",
    image: bottle1,
    category: "drinks",
    quantity: 1,
    price: 100,
  },
  {
    id: 6,
    title: "Water (Large)",
    description: "Aquafina",
    image: bottle2,
    category: "drinks",
    quantity: 1,
    price: 250,
  },
  {
    id: 7,
    title: "1ltr",
    description: "Mix brands",
    image: bottle3,
    category: "drinks",
    quantity: 1,
    price: 200,
  },
  {
    id: 8,
    title: "1.5L",
    description: "Totally pure",
    image: bottle4,
    category: "drinks",
    quantity: 1,
    price: 150,
  },
  {
    id: 9,
    title: "Cheesy Breadstick",
    description: "Yummy bread",
    image: bread1,
    category: "bread",
    quantity: 1,
    price: 499,
  },
  {
    id: 10,
    title: "Cheesy Bread (Half)",
    description: "Tasty Soos",
    image: bread2,
    category: "bread",
    quantity: 1,
    price: 699,
  },
  {
    id: 11,
    title: "Cheesy Bread",
    description: "Full Crunch",
    image: bread3,
    category: "bread",
    quantity: 1,
    price: 489,
  },
  {
    id: 12,
    title: "Fried Chips",
    description: "A Delightful Mix Of Potato",
    image: bread4,
    category: "bread",
    quantity: 1,
    price: 458,
  },
];

function VisitStoreComp() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartLength, setCartlength] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [drawerState, setDrawerState] = useState(false);

  useEffect(() => {
    setCartlength(cartItems.length);
  }, [cartItems]);

  const addToCart = (product) => {
    let productExists = cartItems.find(
      (storageProducts) => storageProducts.id === product.id
    );

    if (productExists) {
      toast.error("Product is already in cart.");
      return;
    }

    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    toast.success("Product successfully added to your cart.");
    setCartlength(cartItems.length);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  return (
    <div>
      <Helmet>
        <title>Our Store</title>
        <meta name="visit our store" content="Explore our decent meals." />
        <meta
          name="add to cart, delete and checkout"
          content="Plese explore our decent meals."
        />
      </Helmet>
      <div className="navbarComp">
        <NavbarComp />
      </div>
      <div className="drawer">
        <DrawerComp
          toggleDrawer={toggleDrawer}
          state={{ right: drawerState }}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>
      <div className="cartSection m-[10px]">
        <div className="bgCart bg-tertiary rounded-lg flex justify-around items-center p-[10px]">
          <div className="logo">
            <h2 className="font-bold text-xl">Own Flavors</h2>
          </div>
          <div
            className="cartIcon relative cursor-pointer "
            onClick={toggleDrawer(true)}
          >
            <CiShoppingCart color="black" className="w-10 h-10" />
            <div className="cartLengthDiv w-6 h-6 text-white bg-secondary rounded-full absolute top-0 left-4 text-center pt-1">
              {cartLength}
            </div>
          </div>
        </div>
      </div>
      <div className="filterBtns flex justify-center gap-4 p-[10px]">
        <div>
          <Button
            onClick={() => setSelectedCategory("all")}
            variant="outlined"
            className="categoriesBtn"
          >
            All
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("pizza")}
            variant="outlined"
            className="categoriesBtn"
          >
            Pizza
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("drinks")}
            variant="outlined"
            className="categoriesBtn"
          >
            Drinks
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("bread")}
            variant="outlined"
            className="categoriesBtn"
          >
            Bread Items
          </Button>
        </div>
      </div>
      <div className="mainStore">
        <div className="productsContainer m-[20px]">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              let { image, title, description, id, price } = product;
              return (
                <ProductCardComp
                  key={id}
                  image={image}
                  price={price}
                  title={title}
                  description={description}
                  product={product}
                  addToCart={() => addToCart(product, id)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="footerComp">
        <FooterComp />
      </div>
    </div>
  );
}

export default VisitStoreComp;
