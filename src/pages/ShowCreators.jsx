import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCreators()
  }, [])

  async function fetchCreators() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error
      setCreators(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">LOADING...</div>

  return (
    <div>
      <div className="page-header">
        <h1>THE <span>VERSE</span></h1>
        <p>Your curated collection of creators worth following.</p>
      </div>

      {error && (
        <div className="alert alert-error">
          ⚠️ {error} — Make sure your Supabase credentials are set in <code>src/client.js</code>
        </div>
      )}

      {!error && creators.length === 0 ? (
        <div className="empty-state">
          <h2>NO CREATORS YET</h2>
          <p>Start building your Creatorverse by adding your favorite creators.</p>
          <Link to="/add" className="btn btn-primary btn-large">
            + Add Your First Creator
          </Link>
        </div>
      ) : (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  )
}
