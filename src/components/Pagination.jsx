export default function Pagination({ page, totalPages, next, prev }) {
  return (
    <div id="pagination">
      <button id="prev-btn" disabled={page === 1} onClick={prev}>← Prev</button>
      <span id="page-number">{page} / {totalPages || '?'}</span>
      <button id="next-btn" disabled={page === totalPages} onClick={next}>Next →</button>
    </div>
  );
}
