import type { CollectionEntry } from 'astro:content';
import { useState } from 'react';

export default function PhotoCarousel({ photos }: { photos: CollectionEntry<"photos">[] }) {
    const [index, setIndex] = useState(0);
    if (photos.length === 0) return null;

    const next = () => setIndex(i => (i + 1) % photos.length);
    const prev = () => setIndex(i => (i - 1 + photos.length) % photos.length);

    return (
        <div className="carousel">
            <button onClick={prev} aria-label="Previous">‹</button>
            <a href={`/photos/${photos[index].id}`}><img src={photos[index].data.image.src} alt={photos[index].data.title} width={300} /></a>
            <button onClick={next} aria-label="Next">›</button>
        </div>
    );
}