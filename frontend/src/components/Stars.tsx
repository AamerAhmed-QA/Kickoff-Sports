export default function Stars({ rating, count }: { rating: number | null; count?: number }) {
  if (rating == null) return <span className="text-sm text-muted">No reviews yet</span>;
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1 text-sm" aria-label={`Rated ${rating} out of 5`}>
      <span aria-hidden="true" className="text-[#c99a12] tracking-tight">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>
      <span className="text-muted">{rating}{count != null && ` (${count})`}</span>
    </span>
  );
}
