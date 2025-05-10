export default function FilterSelect({ category, setCategory, resetPage }) {
  return (
    <div id="filter">
      <select
        value={category}
        id="filter-category"
        onChange={(e) => {
          setCategory(e.target.value);
          resetPage();
        }}>
        <option value="popular">Popular</option>
        <option value="now_playing">Now Playing</option>
        <option value="top_rated">Top Rated</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );
}
