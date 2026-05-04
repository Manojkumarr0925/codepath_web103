import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCreator()
  }, [id])

  async function fetchCreator() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setCreator(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${creator.name}"? This cannot be undone.`)) return

    try {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id)

      if (error) throw error
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="loading">LOADING...</div>
  if (error) return <div className="alert alert-error">⚠️ {error}</div>
  if (!creator) return <div className="alert alert-error">Creator not found.</div>

  return (
    <div className="view-creator">
      <Link to="/" className="back-link">← Back to all creators</Link>

      {creator.imageURL ? (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="view-creator-image"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      ) : (
        <div className="view-creator-image-placeholder">🎬</div>
      )}

      <h1>{creator.name}</h1>
      <a
        href={creator.url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-creator-url"
      >
        🔗 {creator.url}
      </a>
      <p className="view-creator-desc">{creator.description}</p>

      <div className="view-creator-actions">
        <Link to={`/creator/${id}/edit`} className="btn btn-primary btn-large">
          ✏️ Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger btn-large">
          🗑️ Delete
        </button>
        <Link to="/" className="btn btn-secondary btn-large">
          ← Back
        </Link>
      </div>
    </div>
  )
}
