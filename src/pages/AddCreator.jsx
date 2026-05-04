import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.url.trim() || !form.description.trim()) {
      setError('Name, URL, and description are required.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const payload = {
        name: form.name.trim(),
        url: form.url.trim(),
        description: form.description.trim(),
        imageURL: form.imageURL.trim() || null,
      }

      const { error } = await supabase.from('creators').insert([payload])
      if (error) throw error

      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-page">
      <Link to="/" className="back-link">← Back to all creators</Link>

      <h1>ADD A <span>CREATOR</span></h1>
      <p>Share a creator you think is worth following.</p>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. MrBeast"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel / Page URL *</label>
          <input
            id="url"
            name="url"
            type="url"
            placeholder="https://youtube.com/@MrBeast"
            value={form.url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            placeholder="What makes this creator worth following?"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL (optional)</label>
          <input
            id="imageURL"
            name="imageURL"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={form.imageURL}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? 'Adding...' : '+ Add Creator'}
          </button>
          <Link to="/" className="btn btn-secondary btn-large">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
