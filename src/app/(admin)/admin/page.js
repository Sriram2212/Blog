'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import './style.css'

export default function AdminDashboard() {
  const router = useRouter()
  const [blogs, setBlogs] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    category: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    featured: false
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const role = localStorage.getItem('role')
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (role !== 'admin' || !isAuthenticated) {
      router.push('/login')
      return
    }

    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) {
      try {
        setBlogs(JSON.parse(storedBlogs))
      } catch (error) {
        console.error('Failed to parse blogs data', error)
        localStorage.removeItem('blogs')
      }
    }
  }, [router])

  useEffect(() => {
    try {
      localStorage.setItem('blogs', JSON.stringify(blogs))
    } catch (error) {
      console.error('Failed to save blogs data', error)
    }
  }, [blogs])

  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddOrUpdate = () => {
    if (!formData.title || !formData.image || !formData.description) {
      alert('Please fill in required fields (Title, Image, Description)')
      return
    }

    let updatedBlogs
    if (editingId !== null) {
      updatedBlogs = blogs.map(blog =>
        blog.id === editingId ? { ...blog, ...formData } : blog
      )
      setEditingId(null)
    } else {
      const newBlog = {
        id: Date.now(),
        ...formData
      }
      updatedBlogs = [...blogs, newBlog]
    }

    setBlogs(updatedBlogs)
    setFormData({
      title: '',
      image: '',
      description: '',
      category: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      content: '',
      featured: false
    })
  }

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlogs)
    }
  }

  const handleEdit = blog => {
    setFormData({
      title: blog.title,
      image: blog.image,
      description: blog.description,
      category: blog.category,
      author: blog.author,
      date: blog.date,
      content: blog.content,
      featured: blog.featured || false
    })
    setEditingId(blog.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className="header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <main className="main">
        <section className="form-section">
          <h2>{editingId !== null ? 'Edit Blog' : 'Add New Blog'}</h2>

          <div className="form-group">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL*</label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Short Description*</label>
            <textarea
              name="description"
              placeholder="Short description for the blog"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              placeholder="Author name"
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              placeholder="Full blog content"
              value={formData.content}
              onChange={handleInputChange}
              rows="5"
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
            />
            <label htmlFor="featured">Featured Post</label>
          </div>

          <button 
            className="submit-btn"
            onClick={handleAddOrUpdate}
          >
            {editingId !== null ? 'Update Blog' : 'Add Blog'}
          </button>

          {editingId !== null && (
            <button 
              className="cancel-btn"
              onClick={() => {
                setEditingId(null)
                setFormData({
                  title: '',
                  image: '',
                  description: '',
                  category: '',
                  author: '',
                  date: new Date().toISOString().split('T')[0],
                  content: '',
                  featured: false
                })
              }}
            >
              Cancel Edit
            </button>
          )}
        </section>

        <section className="blog-list-section">
          <h2>Manage Blogs ({blogs.length})</h2>
          {blogs.length === 0 ? (
            <p className="no-blogs">No blogs found. Add your first blog above.</p>
          ) : (
            <div className="card-container">
              {blogs.map(blog => (
                <div key={blog.id} className={`card ${blog.featured ? 'featured' : ''}`}>
                  {blog.featured && <span className="featured-badge">Featured</span>}
                  <div className="image-wrapper">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={300}
                      height={200}
                      className="card-image"
                      unoptimized
                    />
                  </div>
                  <div className="card-content">
                    <h3>{blog.title}</h3>
                    <p className="card-description">{blog.description}</p>
                    <div className="card-meta">
                      {blog.category && <span className="category">{blog.category}</span>}
                      {blog.author && <span className="author">By {blog.author}</span>}
                      {blog.date && <span className="date">{blog.date}</span>}
                    </div>
                    <div className="card-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
