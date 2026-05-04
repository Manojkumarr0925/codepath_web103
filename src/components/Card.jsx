import { Link } from 'react-router-dom'

export default function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator

  return (
    <div className="creator-card">
      {imageURL ? (
        <img
          src={imageURL}
          alt={name}
          className="creator-card-image"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
      ) : null}
      <div
        className="creator-card-image-placeholder"
        style={{ display: imageURL ? 'none' : 'flex' }}
      >
        🎬
      </div>

      <div className="creator-card-body">
        <div className="creator-card-name">{name}</div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="creator-card-url"
          onClick={(e) => e.stopPropagation()}
        >
          {url}
        </a>
        <p className="creator-card-desc">{description}</p>
      </div>

      <div className="creator-card-footer">
        <Link to={`/creator/${id}`} className="btn btn-secondary">
          View
        </Link>
        <Link to={`/creator/${id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  )
}
