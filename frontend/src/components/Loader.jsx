function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ textAlign: 'center', padding: '2rem', color: '#555' }}
    >
      Loading articles…
    </div>
  );
}

export default Loader;
