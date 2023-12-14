// Pretend it is hitting the network
export async function waait() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

// Add a delay for a certain time in milliseconds
export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Create a random page number based on the overall number of hits and the desired page size
export function generateRandomPageNumber(totalHits, pageSize) {
  const numberOfPages = Math.ceil(totalHits / pageSize);
  const randomPageNumber = Math.floor(Math.random() * numberOfPages);
  return randomPageNumber < 1 ? 1 : randomPageNumber;
}

// Generate a suitable URL for the Pixabay API request
export function generatePixabayUrl(category) {
  const pixabayUrl = new URL("/api/", "https://pixabay.com");

  pixabayUrl.searchParams.append("key", import.meta.env.VITE_PIXABAY_KEY);
  // pixabayUrl.searchParams.append("q", "animals");
  pixabayUrl.searchParams.append("image_type", "photo");
  pixabayUrl.searchParams.append("category", category);
  pixabayUrl.searchParams.append("per_page", 28);

  return pixabayUrl;
}

// Get the number of images accessible through Pixabay's API
export async function getPixabayTotalHits(pixabayUrl) {
  const response = await fetch(pixabayUrl);

  if (!response.ok) {
    throw new Error("Network response was not OK.");
  }

  const hits = await response.json();
  return hits.totalHits;
}

// The response headers tell you everything you need to know about your current rate limit status
export function getPixabayRateLimitStatus(response) {
  const rateLimitHeaders = response.headers;

  const rateLimit = {
    limit: Number(rateLimitHeaders.get("X-RateLimit-Limit")),
    remaining: Number(rateLimitHeaders.get("X-RateLimit-Remaining")),
    reset: Number(rateLimitHeaders.get("X-RateLimit-Reset")),
  };

  return rateLimit;
}

// Get the image from the specified URL and save the result as a blob
export async function fetchImageAsBlob(imageUrl) {
  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error("Network response was not OK.");
  }

  const imageBlob = await response.blob();
  return imageBlob;
}
