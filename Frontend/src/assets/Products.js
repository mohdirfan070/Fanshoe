 const products = [  
    {   
      "title": "Nike Air Max 270",
      "id": "1",
      "images": [
        "https://example.com/images/nike_air_max_270_1.jpg",
        "https://example.com/images/nike_air_max_270_2.jpg"
      ],
      "category": ["Sneakers", "Running"],
      "description": "Breathable and comfortable running shoes.",
      "price": 370,
      "discount": 10,
      "stock": 50,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Adidas  Boost 350",
      "id": "2",
      "images": [
        "https://example.com/images/adidas_yeezy_boost_350_1.jpg",
        "https://example.com/images/adidas_yeezy_boost_350_2.jpg"
      ],
      "category": ["Sneakers", "Casual"],
      "description": "Stylish and trendy sneakers for everyday wear.",
      "price": 400,
      "discount": 15,
      "stock": 30,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Balenciaga Triple S",
      "id": "3",
      "images": [
        "https://example.com/images/balenciaga_triple_s_1.jpg",
        "https://example.com/images/balenciaga_triple_s_2.jpg"
      ],
      "category": ["Sneakers", "Luxury"],
      "description": "High-end sneakers with a unique design.",
      "price": 950,
      "discount": 20,
      "stock": 20,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Nike Air Force 1",
      "id": "4",
      "images": [
        "https://example.com/images/nike_air_force_1_1.jpg",
        "https://example.com/images/nike_air_force_1_2.jpg"
      ],
      "category": ["Sneakers", "Casual"],
      "description": "Classic sneakers with a timeless design.",
      "price": 360,
      "discount": 5,
      "stock": 100,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Gucci Ace",
      "id": "5",
      "images": [
        "https://gucci_ace_1.jpg",
        "https://example.com/images/gucci_ace_2.jpg"
      ],
      "category": ["Sneakers", "Luxury"],
      "description": "Luxury sneakers with a sleek design.",
      "price": 700,
      "discount": 10,
      "stock": 40,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Jordan 1 Retro High",
      "id": "6",
      "images": [
        "https://example.com/images/jordan_1_retro_high_1.jpg",
        "https://example.com/images/jordan_1_retro_high_2.jpg"
      ],
      "category": ["Sneakers", "Basketball","Sports"],
      "description": "Iconic basketball sneakers with a retro look.",
      "price": 450,
      "discount": 15,
      "stock": 60,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Nike Dunk Low",
      "id": "7",
      "images": [
        "https://example.com/images/nike_dunk_low_1.jpg",
        "https://example.com/images/nike_dunk_low_2.jpg"
      ],
      "category": ["Sneakers", "Casual"],
      "description": "Versatile sneakers for everyday wear.",
      "price": 380,
      "discount": 10,
      "stock": 80,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Adidas NMD R1",
      "id": "8",
      "images": [
        "https://example.com/images/adidas_nmd_r1_1.jpg",
        "https://example.com/images/adidas_nmd_r1_2.jpg"
      ],
      "category": ["Sneakers", "Running","Sports"],
      "description": "Comfortable and stylish running shoes.",
      "price": 370,
      "discount": 5,
      "stock": 70,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Puma RS-X",
      "id": "9",
      "images": [
        "https://example.com/images/puma_rs_x_1.jpg",
        "https://example.com/images/puma_rs_x_2.jpg"
      ],
      "category": ["Sneakers", "Casual"],
      "description": "Bold and colorful sneakers for a unique look.",
      "price": 360,
      "discount": 10,
      "stock": 90,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Reebok Club C 85",
      "id": "10",
      "images": [
        "https://example.com/images/reebok_club_c_85_1.jpg",
        "https://example.com/images/reebok_club_c_85_2.jpg"
      ],
      "category": ["Sneakers", "Casual"],
      "description": "Classic sneakers with a minimalist design.",
      "price": 350,
      "discount": 5,
      "stock": 100,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "New Balance 990v5",
      "id": "11",
      "images": [
        "https://example.com/images/new_balance_990v5_1.jpg",
        "https://example.com/images/new_balance_990v5_2.jpg"
      ],
      "category": ["Sneakers", "Running","Sports"],
      "description": "Premium running shoes with excellent support.",
      "price": 400,
      "discount": 10,
      "stock": 50,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Asics Gel-Lyte III",
      "id": "12",
      "images": [
        "https://example.com/images/asics_gel_lyte_iii_1.jpg",
        "https://example.com/images/asics_gel_lyte_iii_2.jpg"
      ],
      "category": ["Sneakers", "Running","Sports"],
      "description": "Comfortable running shoes with a unique design.",
      "price": 370,
      "discount": 10,
      "stock": 60,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Vans Sk8-Hi",
      "id": "13",
      "images": [
        "https://example.com/images/vans_sk8_hi_1.jpg",
        "https://example.com/images/vans_sk8_hi_2.jpg"
      ],
      "category": ["Sneakers", "Skate"],
      "description": "High-top skate shoes with a classic design.",
      "price": 360,
      "discount": 5,
      "stock": 80,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Converse Chuck 70",
      "id": "14",
      "images": [
        "https://example.com/images/converse_chuck_70_1.jpg",
        "https://example.com/images/converse_chuck_70_2.jpg"
      ],
      "category": ["Sneakers", "Casual"],
      "description": "Retro-inspired sneakers with a modern twist.",
      "price": 370,
      "discount": 10,
      "stock": 70,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    },
    {
      "title": "Under Armour HOVR Phantom",
      "id": "15",
      "images": [
        "https://example.com/images/under_armour_hovr_phantom_1.jpg",
        "https://example.com/images/under_armour_hovr_phantom_2.jpg"
      ],
      "category": ["Sneakers", "Running","Sports"],
      "description": "High-performance running shoes with advanced cushioning.",
      "price": 380,
      "discount": 10,
      "stock": 50,
      "active": true,
      "unit": "pair",
      "ownerId": "mohammedirfanrj@gmail.com"
    }
  ]

  export default products;