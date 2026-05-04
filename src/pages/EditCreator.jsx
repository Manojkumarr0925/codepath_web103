import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCreator()
  }, [id])

  async function fetchCreator() {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setForm({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || '',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
      setSaving(true)
      setError(null)

      const { error } = await supabase
        .from('creators')
        .update({
          name: form.name.trim(),
          url: form.url.trim(),
          description: form.description.trim(),
          imageURL: form.imageURL.trim() || null,
        })
        .eq('id', id)

      if (error) throw error
      navigate(`/creator/${id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${form.name}"? This cannot be undone.`)) return

    try {
      const { error } = await supabase.from('creators').delete().eq('id', id)
      if (error) throw error
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="loading">LOADING...</div>

  return (
    <div className="form-page">
      <Link to={`/creator/${id}`} className="back-link">← Back to creator</Link>

      <h1>EDIT <span>CREATOR</span></h1>
      <p>Update this creator's information.</p>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
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
            value={form.imageURL}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-large" disabled={saving}>
            {saving ? 'Saving...' : '✓ Save Changes'}
          </button>
          <button type="button" onClick={handleDelete} className="btn btn-danger btn-large">
            🗑️ Delete
          </button>
          <Link to={`/creator/${id}`} className="btn btn-secondary btn-large">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
