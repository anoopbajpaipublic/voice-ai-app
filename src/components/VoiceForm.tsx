import { useVoice } from "../context/VoiceContext";

const VoiceForm = () => {
  const { formData, setFormField, submitForm } = useVoice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormField(e.target.name as keyof typeof formData, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(); // This calls the submitForm from context
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>

            <div style={{ marginBottom: '20px' }}>
        <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>

            <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Message</label>
        <input
          type="text"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      
      <button 
        type="submit"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default VoiceForm;