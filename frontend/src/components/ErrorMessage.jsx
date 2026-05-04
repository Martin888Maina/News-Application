function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      style={{
        background: '#fee',
        color: '#c00',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
    >
      ⚠️ {message}
    </div>
  );
}

export default ErrorMessage;
