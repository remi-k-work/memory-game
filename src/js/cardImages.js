// helpers
import { generateRandomPageNumber, getPixabayRateLimitStatus, getPixabayTotalHits, generatePixabayUrl, waait, fetchImageAsBlob } from "./helpers";

// other libraries
import localforage from "localforage";

// Initial fallback card images set for "Easy (4x3)" difficulty
const cardImages4x3 = [
  { src: "/img/animals/animal-47047_640.png", matched: false },
  { src: "/img/animals/baby-elephant-3526681_640.png", matched: false },
  { src: "/img/animals/bee-24633_640.png", matched: false },
  { src: "/img/animals/bird-34663_640.png", matched: false },
  { src: "/img/animals/bird-295026_640.png", matched: false },
  { src: "/img/animals/butterfly-2028591_640.png", matched: false },
];

// Initial fallback card images set for "Medium (6x5)" difficulty
const cardImages6x5 = [
  { src: "/img/animals/animal-47047_640.png", matched: false },
  { src: "/img/animals/baby-elephant-3526681_640.png", matched: false },
  { src: "/img/animals/bee-24633_640.png", matched: false },
  { src: "/img/animals/bird-34663_640.png", matched: false },
  { src: "/img/animals/bird-295026_640.png", matched: false },
  { src: "/img/animals/butterfly-2028591_640.png", matched: false },
  { src: "/img/animals/cat-46676_640.png", matched: false },
  { src: "/img/animals/chicken-159496_640.png", matched: false },
  { src: "/img/animals/crocodile-1458819_640.png", matched: false },
  { src: "/img/animals/dog-48490_640.png", matched: false },
  { src: "/img/animals/dog-3542195_640.png", matched: false },
  { src: "/img/animals/dolphin-41436_640.png", matched: false },
  { src: "/img/animals/dragon-310237_640.png", matched: false },
  { src: "/img/animals/fish-33712_640.png", matched: false },
  { src: "/img/animals/frog-30524_640.png", matched: false },
];

// Initial fallback card images set for "Hard (8x7)" difficulty
const cardImages8x7 = [
  { src: "/img/animals/animal-47047_640.png", matched: false },
  { src: "/img/animals/baby-elephant-3526681_640.png", matched: false },
  { src: "/img/animals/bee-24633_640.png", matched: false },
  { src: "/img/animals/bird-34663_640.png", matched: false },
  { src: "/img/animals/bird-295026_640.png", matched: false },
  { src: "/img/animals/butterfly-2028591_640.png", matched: false },
  { src: "/img/animals/cat-46676_640.png", matched: false },
  { src: "/img/animals/chicken-159496_640.png", matched: false },
  { src: "/img/animals/crocodile-1458819_640.png", matched: false },
  { src: "/img/animals/dog-48490_640.png", matched: false },
  { src: "/img/animals/dog-3542195_640.png", matched: false },
  { src: "/img/animals/dolphin-41436_640.png", matched: false },
  { src: "/img/animals/dragon-310237_640.png", matched: false },
  { src: "/img/animals/fish-33712_640.png", matched: false },
  { src: "/img/animals/frog-30524_640.png", matched: false },
  { src: "/img/animals/giraffe-48393_640.png", matched: false },
  { src: "/img/animals/hamster_5389261.png", matched: false },
  { src: "/img/animals/horse-1297225_640.png", matched: false },
  { src: "/img/animals/koala_3069172.png", matched: false },
  { src: "/img/animals/ladybug-156624_640.png", matched: false },
  { src: "/img/animals/lamb-1388937_640.png", matched: false },
  { src: "/img/animals/parrot-1417286_640.png", matched: false },
  { src: "/img/animals/penguin-158551_640.png", matched: false },
  { src: "/img/animals/rat-152162_640.png", matched: false },
  { src: "/img/animals/tiger-160601_640.png", matched: false },
  { src: "/img/animals/tiger-161802_640.png", matched: false },
  { src: "/img/animals/wolf-30695_640.png", matched: false },
  { src: "/img/animals/zebra-152604_640.png", matched: false },
];

export async function getCardImages(difficulty) {
  await waait();

  let set4x3 = (await localforage.getItem("cardImages4x3")) ?? cardImages4x3;
  let set6x5 = (await localforage.getItem("cardImages6x5")) ?? cardImages6x5;
  let set8x7 = (await localforage.getItem("cardImages8x7")) ?? cardImages8x7;

  switch (difficulty) {
    case 1:
      return set4x3;
    case 2:
      return set6x5;
    case 3:
      return set8x7;
  }
}

export async function testPixabay() {
  const pixabayUrl = generatePixabayUrl();

  // Get total hits and calculate the random page and fetch again
  const totalHits = await getPixabayTotalHits(pixabayUrl);

  console.log(totalHits);

  const randomPageNumber = generateRandomPageNumber(totalHits, 28);
  console.log(randomPageNumber);

  pixabayUrl.searchParams.append("page", randomPageNumber);

  const response = await fetch(pixabayUrl);

  if (!response.ok) {
    throw new Error("Network response was not OK.");
  }

  const hits = await response.json();

  console.log(getPixabayRateLimitStatus(response));

  for (const hit of hits.hits) {
    console.log(hit.webformatURL);
  }
}

export async function fetchAndSave() {
  // Unfortunately, we must use Pixabay's API twice, the first fetch to obtain the overall number of hits
  const pixabayUrl = generatePixabayUrl();
  const totalHits = await getPixabayTotalHits(pixabayUrl);

  // We need to be able to retrieve at least 28 images
  if (totalHits < 28) {
    throw new Error("We need to be able to retrieve at least 28 images.");
  }

  // We can generate a random page number now that we know the overall number of hits
  const randomPageNumber = generateRandomPageNumber(totalHits, 28);

  // Now we send that page number to the API in order to retrieve a different group of images each time
  pixabayUrl.searchParams.append("page", randomPageNumber);

  // The second fetch is to get the list of images and their URLs; we need all 28 of them
  const response = await fetch(pixabayUrl);

  if (!response.ok) {
    throw new Error("Network response was not OK.");
  }

  const hits = await response.json();
  const set8x7 = [];
  for (const hit of hits.hits) {
    // Fetch the image itself and convert the response to a blob
    const imageUrl = hit.webformatURL;
    const imageBlob = await fetchImageAsBlob(imageUrl);

    // We save that card image blob in "localforage" to avoid permanent image hotlinking
    set8x7.push({ src: imageUrl, matched: false, image: imageBlob });
  }
  localforage.setItem("cardImages8x7", set8x7);
  // Slicing up the largest set yields smaller sets
  localforage.setItem("cardImages6x5", set8x7.slice(0, 15));
  localforage.setItem("cardImages4x3", set8x7.slice(0, 6));
}

export async function fetchAndSaveWithDummyJSON() {
  // Get the list of images and their URLs first; we need all 28 of them
  const response = await fetch(`https://dummyjson.com/products?limit=28&skip=${Math.floor(Math.random() * 73)}`);

  if (!response.ok) {
    throw new Error("Network response was not OK.");
  }

  const products = await response.json();
  const set8x7 = [];
  for (const product of products.products) {
    // Fetch the image itself and convert the response to a blob
    const imageUrl = product.thumbnail;
    const imageBlob = await fetchImageAsBlob(imageUrl);
    set8x7.push({ src: imageUrl, matched: false, image: imageBlob });
  }
  localforage.setItem("cardImages8x7", set8x7);
  // Slicing up the largest set yields smaller sets
  localforage.setItem("cardImages6x5", set8x7.slice(0, 15));
  localforage.setItem("cardImages4x3", set8x7.slice(0, 6));
}
