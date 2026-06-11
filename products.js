const products = [
    {
        id: "ac-mit-15-5s",
        name: "Mitsubishi Electric 1.5 Ton 5 Star Inverter Split AC",
        category: "ac",
        subCategory: "Split AC",
        brand: "MITSUBISHI",
        capacity: "1.5 Ton",
        energyRating: "5 Star",
        price: 64500,
        mrp: 72000,
        rating: 4.9,
        reviews: 142,
        image: "https://content.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.210530165642.b9y1/catalogue/mitsubishi-airconditioners-exclusive-showroom-kalkaji-delhi-refrigerator-dealers-panasonic-40706do0ri-250.jpg",
        features: ["Dual Barrier Coating", "Silent Operation (19dB)", "Fast Cooling Mode", "Anti-Mold Filter"],
        specs: {
            "Cooling Capacity": "5150 W",
            "Power Consumption": "1280 W",
            "Compressor Type": "Inverter Rotary",
            "Warranty": "1 Year on Product, 10 Years on Compressor"
        }
    },
    {
        id: "ac-elx-15-5s",
        name: "Electrolux Premium 1.5 Ton 5 Star Inverter Split AC",
        category: "ac",
        subCategory: "Split AC",
        brand: "ELECTROLUX",
        capacity: "1.5 Ton",
        energyRating: "5 Star",
        price: 52900,
        mrp: 61990,
        rating: 4.8,
        reviews: 98,
        image: "https://content.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.210530165642.b9y1/catalogue/airnet-kalkaji-kalkaji-delhi-ac-dealers-1jg1lm50vj-250.jpg",
        features: ["Active Purify Filter", "I-Feel Sensor technology", "Eco-Friendly R32 Gas", "Golden Fin Shield"],
        specs: {
            "Cooling Capacity": "5050 W",
            "Power Consumption": "1350 W",
            "Compressor Type": "Variable Speed Inverter",
            "Warranty": "1 Year on Product, 5 Years on PCB, 10 Years on Compressor"
        }
    },
    {
        id: "ac-pan-15-5s",
        name: "Panasonic Smart 1.5 Ton 5 Star Inverter Split AC",
        category: "ac",
        subCategory: "Split AC",
        brand: "PANASONIC",
        capacity: "1.5 Ton",
        energyRating: "5 Star",
        price: 46990,
        mrp: 55400,
        rating: 4.7,
        reviews: 215,
        image: "https://content.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.210530165642.b9y1/catalogue/airnet-kalkaji-kalkaji-delhi-ac-dealers-d07ubt762y-250.jpg",
        features: ["Miraie App WiFi Control", "nanoe-G Air Purification", "Jetstream Long Airflow", "PM 2.5 Filter"],
        specs: {
            "Cooling Capacity": "5100 W",
            "Power Consumption": "1290 W",
            "Compressor Type": "Twin Cool Inverter",
            "Warranty": "1 Year Comprehensive, 5 Years on PCB, 10 Years on Compressor"
        }
    },
    {
        id: "ac-lly-15-3w",
        name: "Lloyd 1.5 Ton 3 Star Window AC",
        category: "ac",
        subCategory: "Window AC",
        brand: "LLOYD",
        capacity: "1.5 Ton",
        energyRating: "3 Star",
        price: 29990,
        mrp: 37990,
        rating: 4.5,
        reviews: 84,
        image: "https://content.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.210530165642.b9y1/catalogue/airnet-kalkaji-kalkaji-delhi-ac-dealers-n3hazuklvp-250.jpg",
        features: ["Clean Air Filter", "Auto Restart", "Self-Diagnosis", "100% Inner Grooved Copper Tubes"],
        specs: {
            "Cooling Capacity": "4850 W",
            "Power Consumption": "1540 W",
            "Compressor Type": "Fixed Speed Rotary",
            "Warranty": "1 Year on Product, 5 Years on Compressor"
        }
    },
    {
        id: "ac-gen-20-5c",
        name: "O'General Premium 2.0 Ton 5 Star Cassette AC",
        category: "ac",
        subCategory: "Cassette AC",
        brand: "O'GENERAL",
        capacity: "2.0 Ton",
        energyRating: "5 Star",
        price: 98500,
        mrp: 112000,
        rating: 4.9,
        reviews: 43,
        image: "https://content.jdmagicbox.com/quickquotes/images_main/asga18fttc-ftta-white-80924043-512mbyfd.jpg",
        features: ["360 Degree Airflow", "Hyper Tropical Compressor", "Ultra Silent Fan", "Drastic Power Save Mode"],
        specs: {
            "Cooling Capacity": "7100 W",
            "Power Consumption": "2100 W",
            "Compressor Type": "Tropical Rotary Inverter",
            "Warranty": "1 Year Comprehensive, 5 Years on Compressor"
        }
    },
    {
        id: "lnd-elx-80-fl",
        name: "Electrolux UltimateCare 8kg Front Load Washing Machine",
        category: "laundry",
        subCategory: "Front Load",
        brand: "ELECTROLUX",
        capacity: "8 Kg",
        energyRating: "5 Star",
        price: 42900,
        mrp: 51900,
        rating: 4.8,
        reviews: 67,
        image: "https://content3.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.210530165642.b9y1/catalogue/airnet-kalkaji-kalkaji-delhi-refrigerator-dealers-panasonic-b4r2yaadl3.jpg",
        features: ["SensorWash technology", "UltraMix pre-mix system", "VapourCare Steam cycle", "EcoInverter Motor"],
        specs: {
            "Spin Speed": "1200 RPM",
            "Wash Programs": "15+ Custom cycles",
            "Control Type": "Touch LED Panel",
            "Warranty": "2 Years Comprehensive, 10 Years on Motor"
        }
    },
    {
        id: "lnd-pan-80-tl",
        name: "Panasonic Premium 8.0kg Smart Top Load Washing Machine",
        category: "laundry",
        subCategory: "Top Load",
        brand: "PANASONIC",
        capacity: "8.0 Kg",
        energyRating: "5 Star",
        price: 24990,
        mrp: 29990,
        rating: 4.6,
        reviews: 112,
        image: "https://content3.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.210530165642.b9y1/catalogue/airnet-kalkaji-kalkaji-delhi-refrigerator-dealers-panasonic-8h27y4ve0j.jpg",
        features: ["Built-In Heater", "StainGenius multi-stain removal", "Active Foam System", "Miraie App IoT Enable"],
        specs: {
            "Spin Speed": "702 RPM",
            "Tub Material": "Stainless Steel SaniTub",
            "Control Type": "Smart Touch LED",
            "Warranty": "2 Years comprehensive, 10 Years on Motor"
        }
    },
    {
        id: "lnd-elx-107-wd",
        name: "Electrolux UltimateCare 10kg/7kg Inverter Washer Dryer",
        category: "laundry",
        subCategory: "Washer Dryer",
        brand: "ELECTROLUX",
        capacity: "10/7 Kg",
        energyRating: "5 Star",
        price: 68900,
        mrp: 79900,
        rating: 4.9,
        reviews: 35,
        image: "https://content3.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.210530165642.b9y1/catalogue/airnet-kalkaji-kalkaji-delhi-refrigerator-dealers-panasonic-w0kitkrxfv.jpg",
        features: ["Wash & Dry 60 Cycle", "SensorWash & UltraMix", "Vapour Refresh cycle", "Quiet EcoInverter (49dB)"],
        specs: {
            "Spin Speed": "1400 RPM",
            "Washing Capacity": "10 Kg",
            "Drying Capacity": "7 Kg",
            "Warranty": "2 Years Comprehensive, 10 Years on Motor"
        }
    }
];
