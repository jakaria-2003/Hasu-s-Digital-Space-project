import pool from "../config/db.js";

async function resetTours() {
  try {
    await pool.query("DELETE FROM tours");
    const tours = [
      {
        place: "Kuakata Sea Beach",
        location: "Patuakhali, Barishal Division, Bangladesh",
        tour_date: "February 2026",
        image: "/kuakata.png",
        description: "Standing on traditional wooden fishing boats on the expansive golden sands of Kuakata, famously celebrated as Sagar Kannya where both sunrise and sunset can be viewed over the Bay of Bengal.",
        highlights: "Sagar Kannya Beach, Sunset & Sunrise View, Traditional Fishing Boats, Coastal Exploration",
      },
      {
        place: "Mohera Zamindar Bari, Tangail",
        location: "Mirzapur, Tangail, Dhaka Division, Bangladesh",
        tour_date: "March 2026",
        image: "/tangail.jpg",
        description: "Exploring the majestic neoclassical Greco-Roman palace grounds, historic royal lodges (Chowdhury Lodge, Ananda Lodge, Maharaj Lodge), manicured gardens, and colonial-era heritage of Tangail.",
        highlights: "Chowdhury & Ananda Lodge, Greco-Roman Architecture, Historic Zamindar Heritage, Botanical Gardens",
      },
      {
        place: "Panam Nagar & Sonargaon",
        location: "Sonargaon, Narayanganj, Dhaka Division, Bangladesh",
        tour_date: "January 2026",
        image: "/sonargaon.png",
        description: "Stepping back into Bengal medieval history in the ancient capital of Sonargaon, walking through the historic street architecture of Panam Nagar and the grand courtyard of Boro Sardar Bari.",
        highlights: "Panam Nagar Historic City, Boro Sardar Bari Courtyard, Folk Art & Craft Museum, Ancient Bengal Heritage",
      },
      {
        place: "Cox's Bazar Sea Beach",
        location: "Cox's Bazar, Chittagong Division, Bangladesh",
        tour_date: "January 2026",
        image: "/abu.jpeg",
        description: "Riding ATV beach-buggies along the world longest natural sea beach, enjoying golden ocean sunsets and beach adventures.",
        highlights: "World Longest Beach, ATV Beach Riding, Golden Sunset, Marine Drive",
      },
      {
        place: "Sajek Valley",
        location: "Rangamati, Chittagong Hill Tracts, Bangladesh",
        tour_date: "March 2025",
        image: "/hhp.jpg",
        description: "A breathtaking journey through the queen of hills, mist-covered peaks, and floating cloudscapes of Sajek Valley.",
        highlights: "Konglak Peak, Sea of Clouds, Helipad Viewpoint, Hill Tracts Roads",
      },
      {
        place: "Sylhet Tea Gardens & Natural Lakes",
        location: "Sylhet Division, Bangladesh",
        tour_date: "May 2026",
        image: "/sylhet.jpg",
        description: "Exploring emerald tea plantations, crystal-clear freshwater riverbeds, and peaceful rural nature in Sylhet.",
        highlights: "Emerald Tea Estates, Freshwater Streams, Serene Green Hills, Nature Exploration",
      },
    ];

    for (const t of tours) {
      await pool.query(
        "INSERT INTO tours (place, location, tour_date, image, description, highlights) VALUES (?, ?, ?, ?, ?, ?)",
        [t.place, t.location, t.tour_date, t.image, t.description, t.highlights]
      );
    }

    console.log(" Tours reset successfully with 6 clean entries!");
    process.exit(0);
  } catch (err) {
    console.error("Error resetting tours:", err.message);
    process.exit(1);
  }
}

resetTours();
