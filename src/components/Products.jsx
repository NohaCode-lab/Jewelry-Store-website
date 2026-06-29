import { useState } from 'react'
import ProductCard from './ProductCard'

import ring1 from "../assets/rings/ring-1.jpg";
import ring2 from "../assets/rings/ring-2.jpg";
import ring3 from "../assets/rings/ring-3.jpg";
import ring4 from "../assets/rings/ring-4.jpg";

// Crown
import crown1 from "../assets/crown/crown-1.jpg";
import crown2 from "../assets/crown/crown-2.jpg";
import crown3 from "../assets/crown/crown-3.jpg";
import crown4 from "../assets/crown/crown-4.jpg";

// Earrings
import earrings1 from "../assets/earrings/earrings-1.jpg";
import earrings2 from "../assets/earrings/earrings-2.jpg";
import earrings3 from "../assets/earrings/earrings-3.jpg";

// Bracelet
import bracelet1 from "../assets/bracelet/bracelet-1.jpg";
import bracelet2 from "../assets/bracelet/bracelet-2.jpg";
import bracelet3 from "../assets/bracelet/bracelet-3.jpg";
import bracelet4 from "../assets/bracelet/bracelet-4.jpg";

// Collection

import img2 from "../assets/collection/img-2.jpg";
import img3 from "../assets/collection/img-3.jpg";
import img4 from "../assets/collection/img-4.jpg";

// Necklace
import necklace1 from "../assets/necklace/necklace-1.jpg";
import necklace2 from "../assets/necklace/necklace-2.jpg";
import necklace3 from "../assets/necklace/necklace-3.jpg";
import necklace4 from "../assets/necklace/necklace-4.jpg";



const productsData = [
  {
    id: 'rings',
    title: 'Wedding Rings',
    mainImage: ring1,  // استخدم المتغير المستورد
    images: [ring2, ring3, ring4], 
    
  },
  {
    id: 'crowns',
    title: 'Crowns',
    mainImage: crown1,
    images: [crown2, crown3, crown4],
  },
  {
    id: 'earrings',
    title: 'Earrings',
    mainImage: earrings1,
    images: [earrings2, earrings3],
  },
  {
    id: 'bracelet',
    title: 'Bracelets',
    mainImage: bracelet1,
    images: [bracelet2, bracelet3, bracelet4],
   
  },
  {
    id: 'collections',
    title: 'Variety Collection',
    mainImage: img2,
    images: [img3, img4],
  },

{
    id: 'necklace',
    title: 'Necklaces',
    mainImage: necklace1,
    images: [necklace2, necklace3, necklace4],
  },

  
]

const Products = () => {
  return (
    <section id="products" className="bg-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title text-secondary">Our Collections</h2>
          <div className="divider" />
          <p className="text-lg text-dark/80 max-w-2xl mx-auto">
            Mangata & Gallo's selection of jewelry is known for its high-quality and classic look.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products