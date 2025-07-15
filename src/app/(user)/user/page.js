'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import './style.css'

export default function UserDashboard() {
  const router = useRouter()
  const [blogs, setBlogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [expandedBlogId, setExpandedBlogId] = useState(null)

  useEffect(() => {
    const role = localStorage.getItem('role')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    
    if (role !== 'user' || !isAuthenticated) {
      router.push('/login')
      return
    }
    
    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) {
      try {
        setBlogs(JSON.parse(storedBlogs))
      } catch (error) {
        console.error('Failed to parse blogs data', error)
      }
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  const toggleExpandBlog = (blogId) => {
    setExpandedBlogId(expandedBlogId === blogId ? null : blogId)
  }

  const categories = ['all', ...new Set(blogs.map(blog => blog.category).filter(Boolean))]

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <>
      <header className="user-header">
        <div className="user-header-content">
          <h1>User Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="user-main">
        <div className="user-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d=""/>
            </svg>
          </div>

          <div className="filter-container">
            <label htmlFor="category-filter">Filter by Category:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="blog-list-title">
          {selectedCategory !== 'all' ? `${selectedCategory} Blogs` : 'All Blogs'}
          <span className="blog-count">({filteredBlogs.length})</span>
        </h2>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="no-blogs">
            <svg viewBox="0 0 24 24" className="no-blogs-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p>No blog posts found matching your criteria.</p>
          </div>
        ) : (
          <div className="user-blog-grid">
            {filteredBlogs.map(blog => (
              <div key={blog.id} className={`user-blog-card ${blog.featured ? 'featured' : ''}`}>
                {blog.featured && <div className="featured-badge">Featured</div>}
                <div className="blog-image-container">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="blog-image"
                  />
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    {blog.category && <span className="blog-category">{blog.category}</span>}
                    {blog.date && <span className="blog-date">{formatDate(blog.date)}</span>}
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-description">{blog.description}</p>
                  <div className="blog-footer">
                    {blog.author && <span className="blog-author">By {blog.author}</span>}
                    <button 
                      className="toggle-details-btn"
                      onClick={() => toggleExpandBlog(blog.id)}
                    >
                      {expandedBlogId === blog.id ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  {expandedBlogId === blog.id && (
                    <div className="blog-details-dropdown">
                      <div className="detail-row">
                        <span className="detail-label">Title:</span>
                        <span className="detail-value">{blog.title}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Image URL:</span>
                        <span className="detail-value">{blog.image}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Description:</span>
                        <span className="detail-value">{blog.description}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{blog.category}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Author:</span>
                        <span className="detail-value">{blog.author}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{formatDate(blog.date)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Content:</span>
                        <div className="detail-value content-value">{blog.content}</div>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Featured:</span>
                        <span className="detail-value">{blog.featured ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}